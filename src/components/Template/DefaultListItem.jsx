// Dependencies
import { Fragment } from "react";

// Material UI
import { ListItem, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Components
import { SettingsMenu } from "@/components/Template/SettingsMenu";

export function DefaultListItem({ elementItem, settingsMenuItems, onEditButtonClick, children }) {
    return (
        <ListItem
            sx={{
                "&:hover, &:focus": {
                    "& svg": { opacity: open ? 1 : 0 }
                }
            }}
            disablePadding
            secondaryAction={
                <Fragment>
                    <IconButton
                        edge="start"
                        aria-label={`edit ${elementItem?.elementType}`}
                        id={`${elementItem?.id}-edit-button`}
                        onClick={onEditButtonClick}
                        sx={{
                            "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } }
                        }}
                    >
                        <EditIcon
                            sx={{
                                opacity: 0,
                                transition: "0.2s"
                            }}
                        />
                    </IconButton>
                    <SettingsMenu elementItem={elementItem} menuItems={settingsMenuItems}></SettingsMenu>
                </Fragment>
            }
        >
            {children}
        </ListItem>
    );
}
