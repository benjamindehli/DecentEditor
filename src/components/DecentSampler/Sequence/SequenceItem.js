// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, Piano } from "@mui/icons-material";

// Components
import { NoteItemComponent } from "../Note/NoteItem";

// Template
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getBgColorForElementType, getFgColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function SequenceItemComponent({ sequenceItem }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    console.log("Add sequence");
                }}
                disableRipple
            >
                <IconAdd>
                    <Folder />
                </IconAdd>
                Add color
            </MenuItem>
            <MenuItem
                onClick={() => {
                    console.log("Add multiple sequences");
                }}
                disableRipple
            >
                <Folder />
                Add multiple colors
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!sequenceItem?.childElements?.length;
    }

    const sequenceName = sequenceItem?.name?.length && <Chip component="span" label={sequenceItem.name} size="small" />;

    const primaryText = <Fragment>Sequence {sequenceName}</Fragment>;
    const secondaryText = (
        <ListItemSecondaryText>
            {sequenceItem?.childElements?.length || 0} {sequenceItem?.childElements?.length === 1 ? "note" : "notes"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "note":
                return <NoteItemComponent key={childElement.id} noteItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <ListItem
                sx={{ bgcolor: getBgColorForElementType(sequenceItem?.elementType) }}
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="edit sequence"
                            id={`${sequenceItem?.id}-edit-button`}
                            onClick={() => console.log("onClick")}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={sequenceItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(sequenceItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <ExpandMore /> : <ChevronRight />}
                    <ListItemIcon sx={{ minWidth: "32px", color: getFgColorForElementType(sequenceItem?.elementType) }}>
                        <Piano />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    {sequenceItem?.childElements?.length &&
                        sequenceItem.childElements.map((childElement) => renderChildElement(childElement))}
                </List>
            </Collapse>
        </Fragment>
    );
}
