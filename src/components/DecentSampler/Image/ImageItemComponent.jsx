// Dependencies
import { Fragment } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Template
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function ImageItemComponent({ imageItem, onRemoveItem }) {
    const theme = useTheme();

    const settingsMenuItems = (
        <Fragment>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(imageItem.id)} disableRipple>
                    <IconRemove><ImageIcon /></IconRemove>
                    Remove image
                </MenuItem>
            )}
        </Fragment>
    );

    const primaryText = "Image";
    const secondaryText = (
        <ListItemSecondaryText>
            {imageItem?.path?.length ? imageItem.path : "No image path set"}
        </ListItemSecondaryText>
    );

    return (
        <Fragment>
            <DefaultListItem
                elementItem={imageItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton sx={{ pl: getIndentSize(imageItem, false) }}>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(imageItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <ImageIcon />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
        </Fragment>
    );
}
