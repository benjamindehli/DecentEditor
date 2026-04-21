// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, ListAlt, MusicNote, Pin, Speed } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { NoteItemComponent } from "../Note/NoteItemComponent";
import { CcItemComponent } from "../Cc/CcItemComponent";
import { VelocityItemComponent } from "../Velocity/VelocityItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function MidiItemComponent({ midiItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [childCount, setChildCount] = useState(midiItem?.childElements?.length || 0);

    function handleOnRemoveChildElement(id) {
        midiItem.removeChildElementById(id);
        setChildCount((n) => n - 1);
    }

    function hasChildren() {
        return !!midiItem?.childElements?.length;
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    midiItem.addCcItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><Pin /></IconAdd>
                Add CC
            </MenuItem>
            <MenuItem
                onClick={() => {
                    midiItem.addNoteItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><MusicNote /></IconAdd>
                Add note
            </MenuItem>
            <MenuItem
                onClick={() => {
                    midiItem.addVelocityItem();
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><Speed /></IconAdd>
                Add velocity
            </MenuItem>
        </Fragment>
    );

    function renderNumberOfItemsForTypeString(type, count) {
        if (!count) return null;
        return `${count} ${type}${count > 1 ? "s" : ""}`;
    }

    function renderSecondaryTextString() {
        const types = { cc: 0, note: 0, velocity: 0 };
        midiItem.childElements?.forEach((childElement) => {
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

    const primaryText = "MIDI";
    const secondaryText = <ListItemSecondaryText>{renderSecondaryTextString()}</ListItemSecondaryText>;

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "cc":
                return (
                    <CcItemComponent
                        key={childElement.id}
                        ccItem={childElement}
                        onRemoveItem={handleOnRemoveChildElement}
                    />
                );
            case "note":
                return (
                    <NoteItemComponent
                        key={childElement.id}
                        noteItem={childElement}
                        onRemoveItem={handleOnRemoveChildElement}
                    />
                );
            case "velocity":
                return (
                    <VelocityItemComponent
                        key={childElement.id}
                        velocityItem={childElement}
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
                elementItem={midiItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(midiItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(midiItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <ListAlt />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!midiItem?.childElements?.length &&
                            midiItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
