// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Effect } from "./Effect";

export class Effects {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || parentHierarchyPath ? [...parentHierarchyPath, id] : [id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType || "effects";
        this.childElements =
            props?.childElements ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "effect":
                            return new Effect(childElement.$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    getEffectItems() {
        return this.childElements?.filter((childElement) => childElement.elementType === "effect");
    }
    getEffectItemByIndex(index) {
        return this.getEffectItems()[index];
    }
    addEffectItem(props) {
        this.childElements.push(new Effect(props, null, "effect", this.hierarchyPath));
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

Effects.propTypes = {
    id: PropTypes.string,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Effect))
};
