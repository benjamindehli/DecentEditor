// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Sample } from "./Sample";
import { Effects } from "./Effects";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class Group {
    constructor(props, childElements, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.enabled = props?.enabled;
        this.tags = props?.tags;
        this.silencingMode = props?.silencingMode;
        this.ampVelTrack = props?.ampVelTrack;
        this.pitchKeyTrack = props?.pitchKeyTrack;
        this.groupTuning = props?.groupTuning;
        this.volume = props?.volume;
        this.pan = props?.pan;
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
        this.loCCN = props?.loCCN;
        this.hiCCN = props?.hiCCN;
        this.onLoCCN = props?.onLoCCN;
        this.onHiCCN = props?.onHiCCN;
        this.playbackMode = props?.playbackMode;
        this.loopCrossfade = props?.loopCrossfade;
        this.loopCrossfadeMode = props?.loopCrossfadeMode;
        this.childElements =
            props?.childElements ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "effects":
                            return new Effects(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        case "sample":
                            return new Sample(childElement.$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    getEffectsItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Effects);
    }
    getFirstEffectsItem() {
        return this.childElements?.find((childElement) => childElement instanceof Effects);
    }
    getSampleItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Sample);
    }
    getTags() {
        return this.tags?.split(",");
    }
    removeChildElementById(id) {
        this.childElements = this.childElements.filter((childElement) => childElement.id !== id);
    }
    addSampleItem(props) {
        this.childElements.push(new Sample(props, "sample", this.hierarchyPath));
    }
    toJson(decentSampler, topLevelOnly) {
        const jsonObject = {
            $: {
                enabled: this.enabled,
                tags: this.tags,
                silencingMode: this.silencingMode,
                ampVelTrack: this.ampVelTrack,
                pitchKeyTrack: this.pitchKeyTrack,
                groupTuning: this.groupTuning,
                volume: this.volume,
                pan: this.pan,
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
                seqPosition: this.seqPosition,
                loCCN: this.loCCN,
                hiCCN: this.hiCCN,
                onLoCCN: this.onLoCCN,
                onHiCCN: this.onHiCCN,
                playbackMode: this.playbackMode,
                loopCrossfade: this.loopCrossfade,
                loopCrossfadeMode: this.loopCrossfadeMode
            }
        };
        jsonObject["#name"] = this.elementType;
        if (!topLevelOnly && this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
    toXml(decentSampler, topLevelOnly) {
        const xmlBody = jsonToXml(this.toJson(decentSampler, topLevelOnly));
        const xmlDoc = formatXml(xmlBody);
        return xmlDoc;
    }
}

Group.propTypes = {
    id: PropTypes.string,
    enabled: PropTypes.string,
    tags: PropTypes.string,
    silencingMode: PropTypes.string,
    ampVelTrack: PropTypes.number,
    groupTuning: PropTypes.number,
    volume: PropTypes.number,
    pan: PropTypes.number,
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
    seqMode: PropTypes.oneOf(["random", "true_random", "round_robin", "always"]),
    seqLength: PropTypes.number,
    seqPosition: PropTypes.number,
    loCCN: PropTypes.number,
    hiCCN: PropTypes.number,
    onLoCCN: PropTypes.number,
    onHiCCN: PropTypes.number,
    playbackMode: PropTypes.oneOf(["memory", "disk_streaming", "auto"]),
    loopCrossfade: PropTypes.string,
    loopCrossfadeMode: PropTypes.oneOf(["linear", "equal_power"]),
    childElements: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Effects), PropTypes.instanceOf(Sample)]))
};
