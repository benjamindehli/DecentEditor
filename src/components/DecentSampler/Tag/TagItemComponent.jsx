// Dependencies
import { Fragment } from "react";

// Material UI
import { ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { LocalOffer, LocalOfferOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Template
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function TagItemComponent({ tagItem, onRemoveItem }) {
    const theme = useTheme();

    const settingsMenuItems = (
        <Fragment>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(tagItem.id)} disableRipple>
                    <IconRemove><LocalOffer /></IconRemove>
                    Remove tag
                </MenuItem>
            )}
        </Fragment>
    );

    const primaryText = "Tag";
    const secondaryText = <ListItemSecondaryText>{tagItem.name}</ListItemSecondaryText>;

    return (
        <Fragment>
            <DefaultListItem
                elementItem={tagItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton sx={{ pl: getIndentSize(tagItem, false) }}>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(tagItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        {tagItem.enabled !== "0" ? <LocalOffer /> : <LocalOfferOutlined />}
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
        </Fragment>
    );
}
