// Dependencies
import { v4 as uuidv4 } from "uuid";

export class Label {
    constructor(props) {
        this.id = props?.id || uuidv4();
        this.elementType = "label";
        this.x = props?.x;
        this.y = props?.y;
        this.text = props?.text;
        this.textColor = props?.textColor;
        this.textSize = props?.textSize;
        this.width = props?.width;
        this.height = props?.height;
        this.vAlign = props?.vAlign;
        this.hAlign = props?.hAlign;
        this.visible = props?.visible;
    }
    toJson() {
        const jsonObject = {
            $: {
                x: this.x,
                y: this.y,
                text: this.text,
                textColor: this.textColor,
                textSize: this.textSize,
                width: this.width,
                height: this.height,
                vAlign: this.vAlign,
                hAlign: this.hAlign,
                visible: this.visible
            }
        };
        return jsonObject;
    }
}

Label.propTypes = {
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    text: PropTypes.string,
    textColor: PropTypes.string,
    textSize: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    vAlign: PropTypes.string,
    hAlign: PropTypes.string,
    visible: PropTypes.bool
};
