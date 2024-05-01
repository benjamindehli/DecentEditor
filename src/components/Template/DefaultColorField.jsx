// Dependencies
import { Fragment, useState } from "react";
import { MuiColorInput } from "mui-color-input";

// Material UI
import { FormControl } from "@mui/material";

// Helpers
import { capitalizeFirstLetter } from "@/functions/helpers";

export function DefaultColorField({ id, name, label, defaultValue, inputProps }) {
    const labelWithFallback = label || capitalizeFirstLetter(name);
    const idWithFallback = id || name;

    const [color, setColor] = useState(convertColorValueToHex(defaultValue));

    const handleChange = (color) => {
        setColor(color);
    };

    function convertColorValueToHex(colorValue) {
        return `#${colorValue.substring(2)}`;
    }

    return (
        <Fragment>
            {/* <InputLabel htmlFor={id || name}>{labelWithFallback}</InputLabel> */}
            <FormControl margin="dense" fullWidth variant="outlined">
                <MuiColorInput
                    id={idWithFallback}
                    name={name}
                    isAlphaHidden
                    format="hex"
                    onChange={handleChange}
                    value={color}
                    inputProps={{ ...inputProps, "aria-label": labelWithFallback }}
                />
            </FormControl>
        </Fragment>
    );
}
