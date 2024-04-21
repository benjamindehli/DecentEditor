// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Cc } from "./Cc";
import { Note } from "./Note";

export class Midi {
    constructor(props, childElements, elementType) {
        const id = props?.id || uuidv4();
        const hierarchyPath = [id];
        this.id = id;
        this.hierarchyPath = props?.hierarchyPath || hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.childElements =
            props?.childElement ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "cc":
                            return new Cc(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        case "note":
                            return new Note(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement);
    }
    toJson() {
        const jsonObject = {};
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson());
        }
        return jsonObject;
    }
}

Midi.propTypes = {
    id: PropTypes.string,
    childElements: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Cc), PropTypes.instanceOf(Note)]))
};
