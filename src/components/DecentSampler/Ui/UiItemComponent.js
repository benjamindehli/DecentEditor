// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InboxIcon from "@mui/icons-material/MoveToInbox";

// Components
import { KeyboardListComponent } from "../Keyboard/KeyboardListComponent";

// Template
import { SettingsMenu } from "../../Template/SettingsMenu";

export function UiItemComponent({ uiItem }) {
    const [isExpanded, setIsExpanded] = useState(false);

    function hasChildren() {
        return !!uiItem?.keyboard?.length || !!uiItem?.tab?.length;
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

    return (
        <Fragment>
            {/* <UiItemSettingsComponent uiItem={uiItem} onUpdateUiItem={handleUpdateUiItem} />*/}
            <ListItem
                disablePadding
                secondaryAction={<SettingsMenu elementItem={uiItem} menuItems={settingsMenuItems}></SettingsMenu>}
            >
                <ListItemButton sx={{ pl: hasChildren() ? 2 : 5 }} onClick={() => setIsExpanded(!isExpanded)}>
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={`UI (${uiItem?.groups?.length || 0})`} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    <KeyboardListComponent keyboardList={uiItem?.keyboard} />
                </List>
            </Collapse>
        </Fragment>
    );
}
