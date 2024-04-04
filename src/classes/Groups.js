import { v4 as uuidv4 } from "uuid";
import { Group } from "./Group";

export class Groups {
    constructor(props, groups) {
        this.id = uuidv4();
        this.elementType = "groups";
        this.attack = props.attack;
        this.attackCurve = props.attackCurve;
        this.decay = props.decay;
        this.decayCurve = props.decayCurve;
        this.sustain = props.sustain;
        this.release = props.release;
        this.releaseCurve = props.releaseCurve;
        this.volume = props.volume;
        this.ampVelTrack = props.ampVelTrack;
        this.groups = groups.map((group) => new Group({ ...group.$ }, groups.effects, group.sample));
    }
    toJson() {
        return {
            $: {
                attack: this.attack,
                attackCurve: this.attackCurve,
                decay: this.decay,
                decayCurve: this.decayCurve,
                sustain: this.sustain,
                release: this.release,
                releaseCurve: this.releaseCurve,
                volume: this.volume,
                ampVelTrack: this.ampVelTrack
            },
            group: this.groups?.map((group) => group.toJson())
        };
    }
    newGroup() {
        this.groups.push(new Group({}));
    }
    addGroup(group) {
        this.groups.push(group);
    }
    removeGroup(groupId) {
        this.groups = this.groups.filter((group) => group.id !== groupId);
    }
}
