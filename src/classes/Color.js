// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export class Color {
    constructor(props, elementType, parentHierarchyPath) {
        const id = props.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.loNote = props?.loNote;
        this.hiNote = props?.hiNote;
        this.color = props?.color;
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                loNote: this.loNote,
                hiNote: this.hiNote,
                color: this.color
            }
        };
        jsonObject["#name"] = this.elementType;
        return jsonObject;
    }
}

Color.propTypes = {
    id: PropTypes.string,
    loNote: PropTypes.number,
    hiNote: PropTypes.number,
    color: PropTypes.string
};
