// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { AutoAwesome } from "@mui/icons-material";
import { FormHelperText, MenuItem, Select, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Collapse, Typography } from "@mui/material";
import { Help } from "@mui/icons-material";

// Template
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import { DefaultTextField } from "@/components/Template/DefaultTextField";

// Data
import effectTypesData from "@/data/effectTypes";

const delayTimeFormatOptions = [
    { value: "seconds", label: "Seconds" },
    { value: "musical_time", label: "Musical time" }
];

function EffectTypeSelect({ value, onChange }) {
    const [showHelperText, setShowHelperText] = useState(false);
    return (
        <FormControl margin="dense" fullWidth variant="outlined">
            <InputLabel htmlFor="effect-type">Effect type</InputLabel>
            <Select
                id="effect-type"
                name="type"
                value={value}
                onChange={onChange}
                label="Effect type"
                input={<OutlinedInput label="Effect type" />}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowHelperText(!showHelperText)}
                            edge="end"
                        >
                            <Help color={showHelperText ? "primary" : "inherit"} />
                        </IconButton>
                    </InputAdornment>
                }
                sx={{ "& .MuiSelect-icon": { marginRight: 5 } }}
            >
                {effectTypesData.map((effectType) => (
                    <MenuItem key={effectType.type} value={effectType.type}
                        sx={{ flexDirection: "column", alignItems: "start" }}>
                        <div>{effectType.description}</div>
                        {effectType.helperText && (
                            <Typography component="span" noWrap fontSize={14} color="text.secondary">
                                {effectType.helperText}
                            </Typography>
                        )}
                    </MenuItem>
                ))}
            </Select>
            <Collapse in={showHelperText}>
                <FormHelperText>The type of effect to apply.</FormHelperText>
            </Collapse>
        </FormControl>
    );
}

export function EditEffectItemDialog({ effectItem, open, onClose }) {
    const [selectedType, setSelectedType] = useState(effectItem.type || "");

    function handleTypeChange(event) {
        const newType = event.target.value;
        setSelectedType(newType);
        effectItem.type = newType;
    }

    function getElementItemValue(name) {
        return effectItem?.[name] ?? "";
    }

    function setElementItemValue(event) {
        effectItem[event.target.name] = event.target.value;
    }

    const selectedEffectType = effectTypesData.find((et) => et.type === selectedType);

    function renderField(field) {
        if (field.inputProps?.type === "select") {
            const options = field.inputProps.options || [];
            const SelectWrapper = () => {
                const [showHelperText, setShowHelperText] = useState(false);
                const [val, setVal] = useState(getElementItemValue(field.key));
                return (
                    <FormControl margin="dense" fullWidth variant="outlined">
                        <InputLabel htmlFor={field.key}>{field.label}</InputLabel>
                        <Select
                            id={field.key}
                            name={field.key}
                            value={val}
                            onChange={(e) => { setVal(e.target.value); setElementItemValue(e); }}
                            label={field.label}
                            input={<OutlinedInput label={field.label} />}
                            endAdornment={
                                field.helperText && (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowHelperText(!showHelperText)} edge="end">
                                            <Help color={showHelperText ? "primary" : "inherit"} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                            sx={{ "& .MuiSelect-icon": { marginRight: 5 } }}
                        >
                            {options.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                        </Select>
                        {field.helperText && (
                            <Collapse in={showHelperText}>
                                <FormHelperText>{field.helperText}</FormHelperText>
                            </Collapse>
                        )}
                    </FormControl>
                );
            };
            return <SelectWrapper key={field.key} />;
        }
        return (
            <DefaultTextField
                key={field.key}
                name={field.key}
                label={field.label}
                type={field.inputProps?.type || "text"}
                inputProps={{
                    step: field.inputProps?.step,
                    min: field.inputProps?.minValue,
                    max: field.inputProps?.maxValue
                }}
                onChange={setElementItemValue}
                getValue={getElementItemValue}
                helperText={field.helperText}
            />
        );
    }

    const tabs = [
        {
            label: "GENERAL",
            children: (
                <Fragment key="general-tab">
                    <EffectTypeSelect value={selectedType} onChange={handleTypeChange} />
                    {selectedEffectType?.fields?.map((field) => renderField(field))}
                </Fragment>
            )
        }
    ];

    const dialogIcon = <AutoAwesome />;
    const dialogTitle = "Edit effect";

    return (
        !!effectItem && (
            <DefaultItemDialog
                elementItem={effectItem}
                dialogIcon={dialogIcon}
                dialogTitle={dialogTitle}
                contentHeight="480px"
                tabs={tabs}
                open={open}
                onClose={onClose}
            />
        )
    );
}
