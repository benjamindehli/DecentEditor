// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Data
import { bindingLevels, bindingParameters, bindingTypes } from "@/data/bindingPropValues";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

// Classes
import { Group } from "./Group";

export class Binding {
    constructor(props, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.controllableParameterRef = props?.controllableParameterRef;
        this.type = props?.type;
        this.level = props?.level;
        this.position = props?.position;
        this.colorIndex = props?.colorIndex;
        this.colorRef = props?.colorRef;
        this.controlIndex = props?.controlIndex;
        this.controlRef = props?.controlRef;
        this.groupIndex = props?.groupIndex;
        this.groupRef = props?.groupRef;
        this.effectIndex = props?.effectIndex;
        this.effectRef = props?.effectRef;
        this.modulatorIndex = props?.modulatorIndex;
        this.tags = props?.tags;
        this.enabled = props?.enabled;
        this.identifier = props?.identifier;
        this.parameter = props?.parameter;
        this.translation = props?.translation;
        this.translationOutputMin = props?.translationOutputMin;
        this.translationOutputMax = props?.translationOutputMax;
        this.translationReversed = props?.translationReversed;
        this.translationTable = props?.translationTable;
        this.translationValue = props?.translationValue;
        this.seqIndex = props?.seqIndex;
        this.seqTriggerBehavior = props?.seqTriggerBehavior;
        this.seqPlayerIdentifier = props?.seqPlayerIdentifier;
        this.seqTrackMidiInputVelocity = props?.seqTrackMidiInputVelocity;
        this.seqTranspose = props?.seqTranspose;
        this.seqTransposeWithRootNote = props?.seqTransposeWithRootNote;
        this.seqPlaybackRate = props?.seqPlaybackRate;
        this.seqLoopMode = props?.seqLoopMode;
    }
    init(decentSampler) {
        if (this.type !== undefined && this.level !== undefined && this.parameter !== undefined) {
            this.controllableParameterRef = this.getControllableParameterRef(decentSampler);
            if (this.controllableParameterRef.hasAdditionalParam("controlIndex")) {
                this.controlIndex = this.controlIndex || this.position;
            }
            if (this.controllableParameterRef.hasAdditionalParam("effectIndex")) {
                this.effectIndex = this.effectIndex || this.position;
            }
            if (this.controllableParameterRef.hasAdditionalParam("groupIndex")) {
                this.groupIndex = this.groupIndex || this.position;
            }
        }
        if (this.groupIndex !== undefined) {
            this.groupRef = this.getGroupRefFromGroupIndex(decentSampler);
        }
        if (this.effectIndex !== undefined) {
            this.effectRef = this.getEffectRefFromEffectIndex(decentSampler, this.groupRef);
        }
        if (this.controlIndex !== undefined) {
            this.controlRef = this.getControlRefFromControlIndex(decentSampler);
        }
    }
    getControllableParameterRef(decentSampler) {
        return decentSampler?.data?.controllableParameters.find((controllableParameter) => {
            return (
                controllableParameter.type === this.type &&
                controllableParameter.level === this.level &&
                controllableParameter.parameter === this.parameter
            );
        });
    }
    getColorRefFromColorIndex(decentSampler) {
        return decentSampler?.getFirstUiItem()?.getFirstKeyboardItem()?.getColorItemByIndex(this.colorIndex);
    }
    getColorIndexFromColorRef(decentSampler, colorRef) {
        return decentSampler
            ?.getFirstUiItem()
            ?.getFirstKeyboardItem()
            ?.getColorItems()
            ?.findIndex((color) => color.id === colorRef.id);
    }
    getControlRefFromControlIndex(decentSampler) {
        return decentSampler?.getFirstUiItem()?.getFirstTabItem()?.getChildElementByIndex(this.controlIndex);
    }
    getControlIndexFromControlRef(decentSampler, controlRef) {
        return decentSampler
            ?.getFirstUiItem()
            ?.getFirstTabItem()
            ?.getChildElements()
            ?.findIndex((control) => control.id === controlRef.id);
    }
    getGroupRefFromGroupIndex(decentSampler) {
        return decentSampler?.getFirstGroupsItem()?.getGroupItemByIndex(this.groupIndex);
    }
    getGroupIndexFromGroupRef(decentSampler, groupRef) {
        return decentSampler
            ?.getFirstGroupsItem()
            ?.getGroupItems()
            ?.findIndex((group) => group.id === groupRef.id);
    }
    getEffectRefFromEffectIndex(decentSampler, group) {
        return !!group
            ? group?.getFirstEffectsItem()?.getEffectItemByIndex(this.effectIndex)
            : decentSampler?.getFirstEffectsItem()?.getEffectItemByIndex(this.effectIndex);
    }
    getEffectIndexFromEffectRef(decentSampler, effectRef) {
        const effects = !!this.groupRef
            ? this.groupRef?.getFirstEffectsItem()?.getEffectItems()
            : decentSampler?.getFirstEffectsItem()?.getEffectItems();
        return effects?.findIndex((effect) => effect.id === effectRef.id);
    }

