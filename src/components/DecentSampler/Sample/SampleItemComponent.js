// Components
import { AudioFile, ExpandLess, ExpandMore, RestorePage, Settings } from "@mui/icons-material";
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Fragment, useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { SettingsMenu } from "../../Template/SettingsMenu";
import { EditSampleItemDialog } from "./Dialogs/EditSampleItemDialog";

export function SampleItemComponent({ sampleItem }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [editSampleItemDialogIsOpen, setEditSampleItemDialogIsOpen] = useState(false);

    const handleClickOpenEditSampleItemDialog = () => {
        setEditSampleItemDialogIsOpen(true);
    };

    const handleCloseEditSampleItemDialog = () => {
        setEditSampleItemDialogIsOpen(false);
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
                    handleAddGroup();
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

    const secondaryText = `${sampleItem.path}`;

    return (
        <Fragment>
            <ListItem
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="comments"
                            id={`${sampleItem?.id}-edit-button`}
                            onClick={() => handleClickOpenEditSampleItemDialog()}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={sampleItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: 8 }} onClick={() => setIsExpanded(!isExpanded)}>
                    <ListItemIcon>{sampleItem.loopEnabled === "1" ? <RestorePage /> : <AudioFile />}</ListItemIcon>
                    <ListItemText primary="Sample" secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <EditSampleItemDialog
                sampleItem={sampleItem}
                open={editSampleItemDialogIsOpen}
                onClose={handleCloseEditSampleItemDialog}
            />
        </Fragment>
    );
}
