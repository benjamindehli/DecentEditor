// Dependencies
import { Fragment } from "react";

// Material UI
import { CropSquare, Palette, Straighten } from "@mui/icons-material";

// Template
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import { DefaultTextField } from "@/components/Template/DefaultTextField";
import { DefaultColorField } from "@/components/Template/DefaultColorField";

export function EditRectangleItemDialog({ rectangleItem, open, onClose }) {
    function getElementItemValue(name) {
        return rectangleItem?.[name] ?? "";
    }

    function setElementItemValue(event) {
        rectangleItem[event.target.name] = event.target.value;
    }

    const tabs = [
        {
            icon: <Palette />,
            label: "APPEARANCE",
            children: (
                <Fragment key="appearance-tab">
                    <DefaultColorField
                        name="fillColor"
                        label="Fill color"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                    />
                    <DefaultColorField
                        name="borderColor"
                        label="Border color"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                    />
                    <DefaultTextField
                        name="borderThickness"
                        label="Border thickness"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Thickness of the border in pixels. Set to 0 for no border."
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

    const dialogIcon = <CropSquare />;
    const dialogTitle = "Edit rectangle";

    return (
        !!rectangleItem && (
            <DefaultItemDialog
                elementItem={rectangleItem}
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
