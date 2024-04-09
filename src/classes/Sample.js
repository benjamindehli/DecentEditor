import { v4 as uuidv4 } from "uuid";

export class Sample {
    constructor(props) {
        this.id = uuidv4();
        this.groupId = props?.groupId;
        this.elementType = "sample";
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
    }
    toJson() {
        return {
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
                legatoInterval: this.legatoInterval
            }
        };
    }
}
