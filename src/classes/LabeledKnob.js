// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Binding } from "./Binding";

export class LabeledKnob {
    constructor(props, bindingList) {
        this.id = props?.id || uuidv4();
        this.elementType = "labeledKnob";
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
        this.bindings = bindingList?.map((binding) => new Binding({ ...binding.$ }));
    }
    toJson() {
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
        if (this.bindings?.length) {
            jsonObject.binding = this.bindings?.map((binding) => binding.toJson());
        }
        return jsonObject;
    }
}

LabeledKnob.propTypes = {
    id: PropTypes.string,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    parameterName: PropTypes.string.isRequired,
    style: PropTypes.oneOf([
        "linear_bar",
        "linear_bar_vertical",
        "linear_horizontal",
        "linear_vertical",
        "rotary",
        "rotary_horizontal_drag",
        "rotary_horizontal_vertical_drag",
        "rotary_vertical_drag",
        "custom_skin_vertical_drag",
        "custom_skin_horizontal_drag"
    ]),
    showLabel: PropTypes.bool,
    label: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    valueType: PropTypes.oneOf[("float", "integer", "musical_time")],
    textColor: PropTypes.string,
    textSize: PropTypes.number,
    trackForegroundColor: PropTypes.string,
    trackBackgroundColor: PropTypes.string,
    visible: PropTypes.bool,
    customSkinImage: PropTypes.string,
    customSkinNumFrames: PropTypes.number,
    customSkinImageOrientation: PropTypes.string,
    mouseDragSensitivity: PropTypes.number,
    bindings: PropTypes.arrayOf(PropTypes.instanceOf(Binding))
};