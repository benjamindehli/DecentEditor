// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { ChevronRight, ExpandLess, ExpandMore, Folder, FolderOff, StarBorder } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
    Chip,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    MenuItem,
} from "@mui/material";

// Components
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { EditGroupItemDialog } from "./Dialogs/EditGroupItemDialog";
import { SampleListComponent } from "../Sample/SampleListComponent";

export function GroupItemComponent({ groupItem }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [editGroupItemDialogIsOpen, setEditGroupItemDialogIsOpen] = useState(false);

    const handleClickOpenEditGroupItemDialog = () => {
        setEditGroupItemDialogIsOpen(true);
    };

    const handleCloseEditGroupItemDialog = () => {
        setEditGroupItemDialogIsOpen(false);
    };

    const secondaryText = !!groupItem.tags.length && (
        <Fragment>
            {[groupItem.tags].map((tag) => {
                return <Chip component="span" label={tag} key={tag} size="small" />;
            })}
        </Fragment>
    );

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    console.log("Edit clicked");
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
        <Fragment>
            <ListItem
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="comments"
                            id={`${groupItem?.id}-edit-button`}
                            onClick={() => handleClickOpenEditGroupItemDialog()}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={groupItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: 4 }} onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <ExpandMore /> : <ChevronRight />}
                    <ListItemIcon>
                        {groupItem.enabled === "1" ? <Folder /> : <FolderOff />}
                    </ListItemIcon>
                    <ListItemText primary="Group" secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListSubheader sx={{ pl: 8 }} component="div" id="nested-list-subheader">
                        Effects
                    </ListSubheader>
                    {!!groupItem?.effects?.length &&
                        groupItem.effects.map((effect) => {
                            return "Effect";
                        })}
                </List>
                <List dense component="div" disablePadding>
                    <ListSubheader sx={{ pl: 8 }} component="div" id="nested-list-subheader">
                        Samples
                    </ListSubheader>
                    <SampleListComponent
                        sampleList={groupItem?.samples}
                    />
                </List>
            </Collapse>
            <EditGroupItemDialog
                groupItem={groupItem}
                open={editGroupItemDialogIsOpen}
                onClose={handleCloseEditGroupItemDialog}
            />
        </Fragment>
    );
}
