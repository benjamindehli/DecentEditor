// Dependencies
import { v4 as uuidv4 } from "uuid";

export class ControllableParameter {
    constructor(props) {
        this.id = props?.id || uuidv4();
        this.elementType = "controllableParameter";
        this.description = props?.description;
        this.type = props?.type;
        this.level = props?.level;
        this.parameter = props?.parameter;
        this.minValue = props?.minValue;
        this.maxValue = props?.maxValue;
        this.step = props?.step;
        this.modulatable = props?.modulatable;
        this.additionalParams = props?.additionalParams;
        this.helperText = props?.helperText;
    }
   
}
