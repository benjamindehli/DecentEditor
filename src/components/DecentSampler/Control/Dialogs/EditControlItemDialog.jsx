// Dependencies
import { Fragment } from "react";

// Material UI
import { MiscellaneousServices, Straighten, Tune } from "@mui/icons-material";

// Template
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import { DefaultTextField } from "@/components/Template/DefaultTextField";
import { DefaultSelectList } from "@/components/Template/DefaultSelectList";
import { DefaultColorField } from "@/components/Template/DefaultColorField";

const controlStyleOptions = [
    { value: "rotary", label: "Rotary knob" },
    { value: "linear_vertical", label: "Linear vertical slider" },
    { value: "linear_horizontal", label: "Linear horizontal slider" },
    { value: "custom_skin_vertical_drag", label: "Custom skin (vertical drag)" },
    { value: "custom_skin_horizontal_drag", label: "Custom skin (horizontal drag)" },
    { value: "custom_skin_vertical_click", label: "Custom skin (vertical click)" },
    { value: "custom_skin_horizontal_click", label: "Custom skin (horizontal click)" }
];

const valueTypeOptions = [
    { value: "float", label: "Float" },
    { value: "integer", label: "Integer" },
    { value: "musical_time", label: "Musical time" }
];

const orientationOptions = [
    { value: "vertical", label: "Vertical" },
    { value: "horizontal", label: "Horizontal" }
];

export function EditControlItemDialog({ controlItem, open, onClose }) {
    function getElementItemValue(name) {
        return controlItem?.[name] ?? "";
    }

    function setElementItemValue(event) {
        controlItem[event.target.name] = event.target.value;
    }

    const tabs = [
        {
            icon: <MiscellaneousServices />,
            label: "GENERAL",
            children: (
                <Fragment key="general-tab">
                    <DefaultTextField
                        name="parameterName"
                        label="Parameter name"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The name of this control shown in the UI. Example: 'Reverb Mix'."
                    />
                    <DefaultSelectList
                        name="style"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={controlStyleOptions}
                        helperText="The visual style of this control."
                    />
                    <DefaultTextField
                        name="minValue"
                        label="Min value"
                        type="number"
                        inputProps={{ step: "0.01" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The minimum value of this control. Default: 0."
                    />
                    <DefaultTextField
                        name="maxValue"
                        label="Max value"
                        type="number"
                        inputProps={{ step: "0.01" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The maximum value of this control. Default: 1."
                    />
                    <DefaultTextField
                        name="value"
                        label="Default value"
                        type="number"
                        inputProps={{ step: "0.01" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The initial value of this control."
                    />
                    <DefaultSelectList
                        name="valueType"
                        label="Value type"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={valueTypeOptions}
                        helperText="The type of value this control represents."
                    />
                    <DefaultColorField
                        name="textColor"
                        label="Text color"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                    />
                    <DefaultTextField
                        name="textSize"
                        label="Text size"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The size of the label text in pixels."
                    />
                    <DefaultTextField
                        name="mouseDragSensitivity"
                        label="Mouse drag sensitivity"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Higher values make the control less sensitive to mouse drags. Default: 100."
                    />
                </Fragment>
            )
        },
        {
            icon: <Straighten />,
            label: "POSITION",
            children: (
                <Fragment key="position-tab">
                    <DefaultTextField
                        name="x"
                        label="X position"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Horizontal position in pixels."
                    />
                    <DefaultTextField
                        name="y"
                        label="Y position"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Vertical position in pixels."
                    />
                    <DefaultTextField
                        name="width"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Width in pixels."
                    />
                    <DefaultTextField
                        name="height"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Height in pixels."
                    />
                </Fragment>
            )
        },
        {
            icon: <Tune />,
            label: "CUSTOM SKIN",
            children: (
                <Fragment key="skin-tab">
                    <DefaultTextField
                        name="customSkinImage"
                        label="Custom skin image"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Path to the image used as a custom skin (sprite sheet)."
                    />
                    <DefaultTextField
                        name="customSkinNumFrames"
                        label="Number of frames"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The number of frames in the custom skin sprite sheet."
                    />
                    <DefaultSelectList
                        name="customSkinImageOrientation"
                        label="Skin orientation"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={orientationOptions}
                        helperText="Whether the sprite sheet frames are arranged vertically or horizontally."
                    />
                </Fragment>
            )
        }
    ];

    const dialogIcon = <Tune />;
    const dialogTitle = "Edit control";

    return (
        !!controlItem && (
            <DefaultItemDialog
                elementItem={controlItem}
                dialogIcon={dialogIcon}
                dialogTitle={dialogTitle}
                contentHeight="540px"
                tabs={tabs}
                open={open}
                onClose={onClose}
            />
        )
    );
}
