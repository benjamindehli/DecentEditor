// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Folder } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { EditBindingItemDialog } from "./EditBindingItemDialog";

// Template
import { IconControllableParameter } from "@/components/Template/Icons/IconControllableParameter";
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Classes
import { ControllableParameter } from "@/classes/ControllableParameter";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

// Data
import controllableParametersData from "@/data/controllableParameters.js";

export function BindingItemComponent({ bindingItem }) {
    const theme = useTheme();

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
            <DefaultListItem
                elementItem={bindingItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={handleClickOpenEditBindingItemDialog}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(bindingItem, false) }}
                    onClick={() => setIsExpanded(!isExpanded)}
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
                controllableParameters={controllableParameters}
                controllableParameterForBinding={controllableParameterForBinding}
                open={editBindingItemDialogIsOpen}
                onClose={handleCloseEditBindingItemDialog}
            />
        </Fragment>
    );
}
