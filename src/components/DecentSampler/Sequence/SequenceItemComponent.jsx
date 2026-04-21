// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, MusicNote, Piano } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { NoteItemComponent } from "../Note/NoteItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function SequenceItemComponent({ sequenceItem, onRemoveItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfNotes, setNumberOfNotes] = useState(sequenceItem?.childElements?.length || 0);

    function handleOnRemoveNote(noteId) {
        sequenceItem.removeChildElementById(noteId);
        setNumberOfNotes((n) => n - 1);
    }

    function handleAddNote() {
        sequenceItem.addNoteItem({});
        setIsExpanded(true);
        setNumberOfNotes((n) => n + 1);
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem onClick={handleAddNote} disableRipple>
                <IconAdd><MusicNote /></IconAdd>
                Add note
            </MenuItem>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(sequenceItem.id)} disableRipple>
                    <IconRemove><Piano /></IconRemove>
                    Remove sequence
                </MenuItem>
            )}
        </Fragment>
    );

    function hasChildren() {
        return !!sequenceItem?.childElements?.length;
    }

    const sequenceName = sequenceItem?.name?.length && <Chip component="span" label={sequenceItem.name} size="small" />;

    const primaryText = <Fragment>Sequence {sequenceName}</Fragment>;
    const secondaryText = (
        <ListItemSecondaryText>
            {numberOfNotes} {numberOfNotes === 1 ? "note" : "notes"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "note":
                return (
                    <NoteItemComponent
                        key={childElement.id}
                        noteItem={childElement}
                        onRemoveItem={handleOnRemoveNote}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={sequenceItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(sequenceItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(sequenceItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Piano />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!sequenceItem?.childElements?.length &&
                            sequenceItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
