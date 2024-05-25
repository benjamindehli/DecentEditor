// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { State } from "./State";

export class Button {
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
        this.style = props?.style;
        this.mainImage = props?.mainImage;
        this.hoverImage = props?.hoverImage;
        this.clickImage = props?.clickImage;
        this.visible = props?.visible;
        this.childElements =
            props?.childElement ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "state":
                            return new State(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    init(decentSampler) {
        console.log("Button.init()");
        this.childElements?.forEach((childElement) => {
            !!childElement?.init && childElement.init(decentSampler);
        });
    }
    getStateItems() {
        return this.childElements?.filter((childElement) => childElement instanceof State);
    }
    getStateItemByIndex(index) {
        return this.getStateItems()[index];
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                value: this.value,
                style: this.style,
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

Button.propTypes = {
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    value: PropTypes.string,
    style: PropTypes.string,
    mainImage: PropTypes.string,
    hoverImage: PropTypes.string,
    clickImage: PropTypes.string,
    visible: PropTypes.bool,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(State))
};
