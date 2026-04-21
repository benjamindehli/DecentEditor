// Dependencies
import { Fragment, useState } from "react";
import { MuiColorInput } from "mui-color-input";

// Material UI
import { FormControl } from "@mui/material";

// Helpers
import { capitalizeFirstLetter } from "@/functions/helpers";

export function DefaultColorField({ id, name, label, inputProps, onChange, getValue }) {
    const labelWithFallback = label || capitalizeFirstLetter(name);
    const idWithFallback = id || name;

    const [value, setValue] = useState(convertColorValueToHex(getValue(name)));

    function handleOnChange(value) {
        setValue(value);
        onChange({ target: { name: name, value: value.replace("#", "FF") } });
    }

    function convertColorValueToHex(colorValue) {
        return `#${colorValue.substring(2)}`;
    }

    return (
        <Fragment>
            <FormControl margin="dense" fullWidth variant="outlined">
                <MuiColorInput
                    id={idWithFallback}
                    name={name}
                    isAlphaHidden
                    format="hex"
                    onChange={handleOnChange}
                    value={value}
                    inputProps={{ ...inputProps, "aria-label": labelWithFallback }}
                />
            </FormControl>
        </Fragment>
    );
}
