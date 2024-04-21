// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Lfo } from "./Lfo";
import { Envelope } from "./Envelope";

export class Modulators {
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
                        case "lfo":
                            return new Lfo(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        case "envelope":
                            return new Envelope(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
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

Modulators.propTypes = {
    id: PropTypes.string,
    childElements: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Lfo), PropTypes.instanceOf(Envelope)]))
};
