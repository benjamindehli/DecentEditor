// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export class Image {
    constructor(props, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.x = props?.x;
        this.y = props?.y;
        this.width = props?.width;
        this.height = props?.height;
        this.path = props?.path;
        this.aspectRatioMode = props?.aspectRatioMode;
        this.visible = props?.visible;
    }
    init(decentSampler) {
        console.log("Image.init()");
    }
    toJson(decentSampler) {
        const jsonObject = {
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
        jsonObject["#name"] = this.elementType;
        return jsonObject;
    }
}

Image.propTypes = {
    id: PropTypes.string,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    aspectRatioMode: PropTypes.oneOf(["preserve", "stretch"]).isRequired,
    visible: PropTypes.bool
};
