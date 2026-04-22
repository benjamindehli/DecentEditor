// Dependencies
import { Fragment, useState } from "react";

// Material UI
import MenuItem from "@mui/material/MenuItem";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { BurstMode, ChevronRight, CropSquare, ExpandMore, GraphicEq, HorizontalRule, Image, Label, ListAlt, OpenWith, SmartButton, Tab, Tune } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Components
import { ButtonItemComponent } from "../Button/ButtonItemComponent";
import { ControlItemComponent } from "../Control/ControlItemComponent";
import { ImageItemComponent } from "../Image/ImageItemComponent";
import { LabelItemComponent } from "../Label/LabelItemComponent";
import { LabeledKnobItemComponent } from "../LabeledKnob/LabeledKnobItemComponent";
import { LineItemComponent } from "../Line/LineItemComponent";
import { MenuItemComponent } from "../Menu/MenuItemComponent";
import { MultiFrameImageItemComponent } from "../MultiFrameImage/MultiFrameImageItemComponent";
import { OscilloscopeItemComponent } from "../Oscilloscope/OscilloscopeItemComponent";
import { RectangleItemComponent } from "../Rectangle/RectangleItemComponent";
import { XyPadItemComponent } from "../XyPad/XyPadItemComponent";

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
            <MenuItem
                onClick={() => {
                    tabItem.addMultiFrameImageItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><BurstMode /></IconAdd>
                Add multi-frame image
            </MenuItem>
            <MenuItem
                onClick={() => {
                    tabItem.addRectangleItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><CropSquare /></IconAdd>
                Add rectangle
            </MenuItem>
            <MenuItem
                onClick={() => {
                    tabItem.addLineItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><HorizontalRule /></IconAdd>
                Add line
            </MenuItem>
            <MenuItem
                onClick={() => {
                    tabItem.addOscilloscopeItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><GraphicEq /></IconAdd>
                Add oscilloscope
            </MenuItem>
            <MenuItem
                onClick={() => {
                    tabItem.addMenuItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><ListAlt /></IconAdd>
                Add menu
            </MenuItem>
            <MenuItem
                onClick={() => {
                    tabItem.addXyPadItem({});
                    setIsExpanded(true);
                    setChildCount((n) => n + 1);
                }}
                disableRipple
            >
                <IconAdd><OpenWith /></IconAdd>
                Add XY pad
            </MenuItem>
        </Fragment>
    );

    function renderNumberOfItemsForTypeString(type, count) {
        if (!count) return null;
        return `${count} ${type}${count > 1 ? "s" : ""}`;
    }

    function renderSecondaryTextString() {
        const types = {
            button: 0, control: 0, image: 0, label: 0, "labeled-knob": 0,
            line: 0, menu: 0, multiFrameImage: 0, oscilloscope: 0, rectangle: 0, xyPad: 0
        };
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
            case "line":
                return <LineItemComponent key={childElement.id} lineItem={childElement} onRemoveItem={handleOnRemoveChildElement} />;
            case "menu":
                return <MenuItemComponent key={childElement.id} menuItem={childElement} onRemoveItem={handleOnRemoveChildElement} />;
            case "multiFrameImage":
                return <MultiFrameImageItemComponent key={childElement.id} multiFrameImageItem={childElement} onRemoveItem={handleOnRemoveChildElement} />;
            case "oscilloscope":
                return <OscilloscopeItemComponent key={childElement.id} oscilloscopeItem={childElement} onRemoveItem={handleOnRemoveChildElement} />;
            case "rectangle":
                return <RectangleItemComponent key={childElement.id} rectangleItem={childElement} onRemoveItem={handleOnRemoveChildElement} />;
            case "xyPad":
                return <XyPadItemComponent key={childElement.id} xyPadItem={childElement} onRemoveItem={handleOnRemoveChildElement} />;
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
