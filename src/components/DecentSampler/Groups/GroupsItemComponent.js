// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, Topic } from "@mui/icons-material";

// Components
import { GroupListComponent } from "../Group/GroupListComponent";

// Template
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function GroupsItemComponent({ groupsItem }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

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

    const primaryText = "Groups";
    const secondaryText = (
        <ListItemSecondaryText>
            {groupsItem?.groups?.length || 0} {groupsItem?.groups?.length === 1 ? "group" : "groups"}
        </ListItemSecondaryText>
    );

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
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                        <Topic />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
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
