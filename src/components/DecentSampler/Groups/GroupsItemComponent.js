import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InboxIcon from "@mui/icons-material/MoveToInbox";

// Dependencies
import { Fragment, useContext, useState } from "react";

// Classes
import { Group } from "@/classes/Group";

// Components
import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, CreateNewFolder, ExpandMore, Folder, Topic } from "@mui/icons-material";
import { SettingsMenu } from "../../Template/SettingsMenu";
import { GroupListComponent } from "../Group/GroupListComponent";
import DecentSamplerContext from "@/store/DecentSamplerContext";
import { IconAdd } from "@/components/Template/Icons/IconAdd";

export function GroupsItemComponent({ groupsItem }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const secondaryText = `${groupsItem?.groups?.length || 0} ${groupsItem?.groups?.length === 1 ? "group" : "groups"}`;

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    if (!groupsItem.groups.length) {
                        // Automatically expand the group if it's the first group
                        setIsExpanded(true);
                    }
                    groupsItem.newGroup(); // This is a method from the Groups class. It's not available in
                    decentSamplerContext.updateGroupsItem(groupsItem);
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
                    if (!groupsItem.groups.length) {
                        // Automatically expand the group if it's the first group
                        setIsExpanded(true);
                    }
                    groupsItem.newGroup(); // This is a method from the Groups class. It's not available in
                    decentSamplerContext.updateGroupsItem(groupsItem);
                }}
                disableRipple
            >
                <Folder />
                Add multiple groups
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!groupsItem?.groups?.length;
    }

    return (
        <Fragment>
            <ListItem
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="comments"
                            id={`${groupsItem?.id}-edit-button`}
                            onClick={() => console.log("onClick")}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={groupsItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: hasChildren() ? 2 : 5 }} onClick={() => setIsExpanded(!isExpanded)}>
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon>
                        <Topic />
                    </ListItemIcon>
                    <ListItemText primary="Groups" secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    <GroupListComponent groupList={groupsItem?.groups} />
                </List>
            </Collapse>
        </Fragment>
    );
}
