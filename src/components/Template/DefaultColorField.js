// Dependencies
import { Fragment, useState } from "react";
import { MuiColorInput } from "mui-color-input";

// Material UI
import { FormHelperText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Collapse from "@mui/material/Collapse";
import { Help } from "@mui/icons-material";

// Helpers
import { capitalizeFirstLetter } from "@/functions/helpers";

export function DefaultColorField({
    id,
    name,
    label,
    type = "text",
    defaultValue,
    helperText,
    inputProps,
    autoFocus,
    required
}) {
    const [showHelperText, setShowHelperText] = useState(false);

    const handleClickShowHelperText = () => setShowHelperText((showHelperText) => !showHelperText);

    const handleMouseDownShowHelperText = (event) => {
        event.preventDefault();
    };

    const labelWithFallback = label || capitalizeFirstLetter(name);
    const idWithFallback = id || name;
    const helperTextId = `${idWithFallback}-helper-text`;

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
                {/*
            <OutlinedInput
                id={idWithFallback}
                type="color"
                name={name}
                defaultValue={defaultValue}
                inputProps={{ ...inputProps, "aria-label": labelWithFallback }}
                aria-describedby={helperTextId}
                autoFocus={autoFocus}
                required={required}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowHelperText}
                            onMouseDown={handleMouseDownShowHelperText}
                            edge="end"
                        >
                            <Help color={showHelperText ? "primary" : "inherit"} />
                        </IconButton>
                    </InputAdornment>
                }
                label={labelWithFallback}
            />*/}
                <Collapse in={showHelperText}>
                    <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
                </Collapse>
            </FormControl>
        </Fragment>
    );
}
