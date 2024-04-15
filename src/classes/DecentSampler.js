// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Classes
import { Groups } from "./Groups";
import { Ui } from "./Ui";

export class DecentSampler {
    constructor(decentSampler) {
        this.id = uuidv4();
        this.elementType = "decentSampler";
        this.updateGroupsList = decentSampler?.updateGroupsList;
        this.updateUiList = decentSampler?.updateUiList;
        this.groupsList = decentSampler?.groupsList;
        this.uiList = decentSampler?.uiList;
    }
    toJson() {
        const jsonObject = {};
        if (this.uiList?.length && Object.keys(this.uiList?.[0])?.length) {
            jsonObject.ui = { ...this.uiList?.[0]?.toJson() };
        }
        if (this.groupsList?.length && Object.keys(this.groupsList?.[0])?.length) {
            jsonObject.groups = { ...this.groupsList?.[0]?.toJson() };
        }
        return jsonObject;
    }
}

DecentSampler.propTypes = {
    updateGroupsList: PropTypes.function,
    updateUiList: PropTypes.function,
    groupsList: PropTypes.arrayOf(PropTypes.instanceOf(Groups)),
    uiList: PropTypes.arrayOf(PropTypes.instanceOf(Ui))
};
