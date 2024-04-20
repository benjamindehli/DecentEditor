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
                .filter((childElement) => childElement);
    }
    toJson() {
        const jsonObject = {
            $: {
                name: this.name
            }
        };
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson());
        }
        return jsonObject;
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
