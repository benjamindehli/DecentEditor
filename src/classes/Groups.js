import { v4 as uuidv4 } from "uuid";
import { Group } from "./Group";

export class Groups {
    constructor(props, groups) {
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
        this.groups =
            props?.groups || groups?.map((group) => new Group({ ...group.$ }, groups.effects, group.sample)) || [];
    }
    toJson() {
        return {
            $: {
                attack: this.attack,
                decay: this.decay,
                sustain: this.sustain,
                release: this.release,
                attackCurve: this.attackCurve,
                decayCurve: this.decayCurve,
                releaseCurve: this.releaseCurve,
                volume: this.volume,
                ampVelTrack: this.ampVelTrack
            },
            group: this.groups?.map((group) => group.toJson())
        };
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
