// Dependencies
import { Fragment, useContext, useEffect, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, Topic } from "@mui/icons-material";

// Components
import { GroupItemComponent } from "../Group/GroupItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getFgColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function GroupsItemComponent({ groupsItem }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const [numberOfGroups, setNumberOfGroups] = useState();

    useEffect(() => {
        setNumberOfGroups(groupsItem?.getGroupItems()?.length || 0);
    }, [groupsItem]);

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    groupsItem.addGroupItem();
                    setIsExpanded(true);
                    setNumberOfGroups(numberOfGroups + 1);
                    // decentSamplerContext.updateGroupsItem(groupsItem);
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
                    console.log("Add multiple groups");
                }}
                disableRipple
            >
                <Folder />
                Add multiple groups
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!groupsItem?.childElements?.length;
    }

    const primaryText = "Groups";
    const secondaryText = (
        <ListItemSecondaryText>
            {numberOfGroups} {numberOfGroups === 1 ? "group" : "groups"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "group":
                return <GroupItemComponent key={childElement.id} groupItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem elementItem={groupsItem} settingsMenuItems={settingsMenuItems}>
                <ListItemButton
                    sx={{ pl: getIndentSize(groupsItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon sx={{ minWidth: "32px", color: getFgColorForElementType(groupsItem?.elementType) }}>
                        <Topic />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!groupsItem?.childElements?.length &&
                            groupsItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
