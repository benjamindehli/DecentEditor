// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, SwapHoriz } from "@mui/icons-material";
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

export function XyPadXItemComponent({ xyPadXItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfBindings, setNumberOfBindings] = useState(xyPadXItem?.childElements?.length || 0);

    function handleOnRemoveBinding(bindingId) {
        xyPadXItem.removeChildElementById(bindingId);
        setNumberOfBindings((n) => n - 1);
    }

    function handleAddBinding() {
        xyPadXItem.addBindingItem({});
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
                <MenuItem onClick={() => onRemoveItem(xyPadXItem.id)} disableRipple>
                    <IconRemove><SwapHoriz /></IconRemove>
                    Remove X axis
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!xyPadXItem?.childElements?.length;
    }

    const primaryText = "X axis";
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
                elementItem={xyPadXItem}
                settingsMenuItems={settingsMenuItems}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(xyPadXItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(xyPadXItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <SwapHoriz />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!xyPadXItem?.childElements?.length &&
                            xyPadXItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
