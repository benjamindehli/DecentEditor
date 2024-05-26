// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Button } from "./Button";
import { Menu } from "./Menu";
import { Image } from "./Image";
import { Control } from "./Control";
import { Label } from "./Label";
import { LabeledKnob } from "./LabeledKnob";
import { State } from "./State";

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
                        case "menu":
                            return new Menu(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    init(decentSampler) {
        console.log("Tab.init()");
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
    getMenuItems() {
        return this.childElements.filter((childElement) => childElement instanceof Menu);
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
    addMenuItem(props) {
        this.childElements.push(new Menu(props, null, "menu", this.hierarchyPath));
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
