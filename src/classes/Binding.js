// Dependencies
import { v4 as uuidv4 } from "uuid";

export class Binding {
    constructor(props) {
        this.id = props?.id || uuidv4();
        this.elementType = "binding";
        this.type = props?.type;
        this.level = props?.level;
        this.position = props?.position;
        this.controlIndex = props?.controlIndex;
        this.groupIndex = props?.groupIndex;
        this.effectIndex = props?.effectIndex;
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
    toJson() {
        return {
            $: {
                type: this.type,
                level: this.level,
                position: this.position,
                controlIndex: this.controlIndex,
                groupIndex: this.groupIndex,
                effectIndex: this.effectIndex,
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
    }
}
