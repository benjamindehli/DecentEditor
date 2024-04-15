// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
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
        this.tab = tabList?.map(
            (tab) => new Tab({ ...tab.$ }, tab.button, tab.control, tab.image, tab.label, tab["labeled-knob"], tab.menu)
        );
    }
    toJson() {
        const jsonObject = {
            $: {
                coverArt: this.coverArt,
                bgImage: this.bgImage,
                bgColor: this.bgColor,
                width: this.width,
                height: this.height,
                layoutMode: this.layoutMode,
                bgMode: this.bgMode
            }
        };
        if (this.keyboard?.length) {
            jsonObject.keyboard = this.keyboard?.map((keyboard) => keyboard.toJson());
        }
        if (this.tab?.length) {
            jsonObject.tab = this.tab?.map((tab) => tab.toJson());
        }
        return jsonObject;
    }
}

Ui.propTypes = {
    coverArt: PropTypes.string,
    bgImage: PropTypes.string,
    bgColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    layoutMode: PropTypes.string,
    bgMode: PropTypes.string,
    keyboard: PropTypes.arrayOf(PropTypes.instanceOf(Keyboard)),
    tab: PropTypes.arrayOf(PropTypes.instanceOf(Tab))
};
