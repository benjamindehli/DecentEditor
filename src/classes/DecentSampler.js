// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Groups } from "./Groups";
import { Ui } from "./Ui";
import { Effects } from "./Effects";
import { Midi } from "./Midi";
import { NoteSequences } from "./NoteSequences";
import { Modulators } from "./Modulators";
import { Tags } from "./Tags";

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
                        case "effects":
                            return new Effects(childElement.$, childElement.$$, childElement["#name"]);
                        case "midi":
                            return new Midi(childElement.$, childElement.$$, childElement["#name"]);
                        case "noteSequences":
                            return new NoteSequences(childElement.$, childElement.$$, childElement["#name"]);
                        case "modulators":
                            return new Modulators(childElement.$, childElement.$$, childElement["#name"]);
                        case "tags":
                            return new Tags(childElement.$, childElement.$$, childElement["#name"]);
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
    childElements: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.instanceOf(Ui),
            PropTypes.instanceOf(Groups),
            PropTypes.instanceOf(Effects),
            PropTypes.instanceOf(Midi),
            PropTypes.instanceOf(NoteSequences),
            PropTypes.instanceOf(Modulators)
        ])
    )
};
