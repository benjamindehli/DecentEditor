// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { ChevronRight, ExpandMore, ShowChart, SwapCalls, Water } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { LfoItemComponent } from "../Lfo/LfoItemComponent";
import { EnvelopeItemComponent } from "../Envelope/EnvelopeItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function ModulatorsItemComponent({ modulatorsItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [childCount, setChildCount] = useState(modulatorsItem?.childElements?.length || 0);

    function handleOnRemoveChildElement(id) {
        modulatorsItem.removeChildElementById(id);
        setChildCount((n) => n - 1);
    }

    function hasChildren() {
        return !!modulatorsItem?.childElements?.length;
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    modulatorsItem.addLfoItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><Water /></IconAdd>
                Add LFO
            </MenuItem>
            <MenuItem
                onClick={() => {
                    modulatorsItem.addEnvelopeItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><ShowChart /></IconAdd>
                Add envelope
            </MenuItem>
        </Fragment>
    );

    function renderNumberOfItemsForTypeString(type, numberOfItemsForType) {
        if (!numberOfItemsForType) return null;
        return `${numberOfItemsForType} ${type}${numberOfItemsForType > 1 ? "s" : ""}`;
    }

    function renderSecondaryTextString() {
        const types = { envelope: 0, lfo: 0 };
        modulatorsItem.childElements?.forEach((childElement) => {
            if (types[childElement.elementType] !== undefined) {
                types[childElement.elementType]++;
            }
        });
        return (
            Object.keys(types)
                .map((type) => renderNumberOfItemsForTypeString(type, types[type]))
                .filter(Boolean)
                .join(", ") || ""
        );
    }

    const primaryText = "Modulators";
    const secondaryText = <ListItemSecondaryText>{renderSecondaryTextString()}</ListItemSecondaryText>;

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "lfo":
                return (
                    <LfoItemComponent
                        key={childElement.id}
                        lfoItem={childElement}
                        onRemoveItem={handleOnRemoveChildElement}
                    />
                );
            case "envelope":
                return (
                    <EnvelopeItemComponent
                        key={childElement.id}
                        envelopeItem={childElement}
                        onRemoveItem={handleOnRemoveChildElement}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={modulatorsItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(modulatorsItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(modulatorsItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <SwapCalls />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!modulatorsItem?.childElements?.length &&
                            modulatorsItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
