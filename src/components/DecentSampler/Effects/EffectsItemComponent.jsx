// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AutoAwesome, ChevronRight, ExpandMore, FolderSpecial } from "@mui/icons-material";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Components
import { EffectItemComponent } from "../Effect/EffectItemComponent";
import { useTheme } from "@mui/material/styles";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function EffectsItemComponent({ effectsItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [numberOfEffectItems, setNumberOfEffectItems] = useState(effectsItem?.childElements?.length || 0);

    function handleOnRemoveChildElement(itemId) {
        effectsItem.removeChildElementById(itemId);
        setNumberOfEffectItems((n) => n - 1);
    }

    function handleAddEffect(type) {
        effectsItem.addEffectItem({ type });
        setIsExpanded(true);
        setNumberOfEffectItems((n) => n + 1);
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem onClick={() => handleAddEffect("reverb")} disableRipple>
                <IconAdd><AutoAwesome /></IconAdd>
                Add reverb
            </MenuItem>
            <MenuItem onClick={() => handleAddEffect("delay")} disableRipple>
                <IconAdd><AutoAwesome /></IconAdd>
                Add delay
            </MenuItem>
            <MenuItem onClick={() => handleAddEffect("chorus")} disableRipple>
                <IconAdd><AutoAwesome /></IconAdd>
                Add chorus
            </MenuItem>
            <MenuItem onClick={() => handleAddEffect("phaser")} disableRipple>
                <IconAdd><AutoAwesome /></IconAdd>
                Add phaser
            </MenuItem>
            <MenuItem onClick={() => handleAddEffect("convolution")} disableRipple>
                <IconAdd><AutoAwesome /></IconAdd>
                Add convolution
            </MenuItem>
            <MenuItem onClick={() => handleAddEffect("lowpass")} disableRipple>
                <IconAdd><AutoAwesome /></IconAdd>
                Add low-pass filter
            </MenuItem>
            <MenuItem onClick={() => handleAddEffect("highpass")} disableRipple>
                <IconAdd><AutoAwesome /></IconAdd>
                Add high-pass filter
            </MenuItem>
            <MenuItem onClick={() => handleAddEffect("gain")} disableRipple>
                <IconAdd><AutoAwesome /></IconAdd>
                Add gain
            </MenuItem>
            <MenuItem onClick={() => handleAddEffect("wave_folder")} disableRipple>
                <IconAdd><AutoAwesome /></IconAdd>
                Add wave folder
            </MenuItem>
            <MenuItem onClick={() => handleAddEffect("wave_shaper")} disableRipple>
                <IconAdd><AutoAwesome /></IconAdd>
                Add wave shaper
            </MenuItem>
        </Fragment>
    );

    function hasChildren() {
        return !!effectsItem?.childElements?.length;
    }

    const primaryText = "Effects";
    const secondaryText = (
        <ListItemSecondaryText>
            {numberOfEffectItems} {numberOfEffectItems === 1 ? "effect" : "effects"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "effect":
                return (
                    <EffectItemComponent
                        key={childElement.id}
                        effectItem={childElement}
                        onRemoveItem={handleOnRemoveChildElement}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem elementItem={effectsItem} settingsMenuItems={settingsMenuItems}>
                <ListItemButton
                    sx={{ pl: getIndentSize(effectsItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(effectsItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <FolderSpecial />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!effectsItem?.childElements?.length &&
                            effectsItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
