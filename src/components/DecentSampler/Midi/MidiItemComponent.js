// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, ListAlt } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { NoteItemComponent } from "../Note/NoteItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";
import { CcItemComponent } from "../Cc/CcItemComponent";

export function MidiItemComponent({ midiItem }) {
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
        return !!midiItem?.childElements?.length;
    }

    function renderNumberOfItemsForTypeString(type, numberOfItemsForType) {
        if (!numberOfItemsForType) {
            return null;
        } else {
            return `${numberOfItemsForType} ${type}${numberOfItemsForType > 1 ? "s" : ""}`;
        }
    }

    function renderSecondaryTextString(midiItem) {
        const childElementTypes = {
            cc: 0,
            note: 0
        };
        midiItem.childElements?.forEach((childElement) => {
            if (childElementTypes[childElement.elementType] !== undefined) {
                childElementTypes[childElement.elementType]++;
            }
        });
        return (
            Object.keys(childElementTypes)
                .map((type) => {
                    const numberOfItemsForType = childElementTypes[type];
                    return renderNumberOfItemsForTypeString(type, numberOfItemsForType);
                })
                ?.filter((numberOfItemsForTypeString) => numberOfItemsForTypeString)
                ?.join(", ") || ""
        );
    }

    const primaryText = "Midi";
    const secondaryText = <ListItemSecondaryText>{renderSecondaryTextString(midiItem)}</ListItemSecondaryText>;

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "cc":
                return <CcItemComponent key={childElement.id} ccItem={childElement} />;
            case "note":
                return <NoteItemComponent key={childElement.id} noteItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={midiItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => console.log("onClick")}
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
