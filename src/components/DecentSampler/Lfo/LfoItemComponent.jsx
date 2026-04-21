// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Water } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { BindingItemComponent } from "../Binding/BindingItemComponent";
import { EditLfoItemDialog } from "./Dialogs/EditLfoItemDialog";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";
import { IconControllableParameter } from "@/components/Template/Icons/IconControllableParameter";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function LfoItemComponent({ lfoItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [editLfoItemDialogIsOpen, setEditLfoItemDialogIsOpen] = useState(false);
    const [numberOfBindings, setNumberOfBindings] = useState(lfoItem?.childElements?.length || 0);

    function handleOnRemoveBinding(bindingId) {
        lfoItem.removeChildElementById(bindingId);
        setNumberOfBindings((n) => n - 1);
    }

    function handleAddBinding() {
        lfoItem.addBindingItem({});
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
                <MenuItem onClick={() => onRemoveItem(lfoItem.id)} disableRipple>
                    <IconRemove><Water /></IconRemove>
                    Remove LFO
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!lfoItem?.childElements?.length;
    }

    const stateName = lfoItem?.shape?.length && <Chip component="span" label={lfoItem.shape} size="small" />;

    const primaryText = <Fragment>LFO {stateName}</Fragment>;

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
                elementItem={lfoItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => setEditLfoItemDialogIsOpen(true)}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(lfoItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(lfoItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Water />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!lfoItem?.childElements?.length &&
                            lfoItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
            <EditLfoItemDialog
                lfoItem={lfoItem}
                open={editLfoItemDialogIsOpen}
                onClose={() => setEditLfoItemDialogIsOpen(false)}
            />
        </Fragment>
    );
}
