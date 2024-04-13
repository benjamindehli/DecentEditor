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

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

// Data
import controllableParametersData from "@/data/controllableParameters.js";

export function BindingItemComponent({ bindingItem }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [controllableParameterForBinding, setControllableParameterForBinding] = useState(null);

    const [isExpanded, setIsExpanded] = useState(false);

    function getControlParameterForBindingItem(binding) {
        return controllableParametersData.find((controllableParameter) => {
            return (
                controllableParameter.type === binding.type &&
                controllableParameter.level === binding.level &&
                controllableParameter.parameter === binding.parameter
            );
        });
    }

    useEffect(() => {
        const controllableParameter = getControlParameterForBindingItem(bindingItem);
        setControllableParameterForBinding(controllableParameter);
        if (!controllableParameter) {
            console.log("noMatch", bindingItem);
        }
    }, [bindingItem]);

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
                disablePadding
                secondaryAction={
                    <Fragment>
                        <IconButton
                            edge="start"
                            aria-label="binding edit button"
                            id={`${bindingItem?.id}-edit-button`}
                            onClick={() => console.log("onClick")}
                        >
                            <EditIcon />
                        </IconButton>
                        <SettingsMenu elementItem={bindingItem} menuItems={settingsMenuItems}></SettingsMenu>
                    </Fragment>
                }
            >
                <ListItemButton sx={{ pl: 13 }} onClick={() => setIsExpanded(!isExpanded)}>
                    <ListItemIcon>
                        <IconControllableParameter
                            parameterType={bindingItem.type}
                            parameterLevel={bindingItem.level}
                        />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </ListItem>
        </Fragment>
    );
}
