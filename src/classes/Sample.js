// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export class Sample {
    constructor(props, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.path = props?.path;
        this.rootNote = props?.rootNote;
        this.loNote = props?.loNote;
        this.hiNote = props?.hiNote;
        this.loVel = props?.loVel;
        this.hiVel = props?.hiVel;
        this.loCCN = props?.loCCN;
        this.hiCCN = props?.hiCCN;
        this.start = props?.start;
        this.end = props?.end;
        this.tuning = props?.tuning;
        this.volume = props?.volume;
        this.pan = props?.pan;
        this.pitchKeyTrack = props?.pitchKeyTrack;
        this.trigger = props?.trigger;
        this.tags = props?.tags;
        this.onLoCCN = props?.onLoCCN;
        this.onHiCCN = props?.onHiCCN;
        this.playbackMode = props?.playbackMode;
        this.loopStart = props?.loopStart;
        this.loopEnd = props?.loopEnd;
        this.loopCrossfade = props?.loopCrossfade;
        this.loopCrossfadeMode = props?.loopCrossfadeMode;
        this.loopEnabled = props?.loopEnabled;
        this.attack = props?.attack;
        this.decay = props?.decay;
        this.sustain = props?.sustain;
        this.release = props?.release;
        this.attackCurve = props?.attackCurve;
        this.decayCurve = props?.decayCurve;
        this.releaseCurve = props?.releaseCurve;
        this.seqMode = props?.seqMode;
        this.seqLength = props?.seqLength;
        this.seqPosition = props?.seqPosition;
        this.silencedByTags = props?.silencedByTags;
        this.silencingMode = props?.silencingMode;
        this.previousNotes = props?.previousNotes;
        this.legatoInterval = props?.legatoInterval;
        this.glideTime = props?.glideTime;
        this.glideMode = props?.glideMode;
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                path: this.path,
                rootNote: this.rootNote,
                loNote: this.loNote,
                hiNote: this.hiNote,
                loVel: this.loVel,
                hiVel: this.hiVel,
                loCCN: this.loCCN,
                hiCCN: this.hiCCN,
                start: this.start,
                end: this.end,
                tuning: this.tuning,
                volume: this.volume,
                pan: this.pan,
                pitchKeyTrack: this.pitchKeyTrack,
                trigger: this.trigger,
                tags: this.tags,
                onLoCCN: this.onLoCCN,
                onHiCCN: this.onHiCCN,
                playbackMode: this.playbackMode,
                loopStart: this.loopStart,
                loopEnd: this.loopEnd,
                loopCrossfade: this.loopCrossfade,
                loopCrossfadeMode: this.loopCrossfadeMode,
                loopEnabled: this.loopEnabled,
                attack: this.attack,
                decay: this.decay,
                sustain: this.sustain,
                release: this.release,
                attackCurve: this.attackCurve,
                decayCurve: this.decayCurve,
                releaseCurve: this.releaseCurve,
                seqMode: this.seqMode,
                seqLength: this.seqLength,
                seqPosition: this.seqPosition,
                silencedByTags: this.silencedByTags,
                silencingMode: this.silencingMode,
                previousNotes: this.previousNotes,
                legatoInterval: this.legatoInterval,
                glideTime: this.glideTime,
                glideMode: this.glideMode
            }
        };
        jsonObject["#name"] = this.elementType;
        return jsonObject;
    }
}

Sample.propTypes = {
    path: PropTypes.string.isRequired,
    rootNote: PropTypes.number.isRequired,
    loNote: PropTypes.number,
    hiNote: PropTypes.number,
    loVel: PropTypes.number,
    hiVel: PropTypes.number,
    loCCN: PropTypes.number,
    hiCCN: PropTypes.number,
    start: PropTypes.number,
    end: PropTypes.number,
    tuning: PropTypes.number,
    volume: PropTypes.number,
    pan: PropTypes.number,
    pitchKeyTrack: PropTypes.number,
    trigger: PropTypes.oneOf(["attack", "release", "first", "legato"]),
    tags: PropTypes.string,
    onLoCCN: PropTypes.number,
    onHiCCN: PropTypes.number,
    playbackMode: PropTypes.oneOf(["memory", "disk_streaming", "auto"]),
    loopStart: PropTypes.number,
    loopEnd: PropTypes.number,
    loopCrossfade: PropTypes.number,
    loopCrossfadeMode: PropTypes.oneOf(["linear", "equal_power"]),
    loopEnabled: PropTypes.bool,
    attack: PropTypes.number,
    decay: PropTypes.number,
    sustain: PropTypes.number,
    release: PropTypes.number,
    attackCurve: PropTypes.number,
    decayCurve: PropTypes.number,
    releaseCurve: PropTypes.number,
    seqMode: PropTypes.oneOf(["random", "true_random", "round_robin", "allways"]),
    seqLength: PropTypes.number,
    seqPosition: PropTypes.number,
    silencedByTags: PropTypes.string,
    silencingMode: PropTypes.oneOf(["fast", "normal"]),
    previousNotes: PropTypes.string,
    legatoInterval: PropTypes.number,
    glideTime: PropTypes.number,
    glideMode: PropTypes.oneOf(["always", "legato", "off"])
};
