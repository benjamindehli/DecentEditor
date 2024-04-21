// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Bookmarks, ChevronRight, ExpandMore, Web } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Components
import { KeyboardItemComponent } from "../Keyboard/KeyboardItemComponent";
import { TabItemComponent } from "../Tab/TabItemComponent";

// Template
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getBgColorForElementType, getFgColorForElementType } from "@/functions/styles";
import { TagItemComponent } from "../Tag/TagItemComponent";

export function TagsItemComponent({ tagsItem }) {
    const [isExpanded, setIsExpanded] = useState(false);

    function hasChildren() {
        return !!tagsItem?.childElements?.length;
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem disableRipple>
                <EditIcon />
                Edit
            </MenuItem>
            <MenuItem disableRipple>
                <FileCopyIcon />
                Duplicate
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleAddGroup();
                }}
                disableRipple
            >
                <ArchiveIcon />
                Add group
            </MenuItem>
            <MenuItem disableRipple>
                <MoreHorizIcon />
                More
            </MenuItem>
        </Fragment>
    );

    const primaryText = "Tags";

    const secondaryText = (
        <ListItemSecondaryText>
            {tagsItem?.childElements?.length || 0} {tagsItem?.childElements?.length === 1 ? "tag" : "tags"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "tag":
                return <TagItemComponent key={childElement.id} tagItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            {/* <UiItemSettingsComponent uiItem={uiItem} onUpdateUiItem={handleUpdateUiItem} />*/}
            <ListItem
                sx={{ bgcolor: getBgColorForElementType(tagsItem?.elementType) }}
                disablePadding
                secondaryAction={<SettingsMenu elementItem={tagsItem} menuItems={settingsMenuItems}></SettingsMenu>}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(tagsItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon sx={{ minWidth: "32px", color: getFgColorForElementType(tagsItem?.elementType) }}>
                        <Bookmarks />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    {tagsItem?.childElements?.length &&
                        tagsItem.childElements.map((childElement) => renderChildElement(childElement))}
                </List>
            </Collapse>
        </Fragment>
    );
}
