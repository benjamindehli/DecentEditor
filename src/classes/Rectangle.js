// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class Rectangle {
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
        this.fillColor = props?.fillColor;
        this.borderColor = props?.borderColor;
        this.borderThickness = props?.borderThickness;
        this.visible = props?.visible;
    }
    init(decentSampler) {}
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                fillColor: this.fillColor,
                borderColor: this.borderColor,
                borderThickness: this.borderThickness,
                visible: this.visible
            }
        };
        jsonObject["#name"] = this.elementType;
        return jsonObject;
    }
    toXml(decentSampler) {
        const xmlBody = jsonToXml(this.toJson(decentSampler));
        return formatXml(xmlBody);
    }
}

Rectangle.propTypes = {
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    fillColor: PropTypes.string,
    borderColor: PropTypes.string,
    borderThickness: PropTypes.number,
    visible: PropTypes.bool
};
