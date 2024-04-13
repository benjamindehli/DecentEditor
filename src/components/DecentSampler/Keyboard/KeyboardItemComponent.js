// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, Piano } from "@mui/icons-material";

// Components
import { ColorListComponent } from "../Color/ColorListComponent";

// Template
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function KeyboardItemComponent({ keyboardItem }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    keyboardItem.newColor();
                    decentSamplerContext.updateKeyboardItem(keyboardItem);
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
                    keyboardItem.newColor();
                    decentSamplerContext.updateKeyboardItem(keyboardItem);
                }}
                disableRipple
            >
                <Folder />
                Add multiple colors
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!keyboardItem?.colors?.length;
    }

    const primaryText = "Keyboard";
    const secondaryText = (
        <ListItemSecondaryText>
            {keyboardItem?.colors?.length || 0} {keyboardItem?.colors?.length === 1 ? "color" : "colors"}
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
                            id={`${keyboardItem?.id}-edit-button`}
                            onClick={() => console.log("onClick")}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={keyboardItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: hasChildren() ? 4 : 7 }} onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <ExpandMore /> : <ChevronRight />}
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                        <Piano />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    <ColorListComponent colorList={keyboardItem?.colors} />
                </List>
            </Collapse>
        </Fragment>
    );
}
