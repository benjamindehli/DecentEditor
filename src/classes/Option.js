// Dependencies
import { v4 as uuidv4 } from "uuid";

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
        return {
            $: {
                name: this.name
            },
            binding: this.bindings?.map((binding) => binding.toJson())
        };
    }
}
