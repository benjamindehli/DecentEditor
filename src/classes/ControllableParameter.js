// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Data
import {
    bindingAdditionalParams,
    bindingInputTypes,
    bindingLevels,
    bindingParameters,
    bindingTypes
} from "@/data/bindingPropValues";

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
            min: props?.inputProps.min,
            max: props?.inputProps.max,
            step: props?.inputProps.step,
            type: props?.inputProps.type,
            options: props?.inputProps.options
        };
        this.modulatable = props?.modulatable;
        this.additionalParams = props?.additionalParams;
        this.helperText = props?.helperText;
    }
    hasAdditionalParam(param) {
        return this.additionalParams?.includes(param);
    }
}

ControllableParameter.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    secondaryDescription: PropTypes.string,
    type: PropTypes.oneOf(bindingTypes),
    level: PropTypes.oneOf(bindingLevels),
    parameter: PropTypes.oneOf(bindingParameters),
    inputProps: PropTypes.shape({
        minValue: PropTypes.number,
        maxValue: PropTypes.number,
        step: PropTypes.number,
        type: PropTypes.oneOf(bindingInputTypes),
        options: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.string
            })
        )
    }),
    modulatable: PropTypes.bool,
    additionalParams: PropTypes.arrayOf(PropTypes.oneOf(bindingAdditionalParams)),
    helperText: PropTypes.string
};
