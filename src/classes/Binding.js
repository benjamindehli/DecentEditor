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
        this.bindingIndex = props?.bindingIndex;
        this.bindingRef = props?.bindingRef;
        this.colorIndex = props?.colorIndex;
        this.colorRef = props?.colorRef;
        this.controlIndex = props?.controlIndex;
        this.controlRef = props?.controlRef;
        this.groupIndex = props?.groupIndex;
        this.groupRef = props?.groupRef;
        this.effectIndex = props?.effectIndex;
        this.effectRef = props?.effectRef;
        this.modulatorIndex = props?.modulatorIndex;
        this.modulatorRef = props?.modulatorRef;
        this.noteIndex = props?.noteIndex;
        this.noteRef = props?.noteRef;
        this.stateIndex = props?.stateIndex;
        this.stateRef = props?.stateRef;
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
        // Both AMP_VOLUME and TAG_VOLUME are valid parameters, but TAG_VOLUME is used in documentation
        if (this.type === "amp" && this.level === "tag" && this.parameter === "AMP_VOLUME") {
            console.log("converting AMP_VOLUME to TAG_VOLUME")
            this.parameter = "TAG_VOLUME";
        }

        // Use named indexes instead of position
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
        const hasGroupRef = !!this.groupRef;
        if (hasGroupRef && this.effectIndex !== undefined) {
            this.effectRef = this.getGroupEffectRefFromEffectIndex(this.groupRef);
        } else if (this.effectIndex !== undefined) {
            this.effectRef = this.getGlobalEffectRefFromEffectIndex(decentSampler);
        }

        if (this.controlIndex !== undefined) {
            this.controlRef = this.getControlRefFromControlIndex(decentSampler);
            const hasControlRef = !!this.controlRef;
            if (hasControlRef && this.stateIndex !== undefined) {
                this.stateRef = this.getStateRefFromStateIndex(this.controlRef);
                const hasStateRef = !!this.stateRef;
                if (hasStateRef && this.bindingIndex !== undefined) {
                    this.bindingRef = this.getStateBindingRefFromBindingIndex(this.stateRef);
                }
            }
        }
        if (this.colorIndex !== undefined) {
            this.colorRef = this.getColorRefFromColorIndex(decentSampler);
        }
        if (this.modulatorIndex !== undefined) {
            this.modulatorRef = this.getModulatorRefFromModulatorIndex(decentSampler);
        }
        if (this.noteIndex !== undefined) {
            this.noteRef = this.getNoteRefFromNoteIndex(decentSampler);
            const hasNoteRef = !!this.noteRef;
            if (hasNoteRef && this.bindingIndex !== undefined) {
                this.bindingRef = this.getNoteBindingRefFromBindingIndex(this.noteRef);
            }
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
    getGroupEffectRefFromEffectIndex(groupRef) {
        return groupRef?.getFirstEffectsItem()?.getEffectItemByIndex(this.effectIndex);
    }
    getGroupEffectIndexFromEffectRef(groupRef, effectRef) {
        return groupRef
            ?.getFirstEffectsItem()
            ?.getEffectItems()
            ?.findIndex((effect) => effect.id === effectRef.id);
    }
    getGlobalEffectRefFromEffectIndex(decentSampler) {
        return decentSampler?.getFirstEffectsItem()?.getEffectItemByIndex(this.effectIndex);
    }
    getGlobalEffectIndexFromEffectRef(decentSampler, effectRef) {
        return decentSampler
            ?.getFirstEffectsItem()
            ?.getEffectItems()
            ?.findIndex((effect) => effect.id === effectRef.id);
    }
    getModulatorRefFromModulatorIndex(decentSampler) {
        return decentSampler?.getFirstModulatorsItem()?.getChildElementByIndex(this.modulatorIndex);
    }
    getModulatorIndexFromModulatorRef(decentSampler, modulatorRef) {
        return decentSampler
            ?.getFirstModulatorsItem()
            ?.getChildElements()
            ?.findIndex((modulator) => modulator.id === modulatorRef.id);
    }
    getNoteRefFromNoteIndex(decentSampler) {
        return decentSampler?.getFirstMidiItem()?.getNoteItemByIndex(this.noteIndex);
    }
    getNoteIndexFromNoteRef(decentSampler, noteRef) {
        return decentSampler
            ?.getFirstMidiItem()
            ?.getNoteItems()
            ?.findIndex((note) => note.id === noteRef.id);
    }
    getNoteBindingRefFromBindingIndex(noteRef) {
        return noteRef?.getBindingItemByIndex(this.bindingIndex);
    }
    getNoteBindingIndexFromBindingRef(noteRef, bindingRef) {
        return noteRef?.getBindingItems()?.findIndex((binding) => binding.id === bindingRef.id);
    }
    getStateRefFromStateIndex(controlRef) {
        const isButtonControl = controlRef instanceof Button;
        return isButtonControl && controlRef?.getStateItemByIndex(this.stateIndex);
    }
    getStateIndexFromStateRef(controlRef, stateRef) {
        const isButtonControl = controlRef instanceof Button;
        return isButtonControl && controlRef?.getStateItems()?.findIndex((state) => state.id === stateRef.id);
    }
    getStateBindingRefFromBindingIndex(stateRef) {
        return stateRef?.getBindingItemByIndex(this.bindingIndex);
    }
    getStateBindingIndexFromBindingRef(stateRef, bindingRef) {
        return stateRef?.getBindingItems()?.findIndex((binding) => binding.id === bindingRef.id);
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
                    ? this.groupRef // If groupRef exists, then it's a group effect
                        ? this.getGroupEffectIndexFromEffectRef(this.groupRef, this.effectRef)
                        : this.getGlobalEffectIndexFromEffectRef(decentSampler, this.effectRef)
                    : this.effectIndex,
                modulatorIndex: this.modulatorRef
                    ? this.getModulatorIndexFromModulatorRef(decentSampler, this.modulatorRef)
                    : this.modulatorIndex,
                noteIndex: this.noteRef ? this.getNoteIndexFromNoteRef(decentSampler, this.noteRef) : this.noteIndex,
                stateIndex:
                    this.stateRef && this.controlRef
                        ? this.getStateIndexFromStateRef(this.controlRef, this.stateRef)
                        : this.stateIndex,
                bindingIndex: this.bindingRef
                    ? this.stateRef // If stateRef exists, then it's a button control
                        ? this.getStateBindingRefFromBindingIndex(this.stateRef)
                        : this.noteRef // Else if noteRef exists, then it's a note
                        ? this.getNoteBindingRefFromBindingIndex(this.noteRef)
                        : this.bindingIndex
                    : this.bindingIndex,
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
