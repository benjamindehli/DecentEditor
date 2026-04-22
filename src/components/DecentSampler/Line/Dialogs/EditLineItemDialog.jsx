// Dependencies
import { Fragment } from "react";

// Material UI
import { HorizontalRule, Palette } from "@mui/icons-material";

// Template
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import { DefaultTextField } from "@/components/Template/DefaultTextField";
import { DefaultColorField } from "@/components/Template/DefaultColorField";

export function EditLineItemDialog({ lineItem, open, onClose }) {
    function getElementItemValue(name) {
        return lineItem?.[name] ?? "";
    }

    function setElementItemValue(event) {
        lineItem[event.target.name] = event.target.value;
    }

    const tabs = [
        {
            icon: <Palette />,
            label: "APPEARANCE",
            children: (
                <Fragment key="appearance-tab">
                    <DefaultColorField
                        name="lineColor"
                        label="Line color"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                    />
                    <DefaultTextField
                        name="lineThickness"
                        label="Line thickness"
                        type="number"
                        inputProps={{ step: "0.5", min: "0.5" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Thickness of the line in pixels. Default: 1."
                    />
                </Fragment>
            )
        },
        {
            icon: <HorizontalRule />,
            label: "POSITION",
            children: (
                <Fragment key="position-tab">
                    <DefaultTextField
                        name="x1"
                        label="X1 (start)"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="X coordinate of the line's start point."
                    />
                    <DefaultTextField
                        name="y1"
                        label="Y1 (start)"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Y coordinate of the line's start point."
                    />
                    <DefaultTextField
                        name="x2"
                        label="X2 (end)"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="X coordinate of the line's end point."
                    />
                    <DefaultTextField
                        name="y2"
                        label="Y2 (end)"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Y coordinate of the line's end point."
                    />
                </Fragment>
            )
        }
    ];

    const dialogIcon = <HorizontalRule />;
    const dialogTitle = "Edit line";

    return (
        !!lineItem && (
            <DefaultItemDialog
                elementItem={lineItem}
                dialogIcon={dialogIcon}
                dialogTitle={dialogTitle}
                contentHeight="400px"
                tabs={tabs}
                open={open}
                onClose={onClose}
            />
        )
    );
}
