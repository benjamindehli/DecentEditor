// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, ShowChart } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { BindingItemComponent } from "../Binding/BindingItemComponent";
import { EditEnvelopeItemDialog } from "./Dialogs/EditEnvelopeItemDialog";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";
import { IconControllableParameter } from "@/components/Template/Icons/IconControllableParameter";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function EnvelopeItemComponent({ envelopeItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [editEnvelopeItemDialogIsOpen, setEditEnvelopeItemDialogIsOpen] = useState(false);
    const [numberOfBindings, setNumberOfBindings] = useState(envelopeItem?.childElements?.length || 0);

    function handleOnRemoveBinding(bindingId) {
        envelopeItem.removeChildElementById(bindingId);
        setNumberOfBindings((n) => n - 1);
    }

    function handleAddBinding() {
        envelopeItem.addBindingItem({});
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
                <MenuItem onClick={() => onRemoveItem(envelopeItem.id)} disableRipple>
                    <IconRemove><ShowChart /></IconRemove>
                    Remove envelope
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!envelopeItem?.childElements?.length;
    }

    const primaryText = "Envelope";

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
                elementItem={envelopeItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => setEditEnvelopeItemDialogIsOpen(true)}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(envelopeItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(envelopeItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <ShowChart />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!envelopeItem?.childElements?.length &&
                            envelopeItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
            <EditEnvelopeItemDialog
                envelopeItem={envelopeItem}
                open={editEnvelopeItemDialogIsOpen}
                onClose={() => setEditEnvelopeItemDialogIsOpen(false)}
            />
        </Fragment>
    );
}
