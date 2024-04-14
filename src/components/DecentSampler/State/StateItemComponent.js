// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, ToggleOn } from "@mui/icons-material";

// Components
import { BindingListComponent } from "../Binding/BindingListComponent";

// Template
import { SettingsMenu } from "@/components/Template/SettingsMenu";
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function StateItemComponent({ stateItem }) {
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
        return !!stateItem?.bindings?.length;
    }

    const stateName = stateItem?.name?.length && <Chip component="span" label={stateItem.name} size="small" />;

    const primaryText = <Fragment>State {stateName}</Fragment>;

    const secondaryText = (
        <ListItemSecondaryText>
            {stateItem?.bindings?.length || 0} {stateItem?.bindings?.length === 1 ? "binding" : "bindings"}
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
                            aria-label="state edit button"
                            id={`${stateItem?.id}-edit-button`}
                            onClick={() => console.log("onClick")}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={stateItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: hasChildren() ? 8 : 11 }} onClick={() => setIsExpanded(!isExpanded)}>
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                        <ToggleOn />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    <BindingListComponent bindingList={stateItem?.bindings} />
                </List>
            </Collapse>
        </Fragment>
    );
}
