// Dependencies
import { Fragment, useEffect, useState } from "react";

// Material UI
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AudioFile, RestorePage } from "@mui/icons-material";

// Components
//import { EditSampleItemDialog } from "./Dialogs/EditSampleItemDialog";

// Template
import { SettingsMenu } from "../../Template/SettingsMenu";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Data
import effectTypesData from "@/data/effectTypes";

export function EffectItemComponent({ effectItem }) {
    const [effectTypeForEffectItem, setEffectTypeForEffectItem] = useState(null);

    const [isExpanded, setIsExpanded] = useState(false);
    const [editSampleItemDialogIsOpen, setEditSampleItemDialogIsOpen] = useState(false);

    function getEffectTypeForEffectItem(type) {
        return effectTypesData.find((effectType) => {
            return effectType.type === type.type;
        });
    }

    useEffect(() => {
        const effectType = getEffectTypeForEffectItem(effectItem);
        setEffectTypeForEffectItem(effectType);
        if (!effectType) {
            console.log("noMatch", effectType);
        }
    }, [effectItem]);

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
                    // handleAddGroup();
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

    const primaryText = "Effect";

    const secondaryText = <ListItemSecondaryText>{effectTypeForEffectItem?.description}</ListItemSecondaryText>;

    return (
        <Fragment>
            <ListItem
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="edit effect"
                            id={`${effectItem?.id}-edit-button`}
                            onClick={() => handleClickOpenEditSampleItemDialog()}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={effectItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: 11 }} onClick={() => setIsExpanded(!isExpanded)}>
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                        <RestorePage />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            {/*
            <EditSampleItemDialog
                sampleItem={sampleItem}
                open={editSampleItemDialogIsOpen}
                onClose={handleCloseEditSampleItemDialog}
            />
            */}
        </Fragment>
    );
}
