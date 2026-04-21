// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, MusicNote } from "@mui/icons-material";
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
import midiNotes from "@/data/midiNotes";

export function NoteItemComponent({ noteItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfBindings, setNumberOfBindings] = useState(noteItem?.childElements?.length || 0);

    function handleOnRemoveBinding(bindingId) {
        noteItem.removeChildElementById(bindingId);
        setNumberOfBindings((n) => n - 1);
    }

    function handleAddBinding() {
        noteItem.addBindingItem({});
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
                <MenuItem onClick={() => onRemoveItem(noteItem.id)} disableRipple>
                    <IconRemove><MusicNote /></IconRemove>
                    Remove note
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!noteItem?.childElements?.length;
    }

    function getNoteLabel() {
        const noteNum = parseInt(noteItem?.note);
        if (!isNaN(noteNum) && midiNotes[noteNum]) {
            return `${midiNotes[noteNum].name}${midiNotes[noteNum].octave} (${noteNum})`;
        }
        return noteItem?.note ?? "";
    }

    const noteLabel = getNoteLabel();
    const primaryInfoText = noteLabel ? <Chip component="span" label={noteLabel} size="small" /> : null;
    const primaryText = <Fragment>Note {primaryInfoText}</Fragment>;

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
                elementItem={noteItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(noteItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(noteItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <MusicNote />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!noteItem?.childElements?.length &&
                            noteItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
