// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { AudioFile, RestorePage } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { EditSampleItemDialog } from "./Dialogs/EditSampleItemDialog";

// Template
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";
import { IconRemove } from "@/components/Template/Icons/IconRemove";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function SampleItemComponent({ sampleItem, onRemoveItem }) {
    const theme = useTheme();

    const [editSampleItemDialogIsOpen, setEditSampleItemDialogIsOpen] = useState(false);

    const handleClickOpenEditSampleItemDialog = () => {
        setEditSampleItemDialogIsOpen(true);
    };

    const handleCloseEditSampleItemDialog = () => {
        setEditSampleItemDialogIsOpen(false);
    };

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => onRemoveItem?.(sampleItem.id)}
                disableRipple
            >
                <IconRemove>{sampleItem.loopEnabled === "1" ? <RestorePage /> : <AudioFile />}</IconRemove>
                Remove sample
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
                <ListItemButton sx={{ pl: getIndentSize(sampleItem, false) }}>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(sampleItem?.elementType)[theme.palette.mode]
                        }}
                    >
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
