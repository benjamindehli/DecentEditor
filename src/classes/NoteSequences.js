// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Sequence } from "./Sequence";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class NoteSequences {
    constructor(props, childElements, elementType) {
        const id = props?.id || uuidv4();
        const hierarchyPath = [id];
        this.id = id;
        this.hierarchyPath = props?.hierarchyPath || hierarchyPath;
        this.elementType = props?.elementType || elementType || "noteSequences";
        this.childElements =
            props?.childElement ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "sequence":
                            return new Sequence(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    getSequenceItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Sequence);
    }
    getSequenceItemByIndex(index) {
        return this.getSequenceItems()[index];
    }
    addSequenceItem(props) {
        this.childElements.push(new Sequence(props || {}, null, "sequence", this.hierarchyPath));
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

NoteSequences.propTypes = {
    id: PropTypes.string,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Sequence))
};
