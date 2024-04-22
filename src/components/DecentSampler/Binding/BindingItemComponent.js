// Dependencies
import { Fragment, useContext, useEffect, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Folder } from "@mui/icons-material";

// Template
import { IconControllableParameter } from "@/components/Template/Icons/IconControllableParameter";
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { SettingsMenu } from "../../Template/SettingsMenu";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getBgColorForElementType, getFgColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

// Data
import controllableParametersData from "@/data/controllableParameters.js";
import { EditBindingItemDialog } from "./EditBindingItemDialog";
import { ControllableParameter } from "@/classes/ControllableParameter";

export function BindingItemComponent({ bindingItem }) {
    const decentSamplerContext = useContext(DecentSamplerContext);
    const [controllableParameters, setControllableParameters] = useState(
        controllableParametersData.map((controllableParameter) => {
            return new ControllableParameter(controllableParameter);
        })
    );
    const [controllableParameterForBinding, setControllableParameterForBinding] = useState(
        getControlParameterForBindingItem(bindingItem)
    );

    const [isExpanded, setIsExpanded] = useState(false);

    const [editBindingItemDialogIsOpen, setEditBindingItemDialogIsOpen] = useState(false);

    const handleClickOpenEditBindingItemDialog = () => {
        setEditBindingItemDialogIsOpen(true);
    };

    const handleCloseEditBindingItemDialog = () => {
        setEditBindingItemDialogIsOpen(false);
    };

    function getControlParameterForBindingItem(binding) {
        return controllableParameters.find((controllableParameter) => {
            return (
                controllableParameter.type === binding.type &&
                controllableParameter.level === binding.level &&
                controllableParameter.parameter === binding.parameter
            );
        });
    }

   /* useEffect(() => {
        const controllableParameter = getControlParameterForBindingItem(bindingItem);
        setControllableParameterForBinding(controllableParameter);
        if (!controllableParameter) {
            console.log("noMatch", bindingItem);
        }
    }, [bindingItem]);*/

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

    const primaryText = "Binding";
    const secondaryText = <ListItemSecondaryText>{controllableParameterForBinding?.description}</ListItemSecondaryText>;

    return (
        <Fragment>
            <ListItem
                sx={{ bgcolor: getBgColorForElementType(bindingItem?.elementType) }}
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="edit binding"
                            id={`${bindingItem?.id}-edit-button`}
                            onClick={() => handleClickOpenEditBindingItemDialog()}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={bindingItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(bindingItem, false) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <ListItemIcon sx={{ color: getFgColorForElementType(bindingItem?.elementType) }}>
                        <IconControllableParameter
                            parameterType={bindingItem.type}
                            parameterLevel={bindingItem.level}
                        />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
            <EditBindingItemDialog
                bindingItem={bindingItem}
                controllableParameters={controllableParameters}
                controllableParameterForBinding={controllableParameterForBinding}
                open={editBindingItemDialogIsOpen}
                onClose={handleCloseEditBindingItemDialog}
            />
        </Fragment>
    );
}
