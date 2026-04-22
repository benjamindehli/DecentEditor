// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, SwapVert } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { BindingItemComponent } from "../Binding/BindingItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { IconControllableParameter } from "@/components/Template/Icons/IconControllableParameter";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function XyPadYItemComponent({ xyPadYItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfBindings, setNumberOfBindings] = useState(xyPadYItem?.childElements?.length || 0);

    function handleOnRemoveBinding(bindingId) {
        xyPadYItem.removeChildElementById(bindingId);
        setNumberOfBindings((n) => n - 1);
    }

    function handleAddBinding() {
        xyPadYItem.addBindingItem({});
        setIsExpanded(true);
        setNumberOfBindings((n) => n + 1);
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem onClick={handleAddBinding} disableRipple>
                <IconAdd><IconControllableParameter /></IconAdd>
                Add binding
            </MenuItem>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(xyPadYItem.id)} disableRipple>
                    <IconRemove><SwapVert /></IconRemove>
                    Remove Y axis
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!xyPadYItem?.childElements?.length;
    }

    const primaryText = "Y axis";
    const secondaryText = (
        <ListItemSecondaryText>
            {numberOfBindings} {numberOfBindings === 1 ? "binding" : "bindings"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "binding":
                return (
                    <BindingItemComponent
                        key={childElement.id}
                        bindingItem={childElement}
                        onRemoveItem={handleOnRemoveBinding}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={xyPadYItem}
                settingsMenuItems={settingsMenuItems}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(xyPadYItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(xyPadYItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <SwapVert />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!xyPadYItem?.childElements?.length &&
                            xyPadYItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
