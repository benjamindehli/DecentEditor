// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { ChevronRight, ExpandMore, SwapCalls } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "@mui/material/styles";

// Components
import { LfoItemComponent } from "../Lfo/LfoItemComponent";
import { EnvelopeItemComponent } from "../Envelope/EnvelopeItemComponent";

// Template
import { ListItemSecondaryText } from "@/components/Template/ListItemSecondaryText";
import { DefaultListItem } from "@/components/Template/DefaultListItem";

// Functions
import { getIndentSize } from "@/functions/helpers";
import { getColorForElementType } from "@/functions/styles";

export function ModulatorsItemComponent({ modulatorsItem }) {
    const theme = useTheme();

    const [isExpanded, setIsExpanded] = useState(false);

    function hasChildren() {
        return !!modulatorsItem?.childElements?.length;
    }

    const settingsMenuItems = (
        <Fragment>
            <MenuItem disableRipple>
                <EditIcon />
                Edit
            </MenuItem>
            <MenuItem disableRipple>
                <FileCopyIcon />
                Duplicate
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleAddGroup();
                }}
                disableRipple
            >
                <ArchiveIcon />
                Add group
            </MenuItem>
            <MenuItem disableRipple>
                <MoreHorizIcon />
                More
            </MenuItem>
        </Fragment>
    );

    function renderNumberOfItemsForTypeString(type, numberOfItemsForType) {
        if (!numberOfItemsForType) {
            return null;
        } else {
            return `${numberOfItemsForType} ${type}${numberOfItemsForType > 1 ? "s" : ""}`;
        }
    }

    function renderSecondaryTextString(modulatorsItem) {
        const childElementTypes = {
            envelope: 0,
            lfo: 0
        };
        modulatorsItem.childElements?.forEach((childElement) => {
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

    const primaryText = "Modulators";

    const secondaryText = <ListItemSecondaryText>{renderSecondaryTextString(modulatorsItem)}</ListItemSecondaryText>;

    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "lfo":
                return <LfoItemComponent key={childElement.id} lfoItem={childElement} />;
            case "envelope":
                return <EnvelopeItemComponent key={childElement.id} envelopeItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            {/* <UiItemSettingsComponent uiItem={uiItem} onUpdateUiItem={handleUpdateUiItem} />*/}
            <DefaultListItem
                elementItem={modulatorsItem}
                settingsMenuItems={settingsMenuItems}
                onEditButtonClick={() => console.log("onClick")}
            >
                <ListItemButton
                    sx={{ pl: getIndentSize(modulatorsItem, hasChildren()) }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {hasChildren() ? isExpanded ? <ExpandMore /> : <ChevronRight /> : null}
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                            color: getColorForElementType(modulatorsItem?.elementType)[theme.palette.mode]
                        }}
                    >
                        <SwapCalls />
                    </ListItemIcon>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                </ListItemButton>
            </DefaultListItem>
            {hasChildren() && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {!!modulatorsItem?.childElements?.length &&
                            modulatorsItem.childElements.map((childElement) => renderChildElement(childElement))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
}
