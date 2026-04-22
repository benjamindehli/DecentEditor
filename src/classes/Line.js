// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class Line {
    constructor(props, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.x1 = props?.x1;
        this.y1 = props?.y1;
        this.x2 = props?.x2;
        this.y2 = props?.y2;
        this.lineColor = props?.lineColor;
        this.lineThickness = props?.lineThickness;
        this.visible = props?.visible;
    }
    init(decentSampler) {}
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                x1: this.x1,
                y1: this.y1,
                x2: this.x2,
                y2: this.y2,
                lineColor: this.lineColor,
                lineThickness: this.lineThickness,
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

Line.propTypes = {
    id: PropTypes.string,
    x1: PropTypes.number,
    y1: PropTypes.number,
    x2: PropTypes.number,
    y2: PropTypes.number,
    lineColor: PropTypes.string,
    lineThickness: PropTypes.number,
    visible: PropTypes.bool
};
