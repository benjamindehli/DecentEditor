// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Palette, Piano } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { ColorItemComponent } from "../Color/ColorItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function KeyboardItemComponent({ keyboardItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfColorItems, setNumberOfColorItems] = useState(keyboardItem?.childElements?.length || 0);

    function handleOnRemoveChildElement(itemId) {
        keyboardItem.removeChildElementById(itemId);
        setNumberOfColorItems((n) => n - 1);
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    keyboardItem.addColorItem({});
                    setIsExpanded(true);
                    setNumberOfColorItems((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd>
                    <Palette />
                </IconAdd>
                Add color
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!keyboardItem?.childElements?.length;
    }

    const primaryText = "Keyboard";
    const secondaryText = (
        <ListItemSecondaryText>
            {numberOfColorItems} {numberOfColorItems === 1 ? "color" : "colors"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "color":
                return (
                    <ColorItemComponent
                        key={childElement.id}
                        colorItem={childElement}
                        onRemoveItem={handleOnRemoveChildElement}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={keyboardItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(keyboardItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <ExpandMore /> : <ChevronRight />}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(keyboardItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Piano />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!keyboardItem?.childElements?.length &&
                            keyboardItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
