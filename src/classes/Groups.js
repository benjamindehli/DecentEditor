// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Group } from "./Group";

export class Groups {
    constructor(props, groupList) {
        this.id = props?.id || uuidv4();
        this.elementType = "groups";
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
        this.groups =
            props?.groups || groupList?.map((group) => new Group({ ...group.$ }, group.effects, group.sample)) || [];
    }
    toJson() {
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
        if (this.groups?.length) {
            jsonObject.group = this.groups?.map((group) => group.toJson());
        }
        return jsonObject;
    }
    newGroup() {
        this.groups.push(new Group());
    }
    addGroup(group) {
        this.groups.push(group);
    }
    removeGroup(groupId) {
        this.groups = this.groups.filter((group) => group.id !== groupId);
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
    groups: PropTypes.arrayOf(PropTypes.instanceOf(Group))
};
