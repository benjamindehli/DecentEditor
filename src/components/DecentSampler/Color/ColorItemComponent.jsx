// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";

// Components
import { EditColorItemDialog } from "./EditColorItemDialog";

// Template
import { IconColor } from "@/components/Template/Icons/IconColor";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";
import { IconRemove } from "@/components/Template/Icons/IconRemove";

// Functions
import { getIndentSize } from "@/functions/helpers";

// Data
import midiNotes from "@/data/midiNotes";

export function ColorItemComponent({ colorItem, onRemoveItem }) {
    const [editColorItemDialogIsOpen, setEditColorItemDialogIsOpen] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(colorItem.id)} disableRipple>
                    <IconRemove><span style={{ width: 24, height: 24, display: "inline-block", borderRadius: "50%", background: convertColorValueToHex(colorItem.color) }} /></IconRemove>
                    Remove color
                </MenuItem>
            )}
        </Fragment>
    );

    function convertColorValueToHex(hexColor) {
        if (!hexColor) return "#000000";
        return `#${hexColor.substring(2, 8)}`;
    }

    const loNote = parseInt(colorItem.loNote);
    const hiNote = parseInt(colorItem.hiNote);

    const primaryText = "Color";
    const secondaryText = midiNotes[loNote] && midiNotes[hiNote] && (
        <ListItemSecondaryText>
            Key {loNote} ({midiNotes[loNote].name}{midiNotes[loNote].octave}) to key {hiNote} ({midiNotes[hiNote].name}{midiNotes[hiNote].octave})
        </ListItemSecondaryText>
    );

    return (
        <Fragment>
            <DefaultListItem
                elementItem={colorItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => setEditColorItemDialogIsOpen(true)}
            >
                <ListItemButton sx={{ pl: getIndentSize(colorItem, false) }}>
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                        <IconColor color={convertColorValueToHex(colorItem.color)} />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            <EditColorItemDialog
                colorItem={colorItem}
                open={editColorItemDialogIsOpen}
                onClose={() => setEditColorItemDialogIsOpen(false)}
            />
        </Fragment>
    );
}
