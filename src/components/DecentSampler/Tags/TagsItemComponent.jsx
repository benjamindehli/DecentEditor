// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { ChevronRight, Discount, ExpandMore, LocalOffer } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { TagItemComponent } from "../Tag/TagItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function TagsItemComponent({ tagsItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfTags, setNumberOfTags] = useState(tagsItem?.childElements?.length || 0);

    function handleAddTag() {
        tagsItem.addTagItem({});
        setIsExpanded(true);
        setNumberOfTags((n) => n + 1);
    }

    function handleOnRemoveTag(tagId) {
        tagsItem.removeChildElementById(tagId);
        setNumberOfTags((n) => n - 1);
    }

    function hasChildren() {
        return !!tagsItem?.childElements?.length;
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem onClick={handleAddTag} disableRipple>
                <IconAdd><LocalOffer /></IconAdd>
                Add tag
            </MenuItem>
        </Fragment>
    );

    const primaryText = "Tags";

    const secondaryText = (
        <ListItemSecondaryText>
            {numberOfTags} {numberOfTags === 1 ? "tag" : "tags"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "tag":
                return (
                    <TagItemComponent
                        key={childElement.id}
                        tagItem={childElement}
                        onRemoveItem={handleOnRemoveTag}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={tagsItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton
                    sx={{ pl: getIndentSize(tagsItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(tagsItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Discount />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!tagsItem?.childElements?.length &&
                            tagsItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
