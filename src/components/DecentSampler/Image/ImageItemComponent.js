// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Folder, Image as ImageIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function ImageItemComponent({ imageItem }) {
    const theme = useTheme();

    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    // keyboardItem.newColor();
                    // decentSamplerContext.updateKeyboardItem(keyboardItem);
                }}
                disableRipple
            >
                <IconAdd>
                    <Folder />
                </IconAdd>
                Add color
            </MenuItem>
            <MenuItem
                onClick={() => {
                    //   keyboardItem.newColor();
                    //   decentSamplerContext.updateKeyboardItem(keyboardItem);
                }}
                disableRipple
            >
                <Folder />
                Add multiple colors
            </MenuItem>
        </Fragment>
    );

    const primaryText = "Image";
    const secondaryText = (
        <ListItemSecondaryText>
            {imageItem?.path?.length ? imageItem?.path : "No image path added"}
        </ListItemSecondaryText>
    );

    return (
        <Fragment>
            <DefaultListItem
                elementItem={imageItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => console.log("onClick")}
            >
                <ListItemButton sx={{ pl: getIndentSize(imageItem, false) }} onClick={() => setIsExpanded(!isExpanded)}>
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
