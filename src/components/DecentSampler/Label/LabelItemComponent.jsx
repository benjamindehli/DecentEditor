// Dependencies
import { Fragment } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Abc } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Template
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function LabelItemComponent({ labelItem, onRemoveItem }) {
    const theme = useTheme();

    const settingsMenuItems = (
        <Fragment>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(labelItem.id)} disableRipple>
                    <IconRemove><Abc /></IconRemove>
                    Remove label
                </MenuItem>
            )}
        </Fragment>
    );

    const textChip = labelItem?.text?.length
        ? <Chip component="span" label={labelItem.text} size="small" />
        : null;

    const primaryText = <Fragment>Label {textChip}</Fragment>;
    const secondaryText = labelItem?.x !== undefined && labelItem?.y !== undefined
        ? <ListItemSecondaryText>x: {labelItem.x}, y: {labelItem.y}</ListItemSecondaryText>
        : null;

    return (
        <Fragment>
            <DefaultListItem
                elementItem={labelItem}
                settingsMenuItems={settingsMenuItems}

            >
                <ListItemButton sx={{ pl: getIndentSize(labelItem, false) }}>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(labelItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Abc />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
        </Fragment>
    );
}
