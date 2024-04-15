// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export class Color {
    constructor(props) {
        this.id = props.id || uuidv4();
        this.elementType = "color";
        this.loNote = props?.loNote;
        this.hiNote = props?.hiNote;
        this.color = props?.color;
    }
    toJson() {
        const jsonObject = {
            $: {
                loNote: this.loNote,
                hiNote: this.hiNote,
                color: this.color
            }
        };
        return jsonObject;
    }
}

Color.propTypes = {
    id: PropTypes.string,
    loNote: PropTypes.number,
    hiNote: PropTypes.number,
    color: PropTypes.string
};
