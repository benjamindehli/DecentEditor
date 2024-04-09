import { v4 as uuidv4 } from "uuid";
import { Keyboard } from "./Keyboard";
import { Tab } from "./Tab";

export class Ui {
    constructor(props, keyboardList, tabList) {
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
        this.tab = tabList?.map((tab) => new Tab({ ...tab.$ }, tab.button, tab.control, tab.image,  tab.label, tab["labeled-knob"], tab.menu,));
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
