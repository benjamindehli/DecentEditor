// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Tag } from "./Tag";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class Tags {
    constructor(props, childElements, elementType) {
        const id = props?.id || uuidv4();
        const hierarchyPath = [id];
        this.id = id;
        this.hierarchyPath = props?.hierarchyPath || hierarchyPath;
        this.elementType = props?.elementType || elementType || "tags";
        this.childElements =
            props?.childElement ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "tag":
                            return new Tag(childElement.$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    getTagItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Tag);
    }
    addTagItem(props) {
        this.childElements.push(new Tag(props || {}, "tag", this.hierarchyPath));
    }
    removeChildElementById(id) {
        this.childElements = this.childElements.filter((childElement) => childElement.id !== id);
    }
    toJson(decentSampler) {
        const jsonObject = {};
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

Tags.propTypes = {
    id: PropTypes.string,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Tag))
};
