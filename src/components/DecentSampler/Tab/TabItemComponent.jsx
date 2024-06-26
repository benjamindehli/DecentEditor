// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Folder, Tab } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { ButtonItemComponent } from "../Button/ButtonItemComponent";
import { ImageItemComponent } from "../Image/ImageItemComponent";
import { MenuItemComponent } from "../Menu/MenuItemComponent";
import { ControlItemComponent } from "../Control/ControlItemComponent";
import { LabelItemComponent } from "../Label/LabelItemComponent";
import { LabeledKnobItemComponent } from "../LabeledKnob/LabeledKnobItemComponent";

// Template
import { IconAdd } from "@/components/Template/Icons/IconAdd";
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export function TabItemComponent({ tabItem }) {
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
        return !!tabItem?.childElements?.length;
    }
    function renderNumberOfItemsForTypeString(type, numberOfItemsForType) {
        if (!numberOfItemsForType) {
            return null;
        } else {
            return `${numberOfItemsForType} ${type}${numberOfItemsForType > 1 ? "s" : ""}`;
        }
    }

    function renderSecondaryTextString(tabItem) {
        const childElementTypes = {
            button: 0,
            control: 0,
            image: 0,
            label: 0,
            ["labeled-knob"]: 0,
            menu: 0
        };
        tabItem.childElements.forEach((childElement) => {
            if (childElementTypes[childElement.elementType] !== undefined) {
                childElementTypes[childElement.elementType]++;
            }
        });
        return (
            Object.keys(childElementTypes)
                .map((type) => {
                    const numberOfItemsForType = childElementTypes[type];
                    return renderNumberOfItemsForTypeString(type, numberOfItemsForType);
                })
                ?.filter((numberOfItemsForTypeString) => numberOfItemsForTypeString)
                ?.join(", ") || ""
        );
    }

    const primaryText = "Tab";
    const secondaryText = <ListItemSecondaryText>{renderSecondaryTextString(tabItem)}</ListItemSecondaryText>;

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "button":
                return <ButtonItemComponent key={childElement.id} buttonItem={childElement} />;
            case "control":
                return <ControlItemComponent key={childElement.id} controlItem={childElement} />;
            case "image":
                return <ImageItemComponent key={childElement.id} imageItem={childElement} />;
            case "label":
                return <LabelItemComponent key={childElement.id} labelItem={childElement} />;
            case "labeled-knob":
                return <LabeledKnobItemComponent key={childElement.id} labeledKnobItem={childElement} />;
            case "menu":
                return <MenuItemComponent key={childElement.id} menuItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={tabItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => console.log("onClick")}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(tabItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(tabItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <Tab />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!tabItem?.childElements?.length &&
                            tabItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
