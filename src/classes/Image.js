// Dependencies
import { v4 as uuidv4 } from "uuid";

export class Image {
    constructor(props) {
        this.id = props?.id || uuidv4();
        this.elementType = "image";
        this.x = props?.x;
        this.y = props?.y;
        this.width = props?.width;
        this.height = props?.height;
        this.path = props?.path;
        this.aspectRatioMode = props?.aspectRatioMode;
        this.visible = props?.visible;
    }
    toJson() {
        return {
            $: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                path: this.path,
                aspectRatioMode: this.aspectRatioMode,
                visible: this.visible
            }
        };
    }
}
