// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Sample } from "./Sample";
import { Effects } from "./Effects";

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
    removeChildElementById(id) {
        this.childElements = this.childElements.filter((childElement) => childElement.id !== id);
    }
    addSampleItem(props) {
        this.childElements.push(new Sample(props, "sample", this.hierarchyPath));
    }
    toJson(decentSampler) {
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
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
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
    childElements: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Effects), PropTypes.instanceOf(Sample)]))
};
