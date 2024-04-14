import { v4 as uuidv4 } from "uuid";

export class Effect {
    constructor(props) {
        this.id = uuidv4();
        this.groupId = props?.groupId;
        this.elementType = "effect";
        this.type = props?.type;
        this.resonance = props?.resonance;
        this.frequency = props?.frequency;
        this.q = props?.q;
        this.gain = props?.gain;
        this.level = props?.level;
        this.roomSize = props?.roomSize;
        this.damping = props?.damping;
        this.wetLevel = props?.wetLevel;
        this.delayTimeFormat = props?.delayTimeFormat;
        this.delayTime = props?.delayTime;
        this.feedback = props?.feedback;
        this.stereoOffset = props?.stereoOffset;
        this.mix = props?.mix;
        this.modDepth = props?.modDepth;
        this.modRate = props?.modRate;
        this.centerFrequency = props?.centerFrequency;
        this.irFile = props?.irFile;
        this.drive = props?.drive;
        this.threshold = props?.threshold;
        this.driveBoost = props?.driveBoost;
        this.outputLevel = props?.outputLevel;
        this.highQuality = props?.highQuality;
    }
    toJson() {
        return {
            $: {
                type: this.type,
                resonance: this.resonance,
                frequency: this.frequency,
                q: this.q,
                gain: this.gain,
                level: this.level,
                roomSize: this.roomSize,
                damping: this.damping,
                wetLevel: this.wetLevel,
                delayTimeFormat: this.delayTimeFormat,
                delayTime: this.delayTime,
                feedback: this.feedback,
                stereoOffset: this.stereoOffset,
                mix: this.mix,
                modDepth: this.modDepth,
                modRate: this.modRate,
                centerFrequency: this.centerFrequency,
                irFile: this.irFile,
                drive: this.drive,
                threshold: this.threshold,
                driveBoost: this.driveBoost,
                outputLevel: this.outputLevel,
                highQuality: this.highQuality
            }
        };
    }
}
