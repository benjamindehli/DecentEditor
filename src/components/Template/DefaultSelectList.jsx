// Dependencies
import React, { useState } from "react";

// Material UI
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Collapse, FormHelperText, IconButton, InputAdornment, Typography } from "@mui/material";
import { Help } from "@mui/icons-material";

// Functions
import { capitalizeFirstLetter } from "@/functions/helpers";

export function DefaultSelectList({
    id,
    name,
    label,
    getDefaultValue,
    options,
    helperText,
    inputProps,
    autoFocus,
    required,
    onChange
}) {
    const [showHelperText, setShowHelperText] = useState(false);

    const handleClickShowHelperText = () => setShowHelperText((showHelperText) => !showHelperText);

    const handleMouseDownShowHelperText = (event) => {
        event.preventDefault();
    };

    const labelWithFallback = label || capitalizeFirstLetter(name);
    const idWithFallback = id || name;
    const helperTextId = `${idWithFallback}-helper-text`;
    const hasHelperText = !!helperText?.length;

    return (
        <FormControl margin="dense" fullWidth variant="outlined">
            <InputLabel htmlFor={id || name}>{labelWithFallback}</InputLabel>
            <Select
                id={idWithFallback}
                name={name}
                defaultValue={getDefaultValue(name)}
                inputProps={{ ...inputProps, "aria-label": labelWithFallback }}
                aria-describedby={helperTextId}
                autoFocus={autoFocus}
                required={required}
                onChange={onChange}
                label={labelWithFallback}
                input={<OutlinedInput label="Glide mode" />}
                endAdornment={
                    hasHelperText && (
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
                    )
                }
                sx={{
                    "& .MuiSelect-icon": hasHelperText && {
                        marginRight: 5
                    }
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{ flexDirection: "column", alignItems: "start", columnGap: 1 }}
                    >
                        <div>{option.label}</div>
                        {option?.description?.length && (
                            <Typography component="span" noWrap fontSize={14} color="text.secondary">
                                {option.description}
                            </Typography>
                        )}
                    </MenuItem>
                ))}
            </Select>
            {hasHelperText && (
                <Collapse in={showHelperText}>
                    <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
                </Collapse>
            )}
        </FormControl>
    );
}
