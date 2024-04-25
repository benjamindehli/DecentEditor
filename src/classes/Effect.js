// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export class Effect {
    constructor(props, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
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
    toJson(decentSampler) {
        const jsonObject = {
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
        jsonObject["#name"] = this.elementType;
        return jsonObject;
    }
}

Effect.propTypes = {
    type: PropTypes.oneOf([
        "lowpass",
        "lowpass_4pl",
        "lowpass_1pl",
        "bandpass",
        "highpass",
        "notch",
        "peak",
        "gain",
        "reverb",
        "delay",
        "chorus",
        "phaser",
        "convolution",
        "wave_folder",
        "wave_shaper"
    ]).isRequired,
    resonance: PropTypes.number,
    frequency: PropTypes.number,
    q: PropTypes.number,
    gain: PropTypes.number,
    level: PropTypes.number,
    roomSize: PropTypes.number,
    damping: PropTypes.number,
    wetLevel: PropTypes.number,
    delayTimeFormat: PropTypes.oneOf(["seconds", "musical_time"]),
    delayTime: PropTypes.number,
    feedback: PropTypes.number,
    stereoOffset: PropTypes.number,
    mix: PropTypes.number,
    modDepth: PropTypes.number,
    modRate: PropTypes.number,
    centerFrequency: PropTypes.number,
    irFile: PropTypes.string,
    drive: PropTypes.number,
    threshold: PropTypes.number,
    driveBoost: PropTypes.number,
    outputLevel: PropTypes.number,
    highQuality: PropTypes.bool
};
