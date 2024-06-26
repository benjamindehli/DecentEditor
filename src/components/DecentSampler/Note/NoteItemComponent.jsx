// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, MusicNote } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { BindingItemComponent } from "../Binding/BindingItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function NoteItemComponent({ noteItem }) {
    const theme = useTheme();

    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    // keyboardItem.newColor();
                    // decentSamplerContext.updateKeyboardItem(keyboardItem);
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
                    //   keyboardItem.newColor();
                    //   decentSamplerContext.updateKeyboardItem(keyboardItem);
                }}
                disableRipple
            >
                <Folder />
                Add multiple colors
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!noteItem?.childElements?.length;
    }

    function renderSecondaryText() {
        if (noteItem?.childElements?.length) {
            return (
                <ListItemSecondaryText>
                    {noteItem?.childElements?.length || 0}{" "}
                    {noteItem?.childElements?.length === 1 ? "binding" : "bindings"}
                </ListItemSecondaryText>
            );
        } else if (noteItem?.position || noteItem?.name || noteItem?.note || noteItem?.velocity) {
            const noteItemInfo = [];
            if (noteItem?.position) noteItemInfo.push(`Position: ${noteItem.position}`);
            if (noteItem?.note) noteItemInfo.push(`Note: ${noteItem.note}`);
            if (noteItem?.velocity) noteItemInfo.push(`Velocity: ${noteItem.velocity}`);
            if (noteItem?.length) noteItemInfo.push(`Length: ${noteItem.length}`);
            return <ListItemSecondaryText>{noteItemInfo.join(", ")}</ListItemSecondaryText>;
        } else {
            return <ListItemSecondaryText>No bindings</ListItemSecondaryText>;
        }
    }

    const stateName = noteItem?.name?.length && <Chip component="span" label={noteItem.name} size="small" />;

    const primaryText = <Fragment>Note {stateName}</Fragment>;

    const secondaryText = renderSecondaryText();

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "binding":
                return <BindingItemComponent key={childElement.id} bindingItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={noteItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => console.log("onClick")}
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
