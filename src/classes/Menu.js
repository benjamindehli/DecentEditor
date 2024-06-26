// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Option } from "./Option";

export class Menu {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.x = props?.x;
        this.y = props?.y;
        this.width = props?.width;
        this.height = props?.height;
        this.value = props?.value;
        this.visible = props?.visible;
        this.childElements =
            props?.childElement ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "option":
                            return new Option(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    init(decentSampler) {
        console.log("Menu.init()");
        this.childElements?.forEach((childElement) => {
            !!childElement?.init && childElement.init(decentSampler);
        });
    }
    getOptionItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Option);
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                value: this.value,
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

Menu.propTypes = {
    id: PropTypes.string,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    value: PropTypes.number,
    visible: PropTypes.bool,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Option))
};
