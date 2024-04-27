// Dependencies
import { Fragment, useContext, useEffect, useState } from "react";

// Material UI
import { AudioFile, ChevronRight, ExpandMore, Folder, FolderOff } from "@mui/icons-material";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Components
import { EditGroupItemDialog } from "./Dialogs/EditGroupItemDialog";
import { EffectsItemComponent } from "../Effects/EffectsItemComponent";
import { SampleItemComponent } from "../Sample/SampleItemComponent";

// Template
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

export function GroupItemComponent({ groupItem, onRemoveItem }) {
    const theme = useTheme();

    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);
    const [editGroupItemDialogIsOpen, setEditGroupItemDialogIsOpen] = useState(false);

    const [numberOfSampleItems, setNumberOfSampleItems] = useState(0);

    const handleClickOpenEditGroupItemDialog = () => {
        setEditGroupItemDialogIsOpen(true);
    };

    const handleCloseEditGroupItemDialog = () => {
        setEditGroupItemDialogIsOpen(false);
    };

    function handleOnRemoveChildElement(itemId) {
        groupItem.removeChildElementById(itemId);
        setNumberOfSampleItems(numberOfSampleItems - 1);
    }

    useEffect(() => {
        setNumberOfSampleItems(groupItem?.getSampleItems()?.length || 0);
    }, [groupItem]);

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    groupItem.addSampleItem();
                    setIsExpanded(true);
                    setNumberOfSampleItems(numberOfSampleItems + 1);
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
                    onRemoveItem(groupItem.id);
                }}
                disableRipple
            >
                <IconRemove>
                    <Folder />
                </IconRemove>
                Remove group
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
            effect: groupItem?.getFirstEffectsItem()?.getEffectItems()?.length || 0,
            sample: numberOfSampleItems || 0
        };
        // groupItem?.childElements?.forEach((childElement) => {
        //     if (childElement?.elementType === "sample") {
        //         childElementTypes.sample++;
        //     } else if (childElement?.elementType === "effects") {
        //         childElementTypes.effect += childElement.childElements?.length;
        //     }
        // });
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
                return (
                    <SampleItemComponent
                        key={childElement.id}
                        sampleItem={childElement}
                        onRemoveItem={handleOnRemoveChildElement}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={groupItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={handleClickOpenEditGroupItemDialog}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(groupItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(groupItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        {groupItem.enabled !== "0" ? <Folder /> : <FolderOff />}
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!groupItem?.childElements?.length &&
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
