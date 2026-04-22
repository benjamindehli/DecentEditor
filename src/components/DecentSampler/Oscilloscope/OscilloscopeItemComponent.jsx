// Dependencies
import { Fragment } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { GraphicEq } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Template
import { IconRemove } from "@/components/Template/Icons/IconRemove";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function OscilloscopeItemComponent({ oscilloscopeItem, onRemoveItem }) {
    const theme = useTheme();

    const settingsMenuItems = (
        <Fragment>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(oscilloscopeItem.id)} disableRipple>
                    <IconRemove><GraphicEq /></IconRemove>
                    Remove oscilloscope
                </MenuItem>
            )}
        </Fragment>
    );

    const primaryText = "Oscilloscope";
    const secondaryText = oscilloscopeItem?.x !== undefined && oscilloscopeItem?.y !== undefined
        ? <ListItemSecondaryText>x: {oscilloscopeItem.x}, y: {oscilloscopeItem.y}, {oscilloscopeItem.width}×{oscilloscopeItem.height}</ListItemSecondaryText>
        : null;

    return (
        <Fragment>
            <DefaultListItem
                elementItem={oscilloscopeItem}
                settingsMenuItems={settingsMenuItems}
            >
                <ListItemButton sx={{ pl: getIndentSize(oscilloscopeItem, false) }}>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(oscilloscopeItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <GraphicEq />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
        </Fragment>
    );
}
