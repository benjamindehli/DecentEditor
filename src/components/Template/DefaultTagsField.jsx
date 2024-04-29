// Dependencies
import { useEffect, useRef, useState } from "react";

// Material UI
import { Help } from "@mui/icons-material";
import {
    Chip,
    Collapse,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack
} from "@mui/material";

// Functions
import { capitalizeFirstLetter } from "@/functions/helpers";

export default function DefaultTagsField({
    id,
    name,
    label,
    type = "text",
    defaultValue,
    helperText,
    inputProps,
    autoFocus,
    onChange
}) {
    const [tags, SetTags] = useState(!!defaultValue?.length ? defaultValue.split(",") : []);
    const tagRef = useRef();

    const handleDelete = (value) => {
        const newtags = tags.filter((val) => val !== value);
        SetTags(newtags);
    };
    function handleOnChange(event) {
        if (event.target.value.includes(",")) {
            SetTags([...tags, event.target.value.split(",")[0]]);
            tagRef.current.value = "";
        }
    }

    useEffect(() => {
        onChange(tags.join(","));
    }, [onChange, tags]);

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
                name={name}
                inputProps={{ ...inputProps, "aria-label": labelWithFallback }}
                aria-describedby={helperTextId}
                autoFocus={autoFocus}
                label={labelWithFallback}
                inputRef={tagRef}
                onChange={handleOnChange}
                startAdornment={
                    <Stack direction="row" spacing={1} sx={{ mr: 1 }}>
                        {tags.map((tag, index) => {
                            return <Chip label={tag} key={index} onDelete={() => handleDelete(tag)} />;
                        })}
                    </Stack>
                }
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
            />
            <Collapse in={showHelperText}>
                <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
            </Collapse>
        </FormControl>
    );
}
