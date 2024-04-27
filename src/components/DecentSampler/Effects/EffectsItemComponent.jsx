// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, Topic } from "@mui/icons-material";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Components
import { EffectItemComponent } from "../Effect/EffectItemComponent";
import { useTheme } from "@mui/material/styles";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function EffectsItemComponent({ effectsItem }) {
    const theme = useTheme();

    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    {
                        /*
                    if (!effectsItem.groups.length) {
                        // Automatically expand the group if it's the first group
                        setIsExpanded(true);
                    }
                    groupsItem.newGroup(); // This is a method from the Groups class. It's not available in
                    decentSamplerContext.updateGroupsItem(groupsItem);
                */
                    }
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
                    {
                        /*

                    if (!groupsItem.groups.length) {
                        // Automatically expand the group if it's the first group
                        setIsExpanded(true);
                    }
                    groupsItem.newGroup(); // This is a method from the Groups class. It's not available in
                    decentSamplerContext.updateGroupsItem(groupsItem);
                */
                    }
                }}
                disableRipple
            >
                <Folder />
                Add multiple groups
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!effectsItem?.childElements?.length;
    }

    const primaryText = "Effects";
    const secondaryText = (
        <ListItemSecondaryText>
            {effectsItem?.childElements?.length || 0} {effectsItem?.childElements?.length === 1 ? "effect" : "effects"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "effect":
                return <EffectItemComponent key={childElement.id} effectItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem elementItem={effectsItem} settingsMenuItems={settingsMenuItems}>
                <ListItemButton
                    sx={{ pl: getIndentSize(effectsItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(effectsItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Topic />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!effectsItem?.childElements?.length &&
                            effectsItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
