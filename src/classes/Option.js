// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Binding } from "./Binding";

export class Option {
    constructor(props, bindingList) {
        this.id = props?.id || uuidv4();
        this.elementType = "option";
        this.name = props?.name;
        this.bindings = bindingList?.map((binding) => new Binding({ ...binding.$ }));
    }
    toJson() {
        const jsonObject = {
            $: {
                name: this.name
            }
        };
        if (this.bindings?.length) {
            jsonObject.binding = this.bindings?.map((binding) => binding.toJson());
        }
        return jsonObject;
    }
}

Option.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    bindings: PropTypes.arrayOf(PropTypes.instanceOf(Binding))
};