    getTags() {
        return this.tags?.split(",");
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                type: this.type,
                level: this.level,
                position: this.position,
                colorIndex: this.colorRef
                    ? this.getColorIndexFromColorRef(decentSampler, this.colorRef)
                    : this.colorIndex,
                controlIndex: this.controlRef
                    ? this.getControlIndexFromControlRef(decentSampler, this.controlRef)
                    : this.controlIndex,
                groupIndex: this.groupRef
                    ? this.getGroupIndexFromGroupRef(decentSampler, this.groupRef)
                    : this.groupIndex,
                effectIndex: this.effectRef
                    ? this.getEffectIndexFromEffectRef(decentSampler, this.effectRef)
                    : this.effectIndex,
                modulatorIndex: this.modulatorIndex,
                tags: this.tags,
                enabled: this.enabled,
                identifier: this.identifier,
                parameter: this.parameter,
                translation: this.translation,
                translationOutputMin: this.translationOutputMin,
                translationOutputMax: this.translationOutputMax,
                translationReversed: this.translationReversed,
                translationTable: this.translationTable,
                translationValue: this.translationValue,
                seqIndex: this.seqIndex,
                seqTriggerBehavior: this.seqTriggerBehavior,
                seqPlayerIdentifier: this.seqPlayerIdentifier,
                seqTrackMidiInputVelocity: this.seqTrackMidiInputVelocity,
                seqTranspose: this.seqTranspose,
                seqTransposeWithRootNote: this.seqTransposeWithRootNote,
                seqPlaybackRate: this.seqPlaybackRate,
                seqLoopMode: this.seqLoopMode
            }
        };
        jsonObject["#name"] = this.elementType;
        return jsonObject;
    }
    toXml(decentSampler) {
        const xmlBody = jsonToXml(this.toJson(decentSampler));
        const xmlDoc = formatXml(xmlBody);
        return xmlDoc;
    }
}

Binding.propTypes = {
    id: PropTypes.string,
    type: PropTypes.oneOf(bindingTypes),
    level: PropTypes.oneOf(bindingLevels),
    position: PropTypes.number,
    controlIndex: PropTypes.number,
    groupIndex: PropTypes.number,
    groupRef: PropTypes.instanceOf(Group),
    effectIndex: PropTypes.number,
    modulatorIndex: PropTypes.number,
    tags: PropTypes.string,
    enabled: PropTypes.bool,
    identifier: PropTypes.string,
    parameter: PropTypes.oneOf(bindingParameters),
    translation: PropTypes.string,
    translationOutputMin: PropTypes.number,
    translationOutputMax: PropTypes.number,
    translationReversed: PropTypes.bool,
    translationTable: PropTypes.string,
    translationValue: PropTypes.number,
    seqIndex: PropTypes.number,
    seqTriggerBehavior: PropTypes.string,
    seqPlayerIdentifier: PropTypes.string,
    seqTrackMidiInputVelocity: PropTypes.number,
    seqTranspose: PropTypes.number,
    seqTransposeWithRootNote: PropTypes.bool,
    seqPlaybackRate: PropTypes.number,
    seqLoopMode: PropTypes.string
};
