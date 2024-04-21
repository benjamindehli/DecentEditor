// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { ChevronRight, ExpandMore, Web } from "@mui/icons-material";
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

export function UiItemComponent({ uiItem }) {
    const [isExpanded, setIsExpanded] = useState(false);

    function hasChildren() {
        return !!uiItem?.childElements?.length;
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

    const primaryText = "UI";
    const secondaryText = uiItem?.width && uiItem?.height && (
        <ListItemSecondaryText>
            {uiItem?.width}px x {uiItem?.height}px
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "keyboard":
                return <KeyboardItemComponent key={childElement.id} keyboardItem={childElement} />;
            case "tab":
                return <TabItemComponent key={childElement.id} tabItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            {/* <UiItemSettingsComponent uiItem={uiItem} onUpdateUiItem={handleUpdateUiItem} />*/}
            <ListItem
                sx={{ bgcolor: getBgColorForElementType(uiItem?.elementType) }}
                disablePadding
                secondaryAction={<SettingsMenu elementItem={uiItem} menuItems={settingsMenuItems}></SettingsMenu>}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(uiItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon sx={{ minWidth: "32px", color: getFgColorForElementType(uiItem?.elementType) }}>
                        <Web />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    {uiItem?.childElements?.length &&
                        uiItem.childElements.map((childElement) => renderChildElement(childElement))}
                </List>
            </Collapse>
        </Fragment>
    );
}
