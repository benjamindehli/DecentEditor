// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

// Components
import { StyledMenu } from "./StyledMenu";

function getMenuItemElements(menuItems) {
    const menuItemElements = menuItems?.props?.children;
    const isSingleItem = menuItems && !Array.isArray(menuItemElements);
    if (isSingleItem) {
        return [menuItemElements];
    } else if (menuItemElements?.length) {
        return menuItemElements;
    } else {
        return [];
    }
}

export function SettingsMenu({ elementItem, menuItems = [] }) {
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
    const settingsOpen = Boolean(settingsAnchorEl);
    const handleSettingsClick = (event) => {
        setSettingsAnchorEl(event.currentTarget);
    };
    const handleSettingsClose = () => {
        setSettingsAnchorEl(null);
    };
    const menuId = `${elementItem?.id}-settings-menu`;
    const menuButtonId = `${elementItem?.id}-settings-menu-button`;
    const menuItemElements = getMenuItemElements(menuItems);
    return (
        <Fragment>
            <StyledMenu
                id={menuId}
                MenuListProps={{
                    "aria-labelledby": menuButtonId
                }}
                anchorEl={settingsAnchorEl}
                open={settingsOpen}
                onClose={handleSettingsClose}
            >
                {menuItemElements.map((menuItem, index) => {
                    return (
                        <div key={index} onClick={handleSettingsClose}>
                            {menuItem}
                        </div>
                    );
                })}
            </StyledMenu>
            <IconButton
                edge="end"
                aria-label="comments"
                id={menuButtonId}
                aria-controls={settingsOpen ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={settingsOpen ? "true" : undefined}
                onClick={handleSettingsClick}
            >
                <MoreVert />
            </IconButton>
        </Fragment>
    );
}
