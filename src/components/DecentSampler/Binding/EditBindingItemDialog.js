// Dependencies
import { useContext, useState } from "react";

// Material UI
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormHelperText,
    Icon,
    Slider,
    Switch,
    Typography
} from "@mui/material";
import { Folder, FolderOff, Group, Palette } from "@mui/icons-material";

// Template
import BindingParameterSelect from "@/components/Template/BindingParameterSelect";
import { DefaultTextField } from "@/components/Template/DefaultTextField";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

// Classes
import { Binding } from "@/classes/Binding";
import GroupEffectSelect from "@/components/Template/GroupEffectSelect";

export function EditBindingItemDialog({
    bindingItem,
    controllableParameters,
    controllableParameterForBinding,
    open,
    onClose
}) {
    const decentSamplerContext = useContext(DecentSamplerContext);
    const [enabled, setEnabled] = useState(bindingItem.enabled !== "0");
    const [selectedBindingParameter, setSelectedBindingParameter] = useState(controllableParameterForBinding);

    function handleBindingParameterChange(value) {
        console.log("handleBindingParameterChange", value);
        setSelectedBindingParameter(value);
    }

    function handleGroupEffectSelectOnChange(value) {
        console.log("handleGroupEffectSelectOnChange", value);
    }

    const defaultValue =
        bindingItem?.groupRef && bindingItem?.effectRef
            ? { groupRef: bindingItem.groupRef, effectRef: bindingItem.effectRef }
            : "";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: "form",
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    onClose();
                }
            }}
        >
            <DialogTitle>
                <Icon>
                    <Palette />
                </Icon>{" "}
                Edit Binding
            </DialogTitle>

            <DialogContent>
                <FormControlLabel
                    value="1"
                    name="enabled"
                    control={
                        <Switch
                            checked={enabled}
                            onChange={(event) => setEnabled(event.target.checked)}
                            inputProps={{ "aria-label": "controlled" }}
                            color="primary"
                        />
                    }
                    label="Enabled"
                />
                <FormHelperText component="span" sx={{ display: "block" }}>
                    Whether or not this binding is enabled. Possible values: true, false. Default: true
                </FormHelperText>
                <BindingParameterSelect
                    onChange={handleBindingParameterChange}
                    controllableParameters={controllableParameters}
                    defaultValue={selectedBindingParameter}
                />
                {selectedBindingParameter && (
                    <DefaultTextField
                        label={selectedBindingParameter.description}
                        name="translationValue"
                        inputProps={selectedBindingParameter.inputProps}
                        defaultValue={bindingItem.translationValue}
                        helperText={selectedBindingParameter.helperText}
                    />
                )}
                <GroupEffectSelect
                    groupRef={bindingItem?.groupRef}
                    effectRef={bindingItem?.effectRef}
                    open={open}
                    onChange={handleGroupEffectSelectOnChange}
                    defaultValue={defaultValue}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    );
}
