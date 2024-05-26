// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { FormControl, FormControlLabel, FormHelperText, Switch } from "@mui/material";

// Template
import BindingParameterSelect from "@/components/Template/BindingParameterSelect";
import { DefaultTextField } from "@/components/Template/DefaultTextField";

// Classes
import GroupEffectSelect from "@/components/Template/GroupEffectSelect";
import ControlSelect from "@/components/Template/ControlSelect";
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import { IconControllableParameter } from "@/components/Template/Icons/IconControllableParameter";
import StateSelect from "@/components/Template/StateSelect";

export function EditBindingItemDialog({ bindingItem, open, onClose }) {
    const [enabled, setEnabled] = useState(bindingItem.enabled !== "0");
    const [selectedBindingParameter, setSelectedBindingParameter] = useState(bindingItem.controllableParameterRef);
    const [stateBinding, setStateBinding] = useState(
        bindingItem?.controlRef && bindingItem?.stateRef
            ? { controlRef: bindingItem.controlRef, stateRef: bindingItem.stateRef }
            : ""
    );
    const [controlBinding, setControlBinding] = useState(bindingItem?.controlRef);

    function handleEnabledOnChange(event) {
        bindingItem.enabled = event.target.checked ? "1" : "0";
        setEnabled(event.target.checked);
    }

    function handleBindingParameterChange(value) {
        console.log("handleBindingParameterChange", value);
        bindingItem.level = value.level;
        bindingItem.type = value.type;
        bindingItem.parameter = value.parameter;
        bindingItem.controllableParameterRef = value;
        setSelectedBindingParameter(value);
    }

    function handleGroupEffectSelectOnChange(value) {
        console.log("handleGroupEffectSelectOnChange", value);
    }

    function handleControlSelectOnChange(value) {
        console.log("handleControlSelectOnChange", value);
        setControlBinding(value);
        bindingItem.controlRef = value;
    }

    function handleStateSelectOnChange(value) {
        setStateBinding(value);
        bindingItem.controlRef = value.controlRef;
        bindingItem.stateRef = value.stateRef;
    }

    function getElementItemValue(name) {
        return bindingItem?.[name] || "";
    }

    function setElementItemValue(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        bindingItem[fieldName] = fieldValue;
    }

    const tabs = [
        {
            icon: "",
            label: "GENERAL",
            children: (
                <Fragment>
                    <FormControl margin="dense">
                        <FormControlLabel
                            value="1"
                            name="enabled"
                            control={
                                <Switch
                                    checked={enabled}
                                    onChange={handleEnabledOnChange}
                                    inputProps={{ "aria-label": "controlled" }}
                                    color="primary"
                                    sx={{ ml: 1 }}
                                />
                            }
                            label="Enabled"
                        />
                        <FormHelperText component="span" sx={{ display: "block" }}>
                            Whether or not this binding is enabled. Possible values: true, false. Default: true
                        </FormHelperText>
                    </FormControl>

                    <BindingParameterSelect
                        onChange={handleBindingParameterChange}
                        defaultValue={selectedBindingParameter}
                    />
                    {selectedBindingParameter && (
                        <DefaultTextField
                            label={selectedBindingParameter.description}
                            name="translationValue"
                            inputProps={selectedBindingParameter.inputProps}
                            onChange={setElementItemValue}
                            getValue={getElementItemValue}
                            helperText={selectedBindingParameter.helperText}
                        />
                    )}
                    <GroupEffectSelect
                        groupRef={bindingItem?.groupRef}
                        effectRef={bindingItem?.effectRef}
                        open={open}
                        onChange={handleGroupEffectSelectOnChange}
                    />
                    <ControlSelect controlBinding={controlBinding} open={open} onChange={handleControlSelectOnChange} />
                    <StateSelect stateBinding={stateBinding} open={open} onChange={handleStateSelectOnChange} />

                    <DefaultTextField
                        name="volume"
                        type="number"
                        inputProps={{ step: "0.1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The volume of the group. Value can be in linear 0.0-1.0 or in decibels. If it’s in decibels you must append dB after the value (example: “3dB”). Default: 1.0"
                    />
                </Fragment>
            )
        }
    ];

    const dialogIcon = <IconControllableParameter controllableParameter={selectedBindingParameter} />;
    const dialogTitle = "Edit binding";

    return (
        <DefaultItemDialog
            elementItem={bindingItem}
            dialogIcon={dialogIcon}
            dialogTitle={dialogTitle}
            contentHeight="564px"
            tabs={tabs}
            open={open}
            onClose={onClose}
        />
    );
}
