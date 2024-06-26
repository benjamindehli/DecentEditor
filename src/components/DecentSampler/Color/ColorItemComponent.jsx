// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Components
import { EditColorItemDialog } from "./EditColorItemDialog";

// Template
import { IconColor } from "@/components/Template/Icons/IconColor";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";

// Data
import midiNotes from "@/data/midiNotes";

export function ColorItemComponent({ colorItem }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [editColorItemDialogIsOpen, setEditColorItemDialogIsOpen] = useState(false);

    const handleClickOpenEditColorItemDialog = () => {
        setEditColorItemDialogIsOpen(true);
    };

    const handleCloseEditColorItemDialog = () => {
        setEditColorItemDialogIsOpen(false);
    };

    const settingsMenuItems = (
        <Fragment>
            <MenuItem onClick={() => console.log("Edit clicked")} disableRipple>
                <EditIcon />
                Edit
            </MenuItem>
            <MenuItem disableRipple>
                <FileCopyIcon />
                Duplicate
            </MenuItem>
            <MenuItem
                onClick={() => {
                    console.log("add color");
                }}
                disableRipple
            >
                <ArchiveIcon />
                Add group
            </MenuItem>
            <MenuItem disableRipple>
                <MoreHorizIcon />
                More
            </MenuItem>
        </Fragment>
    );

    function convertColorValueToHex(hexColor) {
        return `#${hexColor.substring(2, 8)}`;
    }

    const primaryText = "Color";
    const secondaryText = (
        <ListItemSecondaryText>
            Key {colorItem.loNote}({midiNotes[colorItem.loNote].name}
            {midiNotes[colorItem.loNote].octave}) to key {colorItem.hiNote}({midiNotes[colorItem.hiNote].name}
            {midiNotes[colorItem.hiNote].octave})
        </ListItemSecondaryText>
    );

    return (
        <Fragment>
            <DefaultListItem
                elementItem={colorItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={handleClickOpenEditColorItemDialog}
            >
                <ListItemButton sx={{ pl: getIndentSize(colorItem, false) }} onClick={() => setIsExpanded(!isExpanded)}>
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                        <IconColor color={convertColorValueToHex(colorItem.color)} />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            <EditColorItemDialog
                colorItem={colorItem}
                open={editColorItemDialogIsOpen}
                onClose={handleCloseEditColorItemDialog}
            />
        </Fragment>
    );
}
