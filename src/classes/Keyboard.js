// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Color } from "./Color";

export class Keyboard {
    constructor(props, color) {
        this.id = props?.id || uuidv4();
        this.elementType = "keyboard";
        this.colors = props?.colors || color?.map((color) => new Color({ ...color.$ }, color.color));
    }
    toJson() {
        const jsonObject = {};
        if (this.colors?.length) {
            jsonObject.color = this.colors?.map((color) => color.toJson());
        }
        return jsonObject;
    }
    newSample() {
        this.colors.push(new Color({}));
    }
    addSample(color) {
        this.colors.push(color);
    }
}

Keyboard.propTypes = {
    id: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.instanceOf(Color))
};
