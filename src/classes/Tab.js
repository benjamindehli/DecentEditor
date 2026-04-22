// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Button } from "./Button";
import { Control } from "./Control";
import { Image } from "./Image";
import { Label } from "./Label";
import { LabeledKnob } from "./LabeledKnob";
import { Line } from "./Line";
import { Menu } from "./Menu";
import { MultiFrameImage } from "./MultiFrameImage";
import { Oscilloscope } from "./Oscilloscope";
import { Rectangle } from "./Rectangle";
import { State } from "./State";
import { XyPad } from "./XyPad";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class Tab {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.name = props?.name;
        this.childElements =
            props?.childElements ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "button":
                            return new Button(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        case "control":
                            return new Control(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        case "image":
                            return new Image(childElement.$, childElement["#name"], hierarchyPath);
                        case "label":
                            return new Label(childElement.$, childElement["#name"], hierarchyPath);
                        case "labeled-knob":
                            return new LabeledKnob(
                                childElement.$,
                                childElement.$$,
                                childElement["#name"],
                                hierarchyPath
                            );
                        case "line":
                            return new Line(childElement.$, childElement["#name"], hierarchyPath);
                        case "menu":
                            return new Menu(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        case "multiFrameImage":
                            return new MultiFrameImage(childElement.$, childElement["#name"], hierarchyPath);
                        case "oscilloscope":
                            return new Oscilloscope(childElement.$, childElement["#name"], hierarchyPath);
                        case "rectangle":
                            return new Rectangle(childElement.$, childElement["#name"], hierarchyPath);
                        case "xyPad":
                            return new XyPad(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
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
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                name: this.name
            }
        };
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
    getChildElements() {
        return this.childElements;
    }
    getChildElementByIndex(index) {
        return this.childElements[index];
    }
    getButtonItems() {
        return this.childElements.filter((childElement) => childElement instanceof Button);
    }
    getButtonItemsWithStates() {
        return this.getButtonItems().filter((button) =>
            button.childElements.some((childElement) => childElement instanceof State)
        );
    }
    getControlItems() {
        return this.childElements.filter((childElement) => childElement instanceof Control);
    }
    getImageItems() {
        return this.childElements.filter((childElement) => childElement instanceof Image);
    }
    getLabelItems() {
        return this.childElements.filter((childElement) => childElement instanceof Label);
    }
    getLabeledKnobItems() {
        return this.childElements.filter((childElement) => childElement instanceof LabeledKnob);
    }
    getLineItems() {
        return this.childElements.filter((childElement) => childElement instanceof Line);
    }
    getMenuItems() {
        return this.childElements.filter((childElement) => childElement instanceof Menu);
    }
    getMultiFrameImageItems() {
        return this.childElements.filter((childElement) => childElement instanceof MultiFrameImage);
    }
    getOscilloscopeItems() {
        return this.childElements.filter((childElement) => childElement instanceof Oscilloscope);
    }
    getRectangleItems() {
        return this.childElements.filter((childElement) => childElement instanceof Rectangle);
    }
    getXyPadItems() {
        return this.childElements.filter((childElement) => childElement instanceof XyPad);
    }
    removeChildElementById(id) {
        this.childElements = this.childElements.filter((childElement) => childElement.id !== id);
    }
    addButtonItem(props) {
        this.childElements.push(new Button(props, null, "button", this.hierarchyPath));
    }
    addControlItem(props) {
        this.childElements.push(new Control(props, null, "control", this.hierarchyPath));
    }
    addImageItem(props) {
        this.childElements.push(new Image(props, "image", this.hierarchyPath));
    }
    addLabelItem(props) {
        this.childElements.push(new Label(props, "label", this.hierarchyPath));
    }
    addLabeledKnobItem(props) {
        this.childElements.push(new LabeledKnob(props, null, "labeled-knob", this.hierarchyPath));
    }
    addLineItem(props) {
        this.childElements.push(new Line(props, "line", this.hierarchyPath));
    }
    addMenuItem(props) {
        this.childElements.push(new Menu(props, null, "menu", this.hierarchyPath));
    }
    addMultiFrameImageItem(props) {
        this.childElements.push(new MultiFrameImage(props, "multiFrameImage", this.hierarchyPath));
    }
    addOscilloscopeItem(props) {
        this.childElements.push(new Oscilloscope(props, "oscilloscope", this.hierarchyPath));
    }
    addRectangleItem(props) {
        this.childElements.push(new Rectangle(props, "rectangle", this.hierarchyPath));
    }
    addXyPadItem(props) {
        this.childElements.push(new XyPad(props, null, "xyPad", this.hierarchyPath));
    }
    toXml(decentSampler) {
        const xmlBody = jsonToXml(this.toJson(decentSampler));
        const xmlDoc = formatXml(xmlBody);
        return xmlDoc;
    }
}

Tab.propTypes = {
    id: PropTypes.string,
    parentRefs: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    childElements: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.instanceOf(Button),
            PropTypes.instanceOf(Control),
            PropTypes.instanceOf(Image),
            PropTypes.instanceOf(Label),
            PropTypes.instanceOf(LabeledKnob),
            PropTypes.instanceOf(Menu)
        ])
    )
};
