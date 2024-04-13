// Dependencies
import { v4 as uuidv4 } from "uuid";

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
        return {
            $: {
                name: this.name,
                mainImage: this.mainImage,
                hoverImage: this.hoverImage,
                clickImage: this.clickImage,
                visible: this.visible
            },
            binding: this.bindings?.map((binding) => binding.toJson())
        };
    }
}
