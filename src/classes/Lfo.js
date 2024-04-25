// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Binding } from "./Binding";

export class Lfo {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.shape = props?.shape;
        this.frequency = props?.frequency;
        this.modAmount = props?.modAmount;
        this.scope = props?.scope;
        this.childElements =
            props?.childElements ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "binding":
                            return new Binding(childElement.$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    init(decentSampler) {
        console.log("Lfo.init()");
        this.childElements?.forEach((childElement) => {
            !!childElement?.init && childElement.init(decentSampler);
        });
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                shape: this.shape,
                frequency: this.frequency,
                modAmount: this.modAmount,
                scope: this.scope
            }
        };
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
}

Lfo.propTypes = {
    id: PropTypes.string,
    shape: PropTypes.oneOf(["sine", "square", "saw"]),
    frequency: PropTypes.number,
    modAmount: PropTypes.number,
    scope: PropTypes.oneOf(["global", "voice"]),
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Binding))
};
