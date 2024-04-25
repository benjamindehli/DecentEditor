// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { AudioFile, RestorePage } from "@mui/icons-material";

// Components
import { EditSampleItemDialog } from "./Dialogs/EditSampleItemDialog";

// Template
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getFgColorForElementType } from "@/functions/styles";
import { IconRemove } from "@/components/Template/Icons/IconRemove";

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
            <MenuItem
                onClick={() => {
                    onRemoveItem(sampleItem.id);
                }}
                disableRipple
            >
                <IconRemove>{sampleItem.loopEnabled === "1" ? <RestorePage /> : <AudioFile />}</IconRemove>
                Remove group
            </MenuItem>
        </Fragment>
    );

    function getFileNameFromPath(path) {
        return path?.split("/").pop();
    }

    const primaryText = "Sample";

    const secondaryText = sampleItem.path && (
        <ListItemSecondaryText>{getFileNameFromPath(sampleItem.path)}</ListItemSecondaryText>
    );

    return (
        <Fragment>
            <DefaultListItem
                elementItem={sampleItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={handleClickOpenEditSampleItemDialog}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(sampleItem, false) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <ListItemIcon sx={{ minWidth: "32px", color: getFgColorForElementType(sampleItem?.elementType) }}>
                        {sampleItem.loopEnabled === "1" ? <RestorePage /> : <AudioFile />}
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            <EditSampleItemDialog
                sampleItem={sampleItem}
                open={editSampleItemDialogIsOpen}
                onClose={handleCloseEditSampleItemDialog}
            />
        </Fragment>
    );
}
