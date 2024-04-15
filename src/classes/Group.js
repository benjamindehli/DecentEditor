// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Sample } from "./Sample";
import { Effects } from "./Effects";

export class Group {
    constructor(props, effectsList, sampleList) {
        this.id = props?.id || uuidv4();
        this.elementType = "group";
        this.enabled = props?.enabled;
        this.tags = props?.tags;
        this.silencingMode = props?.silencingMode;
        this.ampVelTrack = props?.ampVelTrack;
        this.groupTuning = props?.groupTuning;
        this.volume = props?.volume;
        this.trigger = props?.trigger;
        this.attack = props?.attack;
        this.decay = props?.decay;
        this.sustain = props?.sustain;
        this.release = props?.release;
        this.attackCurve = props?.attackCurve;
        this.decayCurve = props?.decayCurve;
        this.releaseCurve = props?.releaseCurve;
        this.glideTime = props?.glideTime;
        this.glideMode = props?.glideMode;
        this.seqMode = props?.seqMode;
        this.seqLength = props?.seqLength;
        this.seqPosition = props?.seqPosition;
        this.effects =
            props?.effects ||
            effectsList?.map((effects) => new Effects({ ...effects.$, groupId: this.id }, effects.effect)) ||
            [];
        this.samples =
            props?.samples ||
            sampleList?.map((sample) => new Sample({ ...sample.$, groupId: this.id }, sample.sample)) ||
            [];
    }
    toJson() {
        const jsonObject = {
            $: {
                enabled: this.enabled,
                tags: this.tags,
                silencingMode: this.silencingMode,
                ampVelTrack: this.ampVelTrack,
                groupTuning: this.groupTuning,
                volume: this.volume,
                trigger: this.trigger,
                attack: this.attack,
                decay: this.decay,
                sustain: this.sustain,
                release: this.release,
                attackCurve: this.attackCurve,
                decayCurve: this.decayCurve,
                releaseCurve: this.releaseCurve,
                glideTime: this.glideTime,
                glideMode: this.glideMode,
                seqMode: this.seqMode,
                seqLength: this.seqLength,
                seqPosition: this.seqPosition
            }
        };
        if (this.samples?.length) {
            jsonObject.sample = this.samples?.map((sample) => sample.toJson());
        }
        if (this.effects?.length) {
            jsonObject.effects = this.effects?.map((effects) => effects.toJson());
        }
        return jsonObject;
    }
    newSample() {
        this.samples.push(new Sample());
    }
    addSample(sample) {
        this.samples.push(sample);
    }
}

Group.propTypes = {
    id: PropTypes.string,
    enabled: PropTypes.bool,
    tags: PropTypes.string,
    silencingMode: PropTypes.string,
    ampVelTrack: PropTypes.number,
    groupTuning: PropTypes.number,
    volume: PropTypes.number,
    trigger: PropTypes.string,
    attack: PropTypes.number,
    decay: PropTypes.number,
    sustain: PropTypes.number,
    release: PropTypes.number,
    attackCurve: PropTypes.number,
    decayCurve: PropTypes.number,
    releaseCurve: PropTypes.number,
    glideTime: PropTypes.number,
    glideMode: PropTypes.string,
    seqMode: PropTypes.oneOf(["random", "true_random", "round_robin", "allways"]),
    seqLength: PropTypes.number,
    seqPosition: PropTypes.number,
    effects: PropTypes.arrayOf(PropTypes.instanceOf(Effects)),
    samples: PropTypes.arrayOf(PropTypes.instanceOf(Sample))
};
