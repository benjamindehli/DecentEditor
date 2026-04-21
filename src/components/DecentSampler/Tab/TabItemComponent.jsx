// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight, ExpandMore, Image, Label, SmartButton, Tab, Tune } from "@mui/icons-material";
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

export function TabItemComponent({ tabItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);
    const [childCount, setChildCount] = useState(tabItem?.childElements?.length || 0);

    function handleOnRemoveChildElement(id) {
        tabItem.removeChildElementById(id);
        setChildCount((n) => n - 1);
    }

    function hasChildren() {
        return !!tabItem?.childElements?.length;
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem
                onClick={() => {
                    tabItem.addControlItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><Tune /></IconAdd>
                Add control
            </MenuItem>
            <MenuItem
                onClick={() => {
                    tabItem.addButtonItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><SmartButton /></IconAdd>
                Add button
            </MenuItem>
            <MenuItem
                onClick={() => {
                    tabItem.addLabelItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><Label /></IconAdd>
                Add label
            </MenuItem>
            <MenuItem
                onClick={() => {
                    tabItem.addImageItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><Image /></IconAdd>
                Add image
            </MenuItem>
        </Fragment>
    );

    function renderNumberOfItemsForTypeString(type, count) {
        if (!count) return null;
        return `${count} ${type}${count > 1 ? "s" : ""}`;
    }

    function renderSecondaryTextString() {
        const types = { button: 0, control: 0, image: 0, label: 0, "labeled-knob": 0, menu: 0 };
        tabItem.childElements.forEach((childElement) => {
            if (types[childElement.elementType] !== undefined) {
                types[childElement.elementType]++;
            }
        });
        return (
            Object.keys(types)
                .map((type) => renderNumberOfItemsForTypeString(type, types[type]))
                .filter(Boolean)
                .join(", ") || ""
        );
    }

    const tabName = tabItem?.name ? ` "${tabItem.name}"` : "";
    const primaryText = `Tab${tabName}`;
    const secondaryText = <ListItemSecondaryText>{renderSecondaryTextString()}</ListItemSecondaryText>;

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "button":
                return (
                    <ButtonItemComponent
                        key={childElement.id}
                        buttonItem={childElement}
                        onRemoveItem={handleOnRemoveChildElement}
                    />
                );
            case "control":
                return (
                    <ControlItemComponent
                        key={childElement.id}
                        controlItem={childElement}
                        onRemoveItem={handleOnRemoveChildElement}
                    />
                );
            case "image":
                return <ImageItemComponent key={childElement.id} imageItem={childElement} onRemoveItem={handleOnRemoveChildElement} />;
            case "label":
                return <LabelItemComponent key={childElement.id} labelItem={childElement} onRemoveItem={handleOnRemoveChildElement} />;
            case "labeled-knob":
                return <LabeledKnobItemComponent key={childElement.id} labeledKnobItem={childElement} onRemoveItem={handleOnRemoveChildElement} />;
            case "menu":
                return <MenuItemComponent key={childElement.id} menuItem={childElement} onRemoveItem={handleOnRemoveChildElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <DefaultListItem
                elementItem={tabItem}
                settingsMenuItems={settingsMenuItems}

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
