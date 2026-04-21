// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Pin } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { BindingItemComponent } from "../Binding/BindingItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";
import { IconControllableParameter } from "@/components/Template/Icons/IconControllableParameter";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Data
import midiCcDescription from "@/data/midiCcDescription";

export function CcItemComponent({ ccItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfBindings, setNumberOfBindings] = useState(ccItem?.childElements?.length || 0);

    function handleOnRemoveBinding(bindingId) {
        ccItem.removeChildElementById(bindingId);
        setNumberOfBindings((n) => n - 1);
    }

    function handleAddBinding() {
        ccItem.addBindingItem({});
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
                <MenuItem onClick={() => onRemoveItem(ccItem.id)} disableRipple>
                    <IconRemove><Pin /></IconRemove>
                    Remove CC
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!ccItem?.childElements?.length;
    }

    let primaryInfoText;
    if (ccItem?.number !== undefined) {
        const ccLabel = midiCcDescription[ccItem.number]
            ? `${ccItem.number}: ${midiCcDescription[ccItem.number]}`
            : String(ccItem.number);
        primaryInfoText = <Chip component="span" label={ccLabel} size="small" />;
    }

    const primaryText = <Fragment>CC {primaryInfoText}</Fragment>;

    const secondaryText = (
        <ListItemSecondaryText>
            {numberOfBindings > 0
                ? `${numberOfBindings} ${numberOfBindings === 1 ? "binding" : "bindings"}`
                : "No bindings"}
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
                elementItem={ccItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(ccItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(ccItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Pin />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!ccItem?.childElements?.length &&
                            ccItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
