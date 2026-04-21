// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, ListAlt, MenuOpen } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { OptionItemComponent } from "../Option/OptionItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function MenuItemComponent({ menuItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfOptions, setNumberOfOptions] = useState(menuItem?.childElements?.length || 0);

    function handleOnRemoveOption(optionId) {
        menuItem.removeChildElementById(optionId);
        setNumberOfOptions((n) => n - 1);
    }

    function handleAddOption() {
        menuItem.addOptionItem({});
        setIsExpanded(true);
        setNumberOfOptions((n) => n + 1);
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem onClick={handleAddOption} disableRipple>
                <IconAdd><MenuOpen /></IconAdd>
                Add option
            </MenuItem>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(menuItem.id)} disableRipple>
                    <IconRemove><ListAlt /></IconRemove>
                    Remove menu
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!menuItem?.childElements?.length;
    }

    const primaryText = "Menu";
    const secondaryText = (
        <ListItemSecondaryText>
            {numberOfOptions} {numberOfOptions === 1 ? "option" : "options"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "option":
                return (
                    <OptionItemComponent
                        key={childElement.id}
                        optionItem={childElement}
                        onRemoveItem={handleOnRemoveOption}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={menuItem}
                settingsMenuItems={settingsMenuItems}

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
