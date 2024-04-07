import { v4 as uuidv4 } from "uuid";

export class Color {
    constructor(props) {
        this.id = props.id || uuidv4();
        this.elementType = "color";
        this.loNote = props?.loNote;
        this.hiNote = props?.hiNote;
        this.color = props?.color;
    }
    toJson() {
        return {
            $: {
                hiNote: this.hiNote,
                loNote: this.loNote,
                color: this.color
            }
        };
    }
}
