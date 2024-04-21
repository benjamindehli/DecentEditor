// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Template
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { IconColor } from "@/components/Template/Icons/IconColor";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getBgColorForElementType, getFgColorForElementType } from "@/functions/styles";

// Data
import midiNotes from "@/data/midiNotes";
import { Label, LabelOff, Tag } from "@mui/icons-material";

export function TagItemComponent({ tagItem }) {
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

    const primaryText = "Tag";
    const secondaryText = <ListItemSecondaryText>{tagItem.name}</ListItemSecondaryText>;

    return (
        <Fragment>
            <ListItem
                sx={{ bgcolor: getBgColorForElementType(tagItem?.elementType) }}
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="edit tag"
                            id={`${tagItem?.id}-edit-button`}
                            onClick={() => handleClickOpenEditColorItemDialog()}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={tagItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: getIndentSize(tagItem, false) }} onClick={() => setIsExpanded(!isExpanded)}>
                    <ListItemIcon sx={{ minWidth: "32px", color: getFgColorForElementType(tagItem?.elementType) }}>
                        {tagItem.enabled !== "0" ? <Label /> : <LabelOff />}
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
        </Fragment>
    );
}
