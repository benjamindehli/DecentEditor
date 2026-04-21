// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { ChevronRight, ExpandMore, Tab, Web } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { KeyboardItemComponent } from "../Keyboard/KeyboardItemComponent";
import { TabItemComponent } from "../Tab/TabItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Classes
import { Keyboard } from "@/classes/Keyboard";
import { Tab as TabClass } from "@/classes/Tab";

export function UiItemComponent({ uiItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [childCount, setChildCount] = useState(uiItem?.childElements?.length || 0);

    function hasChildren() {
        return !!uiItem?.childElements?.length;
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    const hasKeyboard = uiItem.childElements.some((el) => el instanceof Keyboard);
                    if (!hasKeyboard) {
                        uiItem.childElements.unshift(new Keyboard({}, null, "keyboard", uiItem.hierarchyPath));
                        setIsExpanded(true);
                        setChildCount((n) => n + 1);
                    }
                }}
                disableRipple
            >
                <IconAdd><Web /></IconAdd>
                Add keyboard
            </MenuItem>
            <MenuItem
                onClick={() => {
                    uiItem.childElements.push(new TabClass({}, null, "tab", uiItem.hierarchyPath));
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><Tab /></IconAdd>
                Add tab
            </MenuItem>
        </Fragment>
    );

    const primaryText = "UI";
    const secondaryText = uiItem?.width && uiItem?.height && (
        <ListItemSecondaryText>
            {uiItem?.width}px × {uiItem?.height}px
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "keyboard":
                return <KeyboardItemComponent key={childElement.id} keyboardItem={childElement} />;
            case "tab":
                return <TabItemComponent key={childElement.id} tabItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={uiItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(uiItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(uiItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Web />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!uiItem?.childElements?.length &&
                            uiItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
