// Dependencies
import { v4 as uuidv4 } from "uuid";

export class ControllableParameter {
    constructor(props) {
        this.id = props?.id || uuidv4();
        this.elementType = "controllableParameter";
        this.description = props?.description;
        this.secondaryDescription = props?.secondaryDescription;
        this.type = props?.type;
        this.level = props?.level;
        this.parameter = props?.parameter;
        this.inputProps = props?.inputProps && {
            minValue: props?.inputProps.minValue,
            maxValue: props?.inputProps.maxValue,
            step: props?.inputProps.step,
            type: props?.inputProps.type,
            options: props?.inputProps.options
        };
        this.modulatable = props?.modulatable;
        this.additionalParams = props?.additionalParams;
        this.helperText = props?.helperText;
    }
}
