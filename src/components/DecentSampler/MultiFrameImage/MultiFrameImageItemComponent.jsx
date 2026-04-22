// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { BurstMode } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { EditMultiFrameImageItemDialog } from "./Dialogs/EditMultiFrameImageItemDialog";

// Template
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function MultiFrameImageItemComponent({ multiFrameImageItem, onRemoveItem }) {
    const theme = useTheme();

    const [editMultiFrameImageItemDialogIsOpen, setEditMultiFrameImageItemDialogIsOpen] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(multiFrameImageItem.id)} disableRipple>
                    <IconRemove><BurstMode /></IconRemove>
                    Remove multi-frame image
                </MenuItem>
            )}
        </Fragment>
    );

    const pathChip = multiFrameImageItem?.path?.length
        ? <Chip component="span" label={multiFrameImageItem.path} size="small" />
        : null;

    const primaryText = <Fragment>Multi-frame image {pathChip}</Fragment>;
    const secondaryText = multiFrameImageItem?.numFrames !== undefined
        ? <ListItemSecondaryText>{multiFrameImageItem.numFrames} frames @ {multiFrameImageItem.frameRate} fps</ListItemSecondaryText>
        : null;

    return (
        <Fragment>
            <DefaultListItem
                elementItem={multiFrameImageItem}
                onEditButtonClick={() => setEditMultiFrameImageItemDialogIsOpen(true)}
                settingsMenuItems={settingsMenuItems}
            >
                <ListItemButton sx={{ pl: getIndentSize(multiFrameImageItem, false) }}>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(multiFrameImageItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <BurstMode />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            <EditMultiFrameImageItemDialog
                multiFrameImageItem={multiFrameImageItem}
                open={editMultiFrameImageItemDialogIsOpen}
                onClose={() => setEditMultiFrameImageItemDialogIsOpen(false)}
            />
        </Fragment>
    );
}
