// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { State } from "./State";

export class Button {
    constructor(props, stateList) {
        this.id = props?.id || uuidv4();
        this.elementType = "button";
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
        this.states = stateList?.map((state) => new State({ ...state.$ }, state.binding));
    }
    toJson() {
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
        if (this.states?.length) {
            jsonObject.state = this.states?.map((state) => state.toJson());
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
    states: PropTypes.arrayOf(PropTypes.instanceOf(State))
};
