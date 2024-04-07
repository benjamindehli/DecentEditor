// Components
import { AudioFile, Settings } from "@mui/icons-material";
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Fragment, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { SettingsMenu } from "../../Template/SettingsMenu";
import { IconColor } from "@/components/Template/Icons/IconColor";

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

    const secondaryText = `${colorItem.loNote} to ${colorItem.hiNote}`;

    function convertColorValueToHex(hexColor) {
        return `#${hexColor.substring(2, 8)}`;
    }

    return (
        <Fragment>
            <ListItem
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="color"
                            id={`${colorItem?.id}-edit-button`}
                            onClick={() => handleClickOpenEditColorItemDialog()}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={colorItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: 9 }} onClick={() => setIsExpanded(!isExpanded)}>
                    <ListItemIcon>
                        <IconColor color={convertColorValueToHex(colorItem.color)} />
                    </ListItemIcon>
                    <ListItemText primary="Color" secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            {/*
            <EditColorItemDialog
                colorItem={colorItem}
                open={editColorItemDialogIsOpen}
                onClose={handleCloseEditColorItemDialog}
            />
            */}
        </Fragment>
    );
}
