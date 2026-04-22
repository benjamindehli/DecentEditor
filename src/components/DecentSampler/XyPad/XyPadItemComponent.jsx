// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, OpenWith, SwapHoriz, SwapVert } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { EditXyPadItemDialog } from "./Dialogs/EditXyPadItemDialog";
import { XyPadXItemComponent } from "../XyPadX/XyPadXItemComponent";
import { XyPadYItemComponent } from "../XyPadY/XyPadYItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function XyPadItemComponent({ xyPadItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [childCount, setChildCount] = useState(xyPadItem?.childElements?.length || 0);
    const [editXyPadItemDialogIsOpen, setEditXyPadItemDialogIsOpen] = useState(false);

    function handleOnRemoveChildElement(id) {
        xyPadItem.removeChildElementById(id);
        setChildCount((n) => n - 1);
    }

    function hasChildren() {
        return !!xyPadItem?.childElements?.length;
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    xyPadItem.addXItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><SwapHoriz /></IconAdd>
                Add X axis
            </MenuItem>
            <MenuItem
                onClick={() => {
                    xyPadItem.addYItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><SwapVert /></IconAdd>
                Add Y axis
            </MenuItem>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(xyPadItem.id)} disableRipple>
                    <IconRemove><OpenWith /></IconRemove>
                    Remove XY pad
                </MenuItem>
            )}
        </Fragment>
    );

    const primaryText = "XY pad";
    const secondaryText = (
        <ListItemSecondaryText>
            {childCount} {childCount === 1 ? "axis" : "axes"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "x":
                return (
                    <XyPadXItemComponent
                        key={childElement.id}
                        xyPadXItem={childElement}
                        onRemoveItem={handleOnRemoveChildElement}
                    />
                );
            case "y":
                return (
                    <XyPadYItemComponent
                        key={childElement.id}
                        xyPadYItem={childElement}
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
                elementItem={xyPadItem}
                onEditButtonClick={() => setEditXyPadItemDialogIsOpen(true)}
                settingsMenuItems={settingsMenuItems}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(xyPadItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(xyPadItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <OpenWith />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!xyPadItem?.childElements?.length &&
                            xyPadItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
            <EditXyPadItemDialog
                xyPadItem={xyPadItem}
                open={editXyPadItemDialogIsOpen}
                onClose={() => setEditXyPadItemDialogIsOpen(false)}
            />
        </Fragment>
    );
}
