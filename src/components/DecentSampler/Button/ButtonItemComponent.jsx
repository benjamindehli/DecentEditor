// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, SmartButton, ToggleOn } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { StateItemComponent } from "../State/StateItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function ButtonItemComponent({ buttonItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfStates, setNumberOfStates] = useState(buttonItem?.childElements?.length || 0);

    function handleOnRemoveState(stateId) {
        buttonItem.removeChildElementById(stateId);
        setNumberOfStates((n) => n - 1);
    }

    function handleAddState() {
        buttonItem.addStateItem({});
        setIsExpanded(true);
        setNumberOfStates((n) => n + 1);
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem onClick={handleAddState} disableRipple>
                <IconAdd><ToggleOn /></IconAdd>
                Add state
            </MenuItem>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(buttonItem.id)} disableRipple>
                    <IconRemove><SmartButton /></IconRemove>
                    Remove button
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!buttonItem?.childElements?.length;
    }

    const chipLabel = buttonItem?.style || buttonItem?.mainImage ||
        (buttonItem?.x !== undefined && buttonItem?.y !== undefined
            ? `x: ${buttonItem.x}, y: ${buttonItem.y}`
            : null);

    const primaryText = (
        <Fragment>
            Button {chipLabel ? <Chip component="span" label={chipLabel} size="small" /> : null}
        </Fragment>
    );
    const secondaryText = (
        <ListItemSecondaryText>
            {numberOfStates} {numberOfStates === 1 ? "state" : "states"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "state":
                return (
                    <StateItemComponent
                        key={childElement.id}
                        stateItem={childElement}
                        onRemoveItem={handleOnRemoveState}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={buttonItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(buttonItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(buttonItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <SmartButton />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!buttonItem?.childElements?.length &&
                            buttonItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
