// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Binding } from "./Binding";

export class State {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.name = props?.name;
        this.mainImage = props?.mainImage;
        this.hoverImage = props?.hoverImage;
        this.clickImage = props?.clickImage;
        this.childElements =
            props?.childElement ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "binding":
                            return new Binding(childElement.$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    init(decentSampler) {
        console.log("State.init()");
        this.childElements?.forEach((childElement) => {
            !!childElement?.init && childElement.init(decentSampler);
        });
    }
    getBindingItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Binding);
    }
    getBindingItemByIndex(index) {
        return this.getBindingItems()[index];
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                name: this.name,
                mainImage: this.mainImage,
                hoverImage: this.hoverImage,
                clickImage: this.clickImage,
                visible: this.visible
            }
        };
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
}

State.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    mainImage: PropTypes.string,
    hoverImage: PropTypes.string,
    clickImage: PropTypes.string,
    visible: PropTypes.bool,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Binding))
};
