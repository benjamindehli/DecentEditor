// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { XyPadX } from "./XyPadX";
import { XyPadY } from "./XyPadY";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class XyPad {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.x = props?.x;
        this.y = props?.y;
        this.width = props?.width;
        this.height = props?.height;
        this.markerDiameter = props?.markerDiameter;
        this.markerOutlineColor = props?.markerOutlineColor;
        this.markerFillColor = props?.markerFillColor;
        this.outlineColor = props?.outlineColor;
        this.bgColor = props?.bgColor;
        this.tooltip = props?.tooltip;
        this.xValue = props?.xValue;
        this.yValue = props?.yValue;
        this.tags = props?.tags;
        this.visible = props?.visible;
        this.enabled = props?.enabled;
        this.childElements =
            props?.childElements ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "x":
                            return new XyPadX(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        case "y":
                            return new XyPadY(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    init(decentSampler) {
        this.childElements?.forEach((childElement) => {
            !!childElement?.init && childElement.init(decentSampler);
        });
    }
    getXItems() {
        return this.childElements?.filter((childElement) => childElement instanceof XyPadX);
    }
    getYItems() {
        return this.childElements?.filter((childElement) => childElement instanceof XyPadY);
    }
    addXItem(props) {
        this.childElements.push(new XyPadX(props || {}, null, "x", this.hierarchyPath));
    }
    addYItem(props) {
        this.childElements.push(new XyPadY(props || {}, null, "y", this.hierarchyPath));
    }
    removeChildElementById(id) {
        this.childElements = this.childElements.filter((childElement) => childElement.id !== id);
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                markerDiameter: this.markerDiameter,
                markerOutlineColor: this.markerOutlineColor,
                markerFillColor: this.markerFillColor,
                outlineColor: this.outlineColor,
                bgColor: this.bgColor,
                tooltip: this.tooltip,
                xValue: this.xValue,
                yValue: this.yValue,
                tags: this.tags,
                visible: this.visible,
                enabled: this.enabled
            }
        };
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
    toXml(decentSampler) {
        const xmlBody = jsonToXml(this.toJson(decentSampler));
        return formatXml(xmlBody);
    }
}

XyPad.propTypes = {
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    markerDiameter: PropTypes.number,
    markerOutlineColor: PropTypes.string,
    markerFillColor: PropTypes.string,
    outlineColor: PropTypes.string,
    bgColor: PropTypes.string,
    tooltip: PropTypes.string,
    xValue: PropTypes.number,
    yValue: PropTypes.number,
    tags: PropTypes.string,
    visible: PropTypes.bool,
    enabled: PropTypes.bool,
    childElements: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(XyPadX), PropTypes.instanceOf(XyPadY)]))
};
