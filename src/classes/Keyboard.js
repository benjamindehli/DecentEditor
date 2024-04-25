// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Color } from "./Color";

export class Keyboard {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.childElements =
            props?.childElement ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "color":
                            return new Color(childElement.$, childElement["#name"], hierarchyPath);
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
    getColorItems() {
        return this.childElements.filter((childElement) => childElement instanceof Color);
    }
    getFirstColorItem() {
        return this.childElements.find((childElement) => childElement instanceof Color);
    }
    addColorItem(props) {
        this.childElements.push(new Color(props, "group", this.hierarchyPath));
    }
}

Keyboard.propTypes = {
    id: PropTypes.string,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Color))
};
