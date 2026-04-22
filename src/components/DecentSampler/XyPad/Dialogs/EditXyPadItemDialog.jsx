// Dependencies
import { Fragment } from "react";

// Material UI
import { MiscellaneousServices, OpenWith, Straighten } from "@mui/icons-material";

// Template
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import { DefaultTextField } from "@/components/Template/DefaultTextField";
import { DefaultColorField } from "@/components/Template/DefaultColorField";

export function EditXyPadItemDialog({ xyPadItem, open, onClose }) {
    function getElementItemValue(name) {
        return xyPadItem?.[name] ?? "";
    }

    function setElementItemValue(event) {
        xyPadItem[event.target.name] = event.target.value;
    }

    const tabs = [
        {
            icon: <MiscellaneousServices />,
            label: "GENERAL",
            children: (
                <Fragment key="general-tab">
                    <DefaultTextField
                        name="xValue"
                        label="X initial value"
                        type="number"
                        inputProps={{ step: "0.01", min: "0", max: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Initial value of the x-axis. Range: 0–1. Default: 0."
                    />
                    <DefaultTextField
                        name="yValue"
                        label="Y initial value"
                        type="number"
                        inputProps={{ step: "0.01", min: "0", max: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Initial value of the y-axis. Range: 0–1. Default: 0."
                    />
                    <DefaultTextField
                        name="markerDiameter"
                        label="Marker diameter"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Diameter of the movable marker in pixels. Default: 10."
                    />
                    <DefaultColorField
                        name="markerFillColor"
                        label="Marker fill color"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                    />
                    <DefaultColorField
                        name="markerOutlineColor"
                        label="Marker outline color"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                    />
                    <DefaultColorField
                        name="bgColor"
                        label="Background color"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                    />
                    <DefaultColorField
                        name="outlineColor"
                        label="Outline color"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                    />
                    <DefaultTextField
                        name="tags"
                        label="Tags"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Comma-separated list of tags for use with bindings."
                    />
                    <DefaultTextField
                        name="tooltip"
                        label="Tooltip"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Text shown when the user hovers over this control."
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
        }
    ];

    const dialogIcon = <OpenWith />;
    const dialogTitle = "Edit XY pad";

    return (
        !!xyPadItem && (
            <DefaultItemDialog
                elementItem={xyPadItem}
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
