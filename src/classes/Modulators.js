// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Lfo } from "./Lfo";
import { Envelope } from "./Envelope";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class Modulators {
    constructor(props, childElements, elementType, decentSampler) {
        const id = props?.id || uuidv4();
        const hierarchyPath = [id];
        this.id = id;
        this.hierarchyPath = props?.hierarchyPath || hierarchyPath;
        this.elementType = props?.elementType || elementType || "modulators";
        this.childElements =
            props?.childElement ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "lfo":
                            return new Lfo(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        case "envelope":
                            return new Envelope(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    init(decentSampler) {
        this.childElements?.forEach((childElement) => {
            !!childElement?.init && childElement.init(decentSampler);
        });
    }
    getChildElements() {
        return this.childElements;
    }
    getChildElementByIndex(index) {
        return this.childElements[index];
    }
    getLfoItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Lfo);
    }
    getEnvelopeItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Envelope);
    }
    addLfoItem(props) {
        this.childElements.push(new Lfo(props || {}, null, "lfo", this.hierarchyPath));
    }
    addEnvelopeItem(props) {
        this.childElements.push(new Envelope(props || {}, null, "envelope", this.hierarchyPath));
    }
    removeChildElementById(id) {
        this.childElements = this.childElements.filter((childElement) => childElement.id !== id);
    }
    toJson(decentSampler) {
        const jsonObject = {};
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
    toXml(decentSampler) {
        const xmlBody = jsonToXml(this.toJson(decentSampler));
        const xmlDoc = formatXml(xmlBody);
        return xmlDoc;
    }
}

Modulators.propTypes = {
    id: PropTypes.string,
    childElements: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Lfo), PropTypes.instanceOf(Envelope)]))
};
