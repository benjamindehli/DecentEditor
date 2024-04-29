// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, FormatOverline } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { BindingItemComponent } from "../Binding/BindingItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function LabeledKnobItemComponent({ labeledKnobItem }) {
    const theme = useTheme();

    const decentSamplerContext = useContext(DecentSamplerContext);

    const [isExpanded, setIsExpanded] = useState(false);

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

    function hasChildren() {
        return !!labeledKnobItem?.childElements?.length;
    }

    let primaryInfoText;
    if (labeledKnobItem?.label?.length) {
        primaryInfoText = <Chip component="span" label={labeledKnobItem.label} size="small" />;
    } else if (labeledKnobItem?.parameterName?.length) {
        primaryInfoText = <Chip component="span" label={labeledKnobItem.parameterName} size="small" />;
    }

    const primaryText = <Fragment>Labeled knob {primaryInfoText}</Fragment>;

    const secondaryText = (
        <ListItemSecondaryText>
            {labeledKnobItem?.childElements?.length || 0}{" "}
            {labeledKnobItem?.childElements?.length === 1 ? "binding" : "bindings"}
        </ListItemSecondaryText>
    );

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "binding":
                return <BindingItemComponent key={childElement.id} bindingItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={labeledKnobItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => console.log("onClick")}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(labeledKnobItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(labeledKnobItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <FormatOverline />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!labeledKnobItem?.childElements?.length &&
                            labeledKnobItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
