// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Keyboard } from "./Keyboard";
import { Tab } from "./Tab";

export class Ui {
    constructor(props, childElements, elementType) {
        const id = props?.id || uuidv4();
        const hierarchyPath = [id];
        this.id = id;
        this.hierarchyPath = props?.hierarchyPath || hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.coverArt = props?.coverArt;
        this.bgImage = props?.bgImage;
        this.bgColor = props?.bgColor;
        this.width = props?.width;
        this.height = props?.height;
        this.layoutMode = props?.layoutMode;
        this.bgMode = props?.bgMode;
        this.childElements =
            props?.childElement ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "keyboard":
                            return new Keyboard(null, childElement.$$, childElement["#name"], hierarchyPath);
                        case "tab":
                            return new Tab(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement);
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
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson());
        }
        return jsonObject;
    }
}

Ui.propTypes = {
    coverArt: PropTypes.string,
    bgImage: PropTypes.string,
    bgColor: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    layoutMode: PropTypes.string,
    bgMode: PropTypes.string,
    childElements: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Keyboard), PropTypes.instanceOf(Tab)]))
};
