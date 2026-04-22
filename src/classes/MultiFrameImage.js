// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class MultiFrameImage {
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
        this.numFrames = props?.numFrames;
        this.frameRate = props?.frameRate;
        this.opacity = props?.opacity;
        this.sourceFormat = props?.sourceFormat;
        this.playbackMode = props?.playbackMode;
        this.visible = props?.visible;
        this.tags = props?.tags;
        this.tooltip = props?.tooltip;
    }
    init(decentSampler) {}
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                path: this.path,
                numFrames: this.numFrames,
                frameRate: this.frameRate,
                opacity: this.opacity,
                sourceFormat: this.sourceFormat,
                playbackMode: this.playbackMode,
                visible: this.visible,
                tags: this.tags,
                tooltip: this.tooltip
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

MultiFrameImage.propTypes = {
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    path: PropTypes.string,
    numFrames: PropTypes.number,
    frameRate: PropTypes.number,
    opacity: PropTypes.number,
    sourceFormat: PropTypes.oneOf(["horizontal_image_strip", "vertical_image_strip"]),
    playbackMode: PropTypes.oneOf(["forward_loop", "forward_once", "reverse_loop", "reverse_once", "ping_pong_loop", "stopped"]),
    visible: PropTypes.bool,
    tags: PropTypes.string,
    tooltip: PropTypes.string
};
