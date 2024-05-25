// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Binding } from "./Binding";

export class Note {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.enabled = props?.enabled;
        this.note = props?.number;
        this.position = props?.position;
        this.velocity = props?.velocity;
        this.length = props?.length;
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
        console.log("Note.init()");
        this.childElements?.forEach((childElement) => {
            !!childElement?.init && childElement.init(decentSampler);
        });
    }
    getBindingItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Binding);
    }
    getBindingItemByIndex(index) {
        return this.getBindingItems()[index];
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                enabled: this.enabled,
                note: this.note,
                position: this.position,
                velocity: this.velocity,
                length: this.length
            }
        };
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
}

Note.propTypes = {
    id: PropTypes.string,
    enabled: PropTypes.bool,
    note: PropTypes.number,
    position: PropTypes.number,
    velocity: PropTypes.number,
    length: PropTypes.number,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Binding))
};
