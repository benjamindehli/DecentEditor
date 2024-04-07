import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Accordion } from "../../Template/Accordion";
import { ChevronRight, ExpandLess, ExpandMore } from "@mui/icons-material";
import { SettingsMenu } from "../../Template/SettingsMenu";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Fragment, useState } from "react";
import { KeyboardListComponent } from "../Keyboard/KeyboardListComponent";

export function UiItemComponent({ uiItem, onUpdateUiItem }) {
    const [isExpanded, setIsExpanded] = useState(false);

    /*}
    function handleUpdateUiItem(updatedUiItem) {
        onUpdateUiItem(updatedUiItem);
    }
*/

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
                <ListItemButton onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <ExpandLess /> : <ChevronRight />}
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
