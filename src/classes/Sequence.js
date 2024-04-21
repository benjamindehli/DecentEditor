// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Note } from "./Note";

export class Sequence {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.name = props?.name;
        this.length = props?.length;
        this.rate = props?.rate;
        this.childElements =
            props?.childElements ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "note":
                            return new Note(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement);
    }
    toJson() {
        const jsonObject = {
            $: {
                name: this.name,
                length: this.length,
                rate: this.rate
            }
        };
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson());
        }
        return jsonObject;
    }
}

Sequence.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    length: PropTypes.number,
    rate: PropTypes.number,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Note))
};
