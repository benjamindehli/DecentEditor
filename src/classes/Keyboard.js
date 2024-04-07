import { v4 as uuidv4 } from "uuid";
import { Color } from "./Color";

export class Keyboard {
    constructor(props, color) {
        this.id = props.id || uuidv4();
        this.elementType = "keyboard";
        this.colors = props.colors || color?.map((color) => new Color({ ...color.$ }, color.color));
    }
    toJson() {
        return {
            color: this.colors?.map((color) => color.toJson())
        };
    }
    newSample() {
        this.colors.push(new Color({}));
    }
    addSample(color) {
        this.colors.push(color);
    }
}
