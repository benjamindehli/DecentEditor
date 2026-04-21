// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Tune } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { BindingItemComponent } from "../Binding/BindingItemComponent";
import { EditControlItemDialog } from "./Dialogs/EditControlItemDialog";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";
import { IconControllableParameter } from "@/components/Template/Icons/IconControllableParameter";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function ControlItemComponent({ controlItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [editControlItemDialogIsOpen, setEditControlItemDialogIsOpen] = useState(false);
    const [numberOfBindings, setNumberOfBindings] = useState(controlItem?.childElements?.length || 0);

    function handleOnRemoveBinding(bindingId) {
        controlItem.removeChildElementById(bindingId);
        setNumberOfBindings((n) => n - 1);
    }

    function handleAddBinding() {
        controlItem.addBindingItem({});
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
                <MenuItem onClick={() => onRemoveItem(controlItem.id)} disableRipple>
                    <IconRemove><Tune /></IconRemove>
                    Remove control
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!controlItem?.childElements?.length;
    }

    let primaryInfoText;
    if (controlItem?.label?.length) {
        primaryInfoText = <Chip component="span" label={controlItem.label} size="small" />;
    } else if (controlItem?.parameterName?.length) {
        primaryInfoText = <Chip component="span" label={controlItem.parameterName} size="small" />;
    }

    const primaryText = <Fragment>Control {primaryInfoText}</Fragment>;

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
                elementItem={controlItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => setEditControlItemDialogIsOpen(true)}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(controlItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(controlItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Tune />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!controlItem?.childElements?.length &&
                            controlItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
            <EditControlItemDialog
                controlItem={controlItem}
                open={editControlItemDialogIsOpen}
                onClose={() => setEditControlItemDialogIsOpen(false)}
            />
        </Fragment>
    );
}
