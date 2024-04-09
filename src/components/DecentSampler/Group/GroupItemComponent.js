// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import {
    AudioFile,
    ChevronRight,
    ExpandMore,
    Folder,
    FolderOff,
    Tune
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
    MenuItem
} from "@mui/material";

// Components
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { EditGroupItemDialog } from "./Dialogs/EditGroupItemDialog";
import { SampleListComponent } from "../Sample/SampleListComponent";
import DecentSamplerContext from "@/store/DecentSamplerContext";
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { IconRemove } from "@/components/Template/Icons/IconRemove";

export function GroupItemComponent({ groupItem }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);
    const [editGroupItemDialogIsOpen, setEditGroupItemDialogIsOpen] = useState(false);

    const handleClickOpenEditGroupItemDialog = () => {
        setEditGroupItemDialogIsOpen(true);
    };

    const handleCloseEditGroupItemDialog = () => {
        setEditGroupItemDialogIsOpen(false);
    };

    const secondaryText = `${groupItem?.samples?.length || 0} ${
        groupItem?.samples?.length === 1 ? "sample" : "samples"
    }, ${groupItem?.effects?.length || 0} ${groupItem?.effects?.length === 1 ? "effect" : "effects"}`;

    const tagList = !!groupItem?.tags?.length ? (
        <Fragment>
            {[groupItem.tags].map((tag) => {
                return <Chip component="span" label={tag} key={tag} size="small" />;
            })}
        </Fragment>
    ) : (
        ""
    );

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    if (!groupItem?.samples?.length && !groupItem?.effects?.length) {
                        // Automatically expand the group if it's the first sample or effect
                        setIsExpanded(true);
                    }
                    groupItem.newSample();
                    decentSamplerContext.updateGroupItem(groupItem);
                }}
                disableRipple
            >
                <IconAdd>
                    <AudioFile />
                </IconAdd>
                Add sample
            </MenuItem>
            <MenuItem
                onClick={() => {
                    if (!groupItem?.samples?.length && !groupItem?.effects?.length) {
                        // Automatically expand the group if it's the first sample or effect
                        setIsExpanded(true);
                    }
                    groupItem.newSample();
                    decentSamplerContext.updateGroupItem(groupItem);
                }}
                disableRipple
            >
                <IconAdd>
                    <Tune />
                </IconAdd>
                Add effect
            </MenuItem>
            <MenuItem
                onClick={() => {
                    groupItem.newSample();
                    decentSamplerContext.removeGroupItem(groupItem);
                }}
                disableRipple
            >
                <IconRemove>
                    <Folder />
                </IconRemove>
                Remove group
            </MenuItem>
            <MenuItem disableRipple>
                <MoreHorizIcon />
                More
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!groupItem?.samples?.length || !!groupItem?.effects?.length;
    }

    return (
        <Fragment>
            <ListItem
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="edit group button"
                            id={`${groupItem?.id}-edit-button`}
                            onClick={() => handleClickOpenEditGroupItemDialog()}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={groupItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: hasChildren() ? 4 : 7 }} onClick={() => setIsExpanded(!isExpanded)}>
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon>{groupItem.enabled === "1" ? <Folder /> : <FolderOff />}</ListItemIcon>
                    <ListItemText primary={<Fragment>Group {tagList}</Fragment>} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            {hasChildren() && (
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
                        <SampleListComponent sampleList={groupItem?.samples} />
                    </List>
                </Collapse>
            )}
            <EditGroupItemDialog
                groupItem={groupItem}
                open={editGroupItemDialogIsOpen}
                onClose={handleCloseEditGroupItemDialog}
            />
        </Fragment>
    );
}
