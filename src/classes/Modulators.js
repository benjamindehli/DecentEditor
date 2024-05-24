// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Lfo } from "./Lfo";
import { Envelope } from "./Envelope";

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
        console.log("Modulators.init()");
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
    toJson(decentSampler) {
        const jsonObject = {};
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
}

Modulators.propTypes = {
    id: PropTypes.string,
    childElements: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Lfo), PropTypes.instanceOf(Envelope)]))
};
