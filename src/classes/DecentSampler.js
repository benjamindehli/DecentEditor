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
import controllableParametersData from "@/data/controllableParameters";
import { ControllableParameter } from "./ControllableParameter";

export class DecentSampler {
    constructor(props, childElements, elementType) {
        this.id = props?.id || uuidv4();
        this.elementType = props?.elementType || elementType || "DecentSampler";
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
                            return new Modulators(childElement.$, childElement.$$, childElement["#name"], this);
                        case "tags":
                            return new Tags(childElement.$, childElement.$$, childElement["#name"]);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
        this.data = {
            controllableParameters: [],
        }
    }
    toJson() {
        const jsonObject = {};
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(this));
        }
        return jsonObject;
    }
    toXml() {
        const xmlBody = jsonToXml(this.toJson());
        const xmlDoc = createXmlDoc(xmlBody);
        return xmlDoc;
    }
    init() {
        this.data.controllableParameters = controllableParametersData.map((controllableParameter) => {
            return new ControllableParameter(controllableParameter);
        })
        this.childElements?.forEach((childElement) => {
            !!childElement?.init && childElement.init(this);
        });
    }
    getUiItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Ui);
    }
    getFirstUiItem() {
        return this.childElements?.find((childElement) => childElement instanceof Ui);
    }
    getGroupsItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Groups);
    }
    getFirstGroupsItem() {
        return this.childElements?.find((childElement) => childElement instanceof Groups);
    }
    getEffectsItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Effects);
    }
    getFirstEffectsItem() {
        return this.childElements?.find((childElement) => childElement instanceof Effects);
    }
    getMidiItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Midi);
    }
    getFirstMidiItem() {
        return this.childElements?.find((childElement) => childElement instanceof Midi);
    }
    getNoteSequencesItems() {
        return this.childElements?.filter((childElement) => childElement instanceof NoteSequences);
    }
    getFirstNoteSequencesItem() {
        return this.childElements?.find((childElement) => childElement instanceof NoteSequences);
    }
    getModulatorsItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Modulators);
    }
    getFirstModulatorsItem() {
        return this.childElements?.find((childElement) => childElement instanceof Modulators);
    }
    getTagsItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Tags);
    }
    getFirstTagsItem() {
        return this.childElements?.find((childElement) => childElement instanceof Tags);
    }
    getControllableParameters() {
        return this.data?.controllableParameters;
    }
    createNewPreset() {
        this.childElements = [
            new Ui({}),
            new Groups({}),
            new Effects({}),
            new Midi({}),
            new NoteSequences({}),
            new Modulators({}),
            new Tags({})
        ];
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
