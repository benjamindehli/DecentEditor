// Dependencies
import { Fragment } from "react";

// Material UI
import { ListItem, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Components
import { SettingsMenu } from "@/components/Template/SettingsMenu";

// Functions
import { getBgColorForElementType } from "@/functions/styles";

export function DefaultListItem({ elementItem, settingsMenuItems, onEditButtonClick, children }) {
    return (
        <ListItem
            sx={{ bgcolor: getBgColorForElementType(elementItem?.elementType) }}
            disablePadding
            secondaryAction={
                <Fragment>
                    <IconButton
                        edge="start"
                        aria-label={`edit ${elementItem?.elementType}`}
                        id={`${elementItem?.id}-edit-button`}
                        onClick={onEditButtonClick}
                    >
                        <EditIcon />
                    </IconButton>
                    <SettingsMenu elementItem={elementItem} menuItems={settingsMenuItems}></SettingsMenu>
                </Fragment>
            }
        >
            {children}
        </ListItem>
    );
}
