// Dependencies
import { useState } from "react";

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

export function DefaultTextField({
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

    return (
        <FormControl margin="dense" fullWidth variant="outlined">
            <InputLabel htmlFor={id || name}>{labelWithFallback}</InputLabel>
            <OutlinedInput
                id={idWithFallback}
                type={type}
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
            />
            <Collapse in={showHelperText}>
                <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
            </Collapse>
        </FormControl>
        /*<Fragment>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <TextField
                        margin="dense"
                        id={id || name}
                        name={name}
                        label={label || capitalizeFirstLetter(name)}
                        type={type}
                        defaultValue={defaultValue}
                        fullWidth
                        variant="standard"
                        inputProps={inputProps}
                        autoFocus={autoFocus}
                        required={required}
                        endAdornment={
                            <IconButton color="primary" aria-label="add to shopping cart">
                                <Help />
                            </IconButton>
                        }
                    />
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Fragment>*/
    );
}