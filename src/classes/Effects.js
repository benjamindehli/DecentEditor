import { v4 as uuidv4 } from "uuid";
import { Effect } from "./Effect";

export class Effects {
    constructor(props, effectList) {
        this.id = props?.id || uuidv4();
        this.groupId = props?.groupId;
        this.elementType = "effects";
        this.effects = props?.effects || effectList?.map((effect) => new Effect({ ...effect.$ })) || [];
    }
    toJson() {
        return {
            $: {},
            effect: this.effects?.map((effect) => effect.toJson())
        };
    }
}
