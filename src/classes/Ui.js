import { v4 as uuidv4 } from "uuid";
import { Keyboard } from "./Keyboard";

export class Ui {
    constructor(props, keyboardList, tab) {
        this.id = uuidv4();
        this.elementType = "ui";
        this.coverArt = props?.coverArt;
        this.bgImage = props?.bgImage;
        this.bgColor = props?.bgColor;
        this.width = props?.width;
        this.height = props?.height;
        this.layoutMode = props?.layoutMode;
        this.bgMode = props?.bgMode;
        this.keyboard = keyboardList?.map((keyboard) => new Keyboard({ ...keyboard.$ }, keyboard.color));
    }
    toJson() {
        return {
            $: {
                coverArt: this.coverArt,
                bgImage: this.bgImage,
                bgColor: this.bgColor,
                width: this.width,
                height: this.height,
                layoutMode: this.layoutMode,
                bgMode: this.bgMode,
            },
            keyboard: this.keyboard?.map((keyboard) => keyboard.toJson())
        };
    }
}
