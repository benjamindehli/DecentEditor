// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, FormatOverline } from "@mui/icons-material";
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

export function LabeledKnobItemComponent({ labeledKnobItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfBindings, setNumberOfBindings] = useState(labeledKnobItem?.childElements?.length || 0);

    function handleOnRemoveBinding(bindingId) {
        labeledKnobItem.removeChildElementById(bindingId);
        setNumberOfBindings((n) => n - 1);
    }

    function handleAddBinding() {
        labeledKnobItem.addBindingItem({});
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
                <MenuItem onClick={() => onRemoveItem(labeledKnobItem.id)} disableRipple>
                    <IconRemove><FormatOverline /></IconRemove>
                    Remove labeled knob
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!labeledKnobItem?.childElements?.length;
    }

    let primaryInfoText;
    if (labeledKnobItem?.label?.length) {
        primaryInfoText = <Chip component="span" label={labeledKnobItem.label} size="small" />;
    } else if (labeledKnobItem?.parameterName?.length) {
        primaryInfoText = <Chip component="span" label={labeledKnobItem.parameterName} size="small" />;
    }

    const primaryText = <Fragment>Labeled knob {primaryInfoText}</Fragment>;

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
                elementItem={labeledKnobItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(labeledKnobItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(labeledKnobItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <FormatOverline />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!labeledKnobItem?.childElements?.length &&
                            labeledKnobItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
