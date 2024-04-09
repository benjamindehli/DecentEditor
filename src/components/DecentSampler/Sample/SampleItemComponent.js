// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AudioFile, RestorePage } from "@mui/icons-material";

// Components
import { EditSampleItemDialog } from "./Dialogs/EditSampleItemDialog";

// Template
import { SettingsMenu } from "../../Template/SettingsMenu";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

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

    function getFileNameFromPath(path) {
        return path?.split("/").pop();
    }

    const secondaryText = sampleItem.path && (
        <ListItemSecondaryText>{getFileNameFromPath(sampleItem.path)}</ListItemSecondaryText>
    );

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
                <ListItemButton sx={{ pl: 9 }} onClick={() => setIsExpanded(!isExpanded)}>
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
