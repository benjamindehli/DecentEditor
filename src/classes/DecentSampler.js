// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Groups } from "./Groups";
import { Ui } from "./Ui";

// Functions
import { createXmlDoc, jsonToXml } from "@/functions/converters";

export class DecentSampler {
    constructor(props, childElements, elementType) {
        this.id = props?.id || uuidv4();
        this.elementType = props?.elementType || elementType;
        this.childElements =
            props?.childElements ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "ui":
                            return new Ui(childElement.$, childElement.$$, childElement["#name"]);
                        case "groups":
                            return new Groups(childElement.$, childElement.$$, childElement["#name"]);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement);
    }
    toJson() {
        const jsonObject = {};
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson());
        }
        return jsonObject;
    }
    toXml() {
        const xmlBody = jsonToXml(this.toJson());
        const xmlDoc = createXmlDoc(xmlBody);
        return xmlDoc;
    }
}

DecentSampler.propTypes = {
    updateGroupsList: PropTypes.function,
    updateUiList: PropTypes.function,
    groupsList: PropTypes.arrayOf(PropTypes.instanceOf(Groups)),
    uiList: PropTypes.arrayOf(PropTypes.instanceOf(Ui))
};
