// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import { AudioFile, ChevronRight, ExpandMore, Folder, FolderOff, Tune } from "@mui/icons-material";
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
import { EditGroupItemDialog } from "./Dialogs/EditGroupItemDialog";
import { EffectsItemComponent } from "../Effects/EffectsItemComponent";
import { SampleItemComponent } from "../Sample/SampleItemComponent";

// Template
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getBgColorForElementType, getFgColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

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
        return !!groupItem?.childElements?.length;
    }

    function renderNumberOfItemsForTypeString(type, numberOfItemsForType) {
        if (!numberOfItemsForType) {
            return null;
        } else {
            return `${numberOfItemsForType} ${type}${numberOfItemsForType > 1 ? "s" : ""}`;
        }
    }

    function renderSecondaryTextString(groupItem) {
        const childElementTypes = {
            effect: 0,
            sample: 0
        };
        groupItem.childElements.forEach((childElement) => {
            if (childElement?.elementType === "sample") {
                childElementTypes.sample++;
            } else if (childElement?.elementType === "effects") {
                childElementTypes.effect += childElement.childElements?.length;
            }
        });
        return (
            Object.keys(childElementTypes)
                .map((type) => {
                    const numberOfItemsForType = childElementTypes[type];
                    return renderNumberOfItemsForTypeString(type, numberOfItemsForType);
                })
                ?.filter((numberOfItemsForTypeString) => numberOfItemsForTypeString)
                ?.join(", ") || ""
        );
    }

    const tagList = !!groupItem?.tags?.length ? (
        <Fragment>
            {[groupItem.tags].map((tag) => {
                return <Chip component="span" label={tag} key={tag} size="small" />;
            })}
        </Fragment>
    ) : (
        ""
    );

    const primaryText = <Fragment>Group {tagList}</Fragment>;
    const secondaryText = <ListItemSecondaryText>{renderSecondaryTextString(groupItem)}</ListItemSecondaryText>;

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "effects":
                return <EffectsItemComponent key={childElement.id} effectsItem={childElement} />;
            case "sample":
                return <SampleItemComponent key={childElement.id} sampleItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <ListItem
                sx={{ bgcolor: getBgColorForElementType(groupItem?.elementType) }}
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
                <ListItemButton
                    sx={{ pl: getIndentSize(groupItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon sx={{ minWidth: "32px", color: getFgColorForElementType(groupItem?.elementType) }}>
                        {groupItem.enabled !== "0" ? <Folder /> : <FolderOff />}
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {groupItem?.childElements?.length &&
                            groupItem.childElements.map((childElement) => renderChildElement(childElement))}
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
