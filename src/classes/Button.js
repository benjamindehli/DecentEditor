// Dependencies
import { v4 as uuidv4 } from "uuid";

// Classes
import { State } from "./State";

export class Button {
    constructor(props, stateList) {
        this.id = props?.id || uuidv4();
        this.elementType = "button";
        this.x = props?.x;
        this.y = props?.y;
        this.width = props?.width;
        this.height = props?.height;
        this.value = props?.value;
        this.style = props?.style;
        this.mainImage = props?.mainImage;
        this.hoverImage = props?.hoverImage;
        this.clickImage = props?.clickImage;
        this.visible = props?.visible;
        this.state = stateList?.map((state) => new State({ ...state.$ }, state.binding));
    }
    toJson() {
        return {
            $: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                value: this.value,
                style: this.style,
                mainImage: this.mainImage,
                hoverImage: this.hoverImage,
                clickImage: this.clickImage,
                visible: this.visible
            },
            state: this.state?.map((state) => state.toJson())
        };
    }
}
