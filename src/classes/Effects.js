// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Effect } from "./Effect";

export class Effects {
    constructor(props, effectList) {
        this.id = props?.id || uuidv4();
        this.groupId = props?.groupId;
        this.elementType = "effects";
        this.effects = props?.effects || effectList?.map((effect) => new Effect({ ...effect.$ })) || [];
    }
    toJson() {
        const jsonObject = {};
        if (this.effects?.length) {
            jsonObject.effect = this.effects?.map((effect) => effect.toJson());
        }
        return jsonObject;
    }
}

Effects.propTypes = {
    id: PropTypes.string,
    groupId: PropTypes.string,
    effects: PropTypes.arrayOf(PropTypes.instanceOf(Effect))
};
