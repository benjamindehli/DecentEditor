// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { CropSquare } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { EditRectangleItemDialog } from "./Dialogs/EditRectangleItemDialog";

// Template
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function RectangleItemComponent({ rectangleItem, onRemoveItem }) {
    const theme = useTheme();

    const [editRectangleItemDialogIsOpen, setEditRectangleItemDialogIsOpen] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(rectangleItem.id)} disableRipple>
                    <IconRemove><CropSquare /></IconRemove>
                    Remove rectangle
                </MenuItem>
            )}
        </Fragment>
    );

    const primaryText = "Rectangle";
    const secondaryText = rectangleItem?.x !== undefined && rectangleItem?.y !== undefined
        ? <ListItemSecondaryText>x: {rectangleItem.x}, y: {rectangleItem.y}, {rectangleItem.width}×{rectangleItem.height}</ListItemSecondaryText>
        : null;

    return (
        <Fragment>
            <DefaultListItem
                elementItem={rectangleItem}
                onEditButtonClick={() => setEditRectangleItemDialogIsOpen(true)}
                settingsMenuItems={settingsMenuItems}
            >
                <ListItemButton sx={{ pl: getIndentSize(rectangleItem, false) }}>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(rectangleItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <CropSquare />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            <EditRectangleItemDialog
                rectangleItem={rectangleItem}
                open={editRectangleItemDialogIsOpen}
                onClose={() => setEditRectangleItemDialogIsOpen(false)}
            />
        </Fragment>
    );
}
