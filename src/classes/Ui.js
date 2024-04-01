import { v4 as uuidv4 } from "uuid";

export class Ui {
    constructor(props, keyboard, tab) {
        this.id = uuidv4();
        this.elementType = "ui";
        this.bgImage = props?.bgImage;
        this.width = props?.width;
        this.height = props?.height;
        this.layoutMode = props?.layoutMode;
        this.bgMode = props?.bgMode;
    }
    toJson() {
        return {
            $: {
                bgImage: this.bgImage,
                width: this.width,
                height: this.height,
                layoutMode: this.layoutMode,
                bgMode: this.bgMode
            }
        };
    }
}
