// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Components
import { EditBindingItemDialog } from "./EditBindingItemDialog";

// Template
import { IconControllableParameter } from "@/components/Template/Icons/IconControllableParameter";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";
import { IconRemove } from "@/components/Template/Icons/IconRemove";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function BindingItemComponent({ bindingItem, onRemoveItem }) {
    const theme = useTheme();

    const [editBindingItemDialogIsOpen, setEditBindingItemDialogIsOpen] = useState(false);

    const settingsMenuItems = (
        <Fragment>
            {onRemoveItem && (
                <MenuItem onClick={() => onRemoveItem(bindingItem.id)} disableRipple>
                    <IconRemove>
                        <IconControllableParameter
                            controllableParameter={bindingItem?.controllableParameterRef}
                            parameterType={bindingItem.type}
                            parameterLevel={bindingItem.level}
                        />
                    </IconRemove>
                    Remove binding
                </MenuItem>
            )}
        </Fragment>
    );

    const primaryText = "Binding";
    const secondaryText = (
        <ListItemSecondaryText>{bindingItem?.controllableParameterRef?.description || bindingItem?.parameter}</ListItemSecondaryText>
    );

    return (
        <Fragment>
            <DefaultListItem
                elementItem={bindingItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => setEditBindingItemDialogIsOpen(true)}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(bindingItem, false) }}
                >
                    <ListItemIcon sx={{ color: getColorForElementType(bindingItem?.elementType)[theme.palette.mode] }}>
                        <IconControllableParameter
                            controllableParameter={bindingItem?.controllableParameterRef}
                            parameterType={bindingItem.type}
                            parameterLevel={bindingItem.level}
                        />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            <EditBindingItemDialog
                bindingItem={bindingItem}
                open={editBindingItemDialogIsOpen}
                onClose={() => setEditBindingItemDialogIsOpen(false)}
            />
        </Fragment>
    );
}
