// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { IconButton } from "@mui/material";
import { MoreVert, Settings } from "@mui/icons-material";

// Components
import { StyledMenu } from "./StyledMenu";

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
  return (
    <Fragment>
      <StyledMenu
        id={menuId}
        MenuListProps={{
          "aria-labelledby": menuButtonId,
        }}
        anchorEl={settingsAnchorEl}
        open={settingsOpen}
        onClose={handleSettingsClose}
      >
        {menuItems?.props?.children?.map((menuItem, index) => {
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
