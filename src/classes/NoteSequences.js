// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Sequence } from "./Sequence";

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
    toJson(decentSampler) {
        const jsonObject = {};
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
}

NoteSequences.propTypes = {
    id: PropTypes.string,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Sequence))
};
