// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, ListAlt } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { OptionItemComponent } from "../Option/OptionItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";
import { getColorForElementType } from "@/functions/styles";

export function MenuItemComponent({ menuItem }) {
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

    function hasChildren() {
        return !!menuItem?.childElements?.length;
    }

    const primaryText = "Menu";
    const secondaryText = (
        <ListItemSecondaryText>
            {menuItem?.childElements?.length || 0} {menuItem?.childElements?.length === 1 ? "option" : "options"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "option":
                return <OptionItemComponent key={childElement.id} optionItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={menuItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => console.log("onClick")}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(menuItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(menuItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <ListAlt />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!menuItem?.childElements?.length &&
                            menuItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
