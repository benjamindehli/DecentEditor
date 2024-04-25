// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Group } from "./Group";
import { Effects } from "./Effects";

export class Groups {
    constructor(props, childElements, elementType) {
        const id = props?.id || uuidv4();
        const hierarchyPath = [id];
        this.id = id;
        this.hierarchyPath = props?.hierarchyPath || hierarchyPath;
        this.elementType = props?.elementType || elementType || "groups";
        this.attack = props?.attack;
        this.decay = props?.decay;
        this.sustain = props?.sustain;
        this.release = props?.release;
        this.attackCurve = props?.attackCurve;
        this.decayCurve = props?.decayCurve;
        this.releaseCurve = props?.releaseCurve;
        this.volume = props?.volume;
        this.ampVelTrack = props?.ampVelTrack;
        this.globalTuning = props?.globalTuning;
        this.glideTime = props?.glideTime;
        this.glideMode = props?.glideMode;
        this.seqMode = props?.seqMode;
        this.seqLength = props?.seqLength;
        this.childElements =
            props?.childElement ||
            childElements
                ?.map((childElement) => {
                    const childElementType = childElement["#name"];
                    switch (childElementType) {
                        case "group":
                            return new Group(childElement.$, childElement.$$, childElement["#name"], hierarchyPath);
                        default:
                            return null;
                    }
                })
                .filter((childElement) => childElement) ||
            [];
    }
    getGroupItems() {
        return this.childElements?.filter((childElement) => childElement instanceof Group);
    }
    getGroupItemByIndex(index) {
        return this.getGroupItems()[index];
    }
    getGroupItemsWithEffects() {
        return this.getGroupItems().filter((group) =>
            group.childElements.some((childElement) => childElement instanceof Effects)
        );
    }
    addGroupItem(props) {
        this.childElements.push(new Group(props, null, "group", this.hierarchyPath));
    }
    removeChildElementById(id) {
        this.childElements = this.childElements.filter((childElement) => childElement.id !== id);
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                attack: this.attack,
                decay: this.decay,
                sustain: this.sustain,
                release: this.release,
                attackCurve: this.attackCurve,
                decayCurve: this.decayCurve,
                releaseCurve: this.releaseCurve,
                volume: this.volume,
                ampVelTrack: this.ampVelTrack,
                globalTuning: this.globalTuning,
                glideTime: this.glideTime,
                glideMode: this.glideMode,
                seqMode: this.seqMode,
                seqLength: this.seqLength
            }
        };
        jsonObject["#name"] = this.elementType;
        if (this.childElements?.length) {
            jsonObject.$$ = this.childElements?.map((childElement) => childElement.toJson(decentSampler));
        }
        return jsonObject;
    }
}

Groups.propTypes = {
    id: PropTypes.string,
    attack: PropTypes.number,
    decay: PropTypes.number,
    sustain: PropTypes.number,
    release: PropTypes.number,
    attackCurve: PropTypes.number,
    decayCurve: PropTypes.number,
    releaseCurve: PropTypes.number,
    volume: PropTypes.number,
    ampVelTrack: PropTypes.number,
    globalTuning: PropTypes.number,
    glideTime: PropTypes.number,
    glideMode: PropTypes.oneOf(["always", "legato", "off"]),
    seqMode: PropTypes.oneOf(["random", "true_random", "round_robin", "allways"]),
    seqLength: PropTypes.number,
    childElements: PropTypes.arrayOf(PropTypes.instanceOf(Group))
};
