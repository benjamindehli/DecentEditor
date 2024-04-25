// Dependencies
import { v4 as uuidv4 } from "uuid";

// Classes
import { Binding } from "./Binding";

export class Control {
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
        this.parameterName = props?.parameterName;
        this.style = props?.style;
        this.showLabel = props?.showLabel;
        this.label = props?.label;
        this.minValue = props?.minValue;
        this.maxValue = props?.maxValue;
        this.value = props?.value;
        this.defaultValue = props?.defaultValue;
        this.valueType = props?.valueType;
        this.textColor = props?.textColor;
        this.textSize = props?.textSize;
        this.trackForegroundColor = props?.trackForegroundColor;
        this.trackBackgroundColor = props?.trackBackgroundColor;
        this.visible = props?.visible;
        this.customSkinImage = props?.customSkinImage;
        this.customSkinNumFrames = props?.customSkinNumFrames;
        this.customSkinImageOrientation = props?.customSkinImageOrientation;
        this.mouseDragSensitivity = props?.mouseDragSensitivity;
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
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                parameterName: this.parameterName,
                style: this.style,
                showLabel: this.showLabel,
                label: this.label,
                minValue: this.minValue,
                maxValue: this.maxValue,
                value: this.value,
                defaultValue: this.defaultValue,
                valueType: this.valueType,
                textColor: this.textColor,
                textSize: this.textSize,
                trackForegroundColor: this.trackForegroundColor,
                trackBackgroundColor: this.trackBackgroundColor,
                visible: this.visible,
                customSkinImage: this.customSkinImage,
                customSkinNumFrames: this.customSkinNumFrames,
                customSkinImageOrientation: this.customSkinImageOrientation,
                mouseDragSensitivity: this.mouseDragSensitivity
            }
        };
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
}
