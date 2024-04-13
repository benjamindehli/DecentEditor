// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import {
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from "@mui/material";
import { ChevronRight, ExpandMore, Folder, Piano } from "@mui/icons-material";

// Components
import { ButtonListComponent } from "../Button/ButtonListComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function TabItemComponent({ tabItem }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    // keyboardItem.newColor();
                    // decentSamplerContext.updateKeyboardItem(keyboardItem);
                }}
                disableRipple
            >
                <IconAdd>
                    <Folder />
                </IconAdd>
                Add color
            </MenuItem>
            <MenuItem
                onClick={() => {
                    //   keyboardItem.newColor();
                    //   decentSamplerContext.updateKeyboardItem(keyboardItem);
                }}
                disableRipple
            >
                <Folder />
                Add multiple colors
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!tabItem?.buttons?.length;
    }
    function renderNumberOfItemsForTypeString(tabItem, type) {
        const propName = type.plural;
        if (!tabItem?.[propName]?.length) {
            return null;
        } else if (tabItem?.[propName]?.length === 1) {
            return `${tabItem[propName].length} ${type.singular}`;
        } else {
            return `${tabItem[propName].length} ${type.plural}`;
        }
    }

    function renderSecondaryTextString(tabItem) {
        const childElementTypes = [
            { singular: "button", plural: "buttons" },
            { singular: "control", plural: "controls" },
            { singular: "image", plural: "images" },
            { singular: "label", plural: "labels" },
            { singular: "labeledKnob", plural: "labeledKnobs" },
            { singular: "menu", plural: "menus" }
        ];
        return (
            childElementTypes
                .map((type) => {
                    return renderNumberOfItemsForTypeString(tabItem, type);
                })
                ?.filter((numberOfItemsForTypeString) => numberOfItemsForTypeString)
                ?.join(", ") || ""
        );
    }

    const primaryText = "Tab";
    const secondaryText = <ListItemSecondaryText>{renderSecondaryTextString(tabItem)}</ListItemSecondaryText>;

    return (
        <Fragment>
            <ListItem
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="tab edit button"
                            id={`${tabItem?.id}-edit-button`}
                            onClick={() => console.log("onClick")}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={tabItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: hasChildren() ? 4 : 7 }} onClick={() => setIsExpanded(!isExpanded)}>
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                        <Piano />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    <ListSubheader sx={{ pl: 7 }} component="div" id="nested-list-subheader">
                        Buttons
                    </ListSubheader>
                    <ButtonListComponent buttonList={tabItem?.buttons} />
                </List>
            </Collapse>
        </Fragment>
    );
}
