// Components
import { ExpandLess, ExpandMore, Settings } from "@mui/icons-material";
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Fragment, useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { SettingsMenu } from "../Template/SettingsMenu";

export function SampleComponent({ sampleItem, onUpdateSample, onSelectElement }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const settingsMenuItems = (
    <Fragment>
      <MenuItem
        onClick={() => {
            console.log({onSelectElement, sampleItem})
          onSelectElement(sampleItem);
        }}
        disableRipple
      >
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
    <ListItem
      disablePadding
      secondaryAction={<SettingsMenu elementItem={sampleItem} menuItems={settingsMenuItems}></SettingsMenu>}
    >
      <ListItemButton sx={{ pl: 8 }} onClick={() => setIsExpanded(!isExpanded)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Sample" />
      </ListItemButton>
    </ListItem>
  );
}
