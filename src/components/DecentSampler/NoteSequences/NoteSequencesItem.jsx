// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Piano, Topic } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { SequenceItemComponent } from "../Sequence/SequenceItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function NoteSequencesItemComponent({ noteSequencesItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfSequences, setNumberOfSequences] = useState(noteSequencesItem?.childElements?.length || 0);

    function handleOnRemoveSequence(sequenceId) {
        noteSequencesItem.removeChildElementById(sequenceId);
        setNumberOfSequences((n) => n - 1);
    }

    function handleAddSequence() {
        noteSequencesItem.addSequenceItem({});
        setIsExpanded(true);
        setNumberOfSequences((n) => n + 1);
    }

    function hasChildren() {
        return !!noteSequencesItem?.childElements?.length;
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem onClick={handleAddSequence} disableRipple>
                <IconAdd><Piano /></IconAdd>
                Add sequence
            </MenuItem>
        </Fragment>
    );

    const primaryText = "Note sequences";
    const secondaryText = (
        <ListItemSecondaryText>
            {numberOfSequences} {numberOfSequences === 1 ? "sequence" : "sequences"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "sequence":
                return (
                    <SequenceItemComponent
                        key={childElement.id}
                        sequenceItem={childElement}
                        onRemoveItem={handleOnRemoveSequence}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={noteSequencesItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(noteSequencesItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(noteSequencesItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Topic />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!noteSequencesItem?.childElements?.length &&
                            noteSequencesItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
