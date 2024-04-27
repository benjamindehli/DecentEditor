// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Label, LabelOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Template
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function TagItemComponent({ tagItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [editTagItemDialogIsOpen, setEditTagItemDialogIsOpen] = useState(false);

    const handleClickOpenEditTagItemDialog = () => {
        setEditTagItemDialogIsOpen(true);
    };

    const handleCloseEditTagItemDialog = () => {
        setEditTafItemDialogIsOpen(false);
    };

    const settingsMenuItems = (
        <Fragment>
            <MenuItem onClick={() => console.log("Edit clicked")} disableRipple>
                <EditIcon />
                Edit
            </MenuItem>
            <MenuItem disableRipple>
                <FileCopyIcon />
                Duplicate
            </MenuItem>
            <MenuItem
                onClick={() => {
                    console.log("add color");
                }}
                disableRipple
            >
                <ArchiveIcon />
                Add group
            </MenuItem>
            <MenuItem disableRipple>
                <MoreHorizIcon />
                More
            </MenuItem>
        </Fragment>
    );

    const primaryText = "Tag";
    const secondaryText = <ListItemSecondaryText>{tagItem.name}</ListItemSecondaryText>;

    return (
        <Fragment>
            <DefaultListItem
                elementItem={tagItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={handleClickOpenEditTagItemDialog}
            >
                <ListItemButton sx={{ pl: getIndentSize(tagItem, false) }} onClick={() => setIsExpanded(!isExpanded)}>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(tagItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        {tagItem.enabled !== "0" ? <Label /> : <LabelOff />}
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
        </Fragment>
    );
}
