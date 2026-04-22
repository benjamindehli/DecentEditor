// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { HorizontalRule } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { EditLineItemDialog } from "./Dialogs/EditLineItemDialog";

// Template
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function LineItemComponent({ lineItem, onRemoveItem }) {
    const theme = useTheme();

    const [editLineItemDialogIsOpen, setEditLineItemDialogIsOpen] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(lineItem.id)} disableRipple>
                    <IconRemove><HorizontalRule /></IconRemove>
                    Remove line
                </MenuItem>
            )}
        </Fragment>
    );

    const primaryText = "Line";
    const secondaryText = lineItem?.x1 !== undefined && lineItem?.y1 !== undefined
        ? <ListItemSecondaryText>({lineItem.x1}, {lineItem.y1}) → ({lineItem.x2}, {lineItem.y2})</ListItemSecondaryText>
        : null;

    return (
        <Fragment>
            <DefaultListItem
                elementItem={lineItem}
                onEditButtonClick={() => setEditLineItemDialogIsOpen(true)}
                settingsMenuItems={settingsMenuItems}
            >
                <ListItemButton sx={{ pl: getIndentSize(lineItem, false) }}>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(lineItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <HorizontalRule />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            <EditLineItemDialog
                lineItem={lineItem}
                open={editLineItemDialogIsOpen}
                onClose={() => setEditLineItemDialogIsOpen(false)}
            />
        </Fragment>
    );
}
