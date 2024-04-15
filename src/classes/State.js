// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Binding } from "./Binding";

export class State {
    constructor(props, bindingList) {
        this.id = props?.id || uuidv4();
        this.elementType = "state";
        this.name = props?.name;
        this.mainImage = props?.mainImage;
        this.hoverImage = props?.hoverImage;
        this.clickImage = props?.clickImage;
        this.bindings = bindingList?.map((binding) => new Binding({ ...binding.$ }));
    }
    toJson() {
        const jsonObject = {
            $: {
                name: this.name,
                mainImage: this.mainImage,
                hoverImage: this.hoverImage,
                clickImage: this.clickImage,
                visible: this.visible
            }
        };
        if (this.bindings?.length) {
            jsonObject.binding = this.bindings?.map((binding) => binding.toJson());
        }
        return jsonObject;
    }
}

State.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    mainImage: PropTypes.string,
    hoverImage: PropTypes.string,
    clickImage: PropTypes.string,
    visible: PropTypes.bool,
    bindings: PropTypes.arrayOf(PropTypes.instanceOf(Binding))
};
