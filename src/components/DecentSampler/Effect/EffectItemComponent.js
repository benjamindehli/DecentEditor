// Dependencies
import { Fragment, useEffect, useState } from "react";

// Material UI
import { ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Tune } from "@mui/icons-material";

// Components
//import { EditSampleItemDialog } from "./Dialogs/EditSampleItemDialog";

// Template
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getFgColorForElementType } from "@/functions/styles";

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
            <DefaultListItem
                elementItem={effectItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={handleClickOpenEditSampleItemDialog}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(effectItem, false) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <ListItemIcon sx={{ minWidth: "32px", color: getFgColorForElementType(effectItem?.elementType) }}>
                        <Tune />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
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
