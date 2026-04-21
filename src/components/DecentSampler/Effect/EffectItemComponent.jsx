// Dependencies
import { Fragment, useEffect, useState } from "react";

// Material UI
import { ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { AutoAwesome } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { EditEffectItemDialog } from "./Dialogs/EditEffectItemDialog";

// Template
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";
import { IconRemove } from "@/components/Template/Icons/IconRemove";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Data
import effectTypesData from "@/data/effectTypes";

export function EffectItemComponent({ effectItem, onRemoveItem }) {
    const theme = useTheme();

    const [effectTypeForEffectItem, setEffectTypeForEffectItem] = useState(null);
    const [editEffectItemDialogIsOpen, setEditEffectItemDialogIsOpen] = useState(false);

    useEffect(() => {
        const effectType = effectTypesData.find((et) => et.type === effectItem?.type);
        setEffectTypeForEffectItem(effectType || null);
    }, [effectItem]);

    const settingsMenuItems = (
        <Fragment>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(effectItem.id)} disableRipple>
                    <IconRemove><AutoAwesome /></IconRemove>
                    Remove effect
                </MenuItem>
            )}
        </Fragment>
    );

    const primaryText = effectTypeForEffectItem?.description || "Effect";
    const secondaryText = effectItem?.type && (
        <ListItemSecondaryText>{effectItem.type}</ListItemSecondaryText>
    );

    return (
        <Fragment>
            <DefaultListItem
                elementItem={effectItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => setEditEffectItemDialogIsOpen(true)}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(effectItem, false) }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(effectItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <AutoAwesome />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            <EditEffectItemDialog
                effectItem={effectItem}
                open={editEffectItemDialogIsOpen}
                onClose={() => setEditEffectItemDialogIsOpen(false)}
            />
        </Fragment>
    );
}
