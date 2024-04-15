// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Option } from "./Option";

export class Menu {
    constructor(props, optionList) {
        this.id = props?.id || uuidv4();
        this.elementType = "menu";
        this.x = props?.x;
        this.y = props?.y;
        this.width = props?.width;
        this.height = props?.height;
        this.value = props?.value;
        this.visible = props?.visible;
        this.options = optionList?.map((option) => new Option({ ...option.$ }, option.binding));
    }
    toJson() {
        const jsonObject = {
            $: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                value: this.value,
                visible: this.visible
            }
        };
        if (this.options?.length) {
            jsonObject.option = this.options?.map((option) => option.toJson());
        }
        return jsonObject;
    }
}

Menu.propTypes = {
    id: PropTypes.string,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    value: PropTypes.number,
    visible: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.instanceOf(Option))
};