// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, Topic } from "@mui/icons-material";

// Components
import { SequenceItemComponent } from "../Sequence/SequenceItem";

// Template
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getBgColorForElementType, getFgColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function NoteSequencesItemComponent({ noteSequencesItem }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    console.log("Add note sequence");
                }}
                disableRipple
            >
                <IconAdd>
                    <Folder />
                </IconAdd>
                Add group
            </MenuItem>
            <MenuItem
                onClick={() => {
                    console.log("Add multiple note sequences");
                }}
                disableRipple
            >
                <Folder />
                Add multiple groups
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!noteSequencesItem?.childElements?.length;
    }

    const primaryText = "Note sequences";
    const secondaryText = (
        <ListItemSecondaryText>
            {noteSequencesItem?.childElements?.length || 0} {noteSequencesItem?.childElements?.length === 1 ? "sequence" : "sequences"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "sequence":
                return <SequenceItemComponent key={childElement.id} sequenceItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <ListItem
                sx={{ bgcolor: getBgColorForElementType(noteSequencesItem?.elementType) }}
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="edit note sequences"
                            id={`${noteSequencesItem?.id}-edit-button`}
                            onClick={() => console.log("onClick")}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={noteSequencesItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(noteSequencesItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon sx={{ minWidth: "32px", color: getFgColorForElementType(noteSequencesItem?.elementType) }}>
                        <Topic />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    {noteSequencesItem?.childElements?.length &&
                        noteSequencesItem.childElements.map((childElement) => renderChildElement(childElement))}
                </List>
            </Collapse>
        </Fragment>
    );
}
