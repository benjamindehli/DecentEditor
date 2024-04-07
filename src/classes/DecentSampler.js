import { v4 as uuidv4 } from "uuid";

export class DecentSampler {
    constructor(decentSampler) {
        this.id = uuidv4();
        this.elementType = "DecentSampler";
        this.updateGroupsList = decentSampler?.updateGroupsList;
        this.updateUiList = decentSampler?.updateUiList;
        this.groupsList = decentSampler?.groupsList;
        this.uiList = decentSampler?.uiList;
    }
    toJson() {
        return {
            ui: { ...this.uiList?.[0]?.toJson() },
            groups: { ...this.groupsList?.[0]?.toJson() }
        };
    }
}
