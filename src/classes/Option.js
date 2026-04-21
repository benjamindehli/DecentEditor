// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Binding } from "./Binding";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class Option {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.name = props?.name;
        this.childElements =
            props?.childElement ||
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
        console.log("Option.init()");
        this.childElements?.forEach((childElement) => {
            !!childElement?.init && childElement.init(decentSampler);
        });
    }
    getBindingItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Binding);
    }
    addBindingItem(props) {
        this.childElements.push(new Binding(props || {}, "binding", this.hierarchyPath));
    }
    removeChildElementById(id) {
        this.childElements = this.childElements.filter((childElement) => childElement.id !== id);
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
    toXml(decentSampler) {
        const xmlBody = jsonToXml(this.toJson(decentSampler));
        const xmlDoc = formatXml(xmlBody);
        return xmlDoc;
    }
}

Option.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Binding))
};
