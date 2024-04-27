// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { ChevronRight, ExpandMore, Web } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "@mui/material/styles";

// Components
import { KeyboardItemComponent } from "../Keyboard/KeyboardItemComponent";
import { TabItemComponent } from "../Tab/TabItemComponent";

// Template
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function UiItemComponent({ uiItem }) {
    const theme = useTheme();

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
            <DefaultListItem
                elementItem={uiItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => console.log("click")}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(uiItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(uiItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Web />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!uiItem?.childElements?.length &&
                            uiItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
