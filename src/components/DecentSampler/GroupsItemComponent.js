import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InboxIcon from "@mui/icons-material/MoveToInbox";

// Dependencies
import { Fragment, useState } from "react";

// Classes
import { Group } from "@/classes/Group";

// Components
import { GroupComponent } from "@/components/DecentSampler/GroupComponent";
import { Accordion } from "@/components/Template/Accordion";
import { AccordionContent } from "@/components/Template/AccordionContent";
import { StyledMenu } from "../Template/StyledMenu";
import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore, Settings } from "@mui/icons-material";
import { SettingsMenu } from "../Template/SettingsMenu";

export function GroupsItemComponent({ groupsItem, onUpdateGroupsItem, onSelectElement }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const settingsOpen = Boolean(settingsAnchorEl);
  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  function handleAddGroup() {
    const group = new Group();
    groupsItem.groups.push(group);
    onUpdateGroupsItem(groupsItem);
  }

  function handleUpdateGroup(updatedGroup) {
    const groupIndex = groupsItem.groups.findIndex((group) => group.id === updatedGroup.id);
    groupsItem.groups[groupIndex] = updatedGroup;
    onUpdateGroupsItem(groupsItem);
  }

  function renderGroups() {
    return (
      !!groupsItem.groups?.length &&
      groupsItem.groups.map((group) => {
        return <GroupComponent key={group.id} group={group} onUpdateGroup={(group) => handleUpdateGroup(group)} onSelectElement={onSelectElement} />;
      })
    );
  }

  const settingsMenuItems = (
    <Fragment>
      <MenuItem
        onClick={() => {
          onSelectElement(groupsItem);
        }}
        disableRipple
      >
        <EditIcon />
        Edit
      </MenuItem>
      <MenuItem onClick={handleSettingsClose} disableRipple>
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
      <MenuItem onClick={handleSettingsClose} disableRipple>
        <MoreHorizIcon />
        More
      </MenuItem>
    </Fragment>
  );

  return (
    <Fragment>
      <ListItem
        disablePadding
        secondaryAction={<SettingsMenu elementItem={groupsItem} menuItems={settingsMenuItems}></SettingsMenu>}
      >
        <ListItemButton onClick={() => setIsExpanded(!isExpanded)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={`Groups (${groupsItem?.groups?.length || 0})`} />
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {renderGroups()}
        </List>
      </Collapse>
    </Fragment>
  );
}
