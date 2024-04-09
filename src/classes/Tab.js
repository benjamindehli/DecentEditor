import { v4 as uuidv4 } from "uuid";

export class Tab {
    constructor(props, buttonList, controlList, imageList, labelList, labeledKnobList, menuList) {
        this.id = props?.id || uuidv4();
        this.elementType = "tab";
        this.name = props?.name;
        //  this.uiElements = props?.colors || color?.map((color) => new Color({ ...color.$ }, color.color));
    }
    toJson() {
        return {
            $: {
                name: this.name
            }
            //  color: this.colors?.map((color) => color.toJson())
        };
    }
}
