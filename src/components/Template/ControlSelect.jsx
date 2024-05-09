// Dependencies
import { useContext, useState } from "react";

// Material UI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Chip, Collapse, FormHelperText, Grid, Icon, IconButton, InputAdornment } from "@mui/material";
import { SmartButton, Tune, Image as ImageIcon, ListAlt, Abc, FormatOverline, Help } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Functions
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";
import { capitalizeFirstLetter } from "@/functions/helpers";

export default function ControlSelect({ id, name, label, getDefaultValue, controlRef, onChange, open, helperText }) {
    const decentSamplerContext = useContext(DecentSamplerContext);
    const [showHelperText, setShowHelperText] = useState(false);

    const handleClickShowHelperText = () => setShowHelperText((showHelperText) => !showHelperText);

    const handleMouseDownShowHelperText = (event) => {
        event.preventDefault();
    };

    const theme = useTheme();

    const tabItem = decentSamplerContext.decentSampler.getFirstUiItem().getFirstTabItem();
    const tabChildItems = {
        button: tabItem?.getButtonItems(),
        control: tabItem?.getControlItems(),
        image: tabItem?.getImageItems(),
        label: tabItem?.getLabelItems(),
        "labeled-knob": tabItem?.getLabeledKnobItems(),
        menu: tabItem?.getMenuItems()
    };

    const defaultValue = controlRef || "";

    const optionElements = renderSelectChildElements(tabChildItems);

    function getLabelForElementType(elementType) {
        switch (elementType) {
            case "button":
                return "Button";
            case "control":
                return "Control";
            case "image":
                return "Image";
            case "label":
                return "Label";
            case "labeled-knob":
                return "Labeled knob";
            case "menu":
                return "Menu";
            default:
                return "";
        }
    }

    function getIconForElementType(elementType) {
        const iconProps = { sx: { color: getColorForElementType(elementType)[theme.palette.mode] } };
        switch (elementType) {
            case "button":
                return <SmartButton {...iconProps} />;
            case "control":
                return <Tune {...iconProps} />;
            case "image":
                return <ImageIcon {...iconProps} />;
            case "label":
                return <Abc {...iconProps} />;
            case "labeled-knob":
                return <FormatOverline {...iconProps} />;
            case "menu":
                return <ListAlt {...iconProps} />;
            default:
                return "";
        }
    }

    function getChipLabelForElementType(elementType, element) {
        switch (elementType) {
            case "button":
                return element?.mainImage || element?.style || (element?.x && element?.y)
                    ? `x: ${element.x}, y: ${element.y}`
                    : "";
            case "control":
                return element?.label || element?.parameterName;
            case "image":
                return element?.path;
            case "label":
                return element?.text;
            case "labeled-knob":
                return element?.label || element?.parameterName;
            case "menu":
                return element?.childElements?.length === 1
                    ? "1 option"
                    : `${element?.childElements?.length || 0} options`;
            default:
                return "";
        }
    }

    function renderSelectChildElements(tabChildItems) {
        const selectChildElements = [];
        Object.keys(tabChildItems)?.length &&
            Object.keys(tabChildItems).forEach((elementType) => {
                const elements = tabChildItems[elementType];

                if (!!elements?.length) {
                    selectChildElements.push(
                        <ListSubheader key={elementType}>{getLabelForElementType(elementType)}s</ListSubheader>
                    );

                    elements.forEach((element) => {
                        const containsDefaultValue = element?.id === defaultValue?.id;
                        const value = containsDefaultValue ? defaultValue : element;
                        const chipLabel = getChipLabelForElementType(elementType, element);
                        selectChildElements.push(
                            <MenuItem key={element.id} value={value}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                        <Icon>{getIconForElementType(elementType)}</Icon>
                                    </Grid>
                                    <Grid item>
                                        {getLabelForElementType(elementType)}{" "}
                                        {!!chipLabel?.length && (
                                            <Chip component="span" size="small" label={chipLabel} />
                                        )}
                                    </Grid>
                                </Grid>
                            </MenuItem>
                        );
                    });
                }
            });
        return selectChildElements;
    }

    function handleOnChange(event) {
        onChange(event.target.value);
    }

    const labelWithFallback = label || capitalizeFirstLetter(name);
    const idWithFallback = id || name;
    const helperTextId = `${idWithFallback}-helper-text`;
    const hasHelperText = !!helperText?.length;

    return (
        open &&
        optionElements?.length && ( // Prevent warning with unmounted component
            <FormControl margin="dense" fullWidth variant="outlined">
                <InputLabel id="control-select-label" htmlFor="control-select">
                    Controls
                </InputLabel>
                <Select
                    defaultValue={defaultValue}
                    id="control-select"
                    label="Control"
                    labelId="control-select-label"
                    onChange={handleOnChange}
                    endAdornment={
                        hasHelperText && (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowHelperText}
                                    onMouseDown={handleMouseDownShowHelperText}
                                    edge="end"
                                >
                                    <Help color={showHelperText ? "primary" : "inherit"} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                    sx={{
                        "& .MuiSelect-icon": hasHelperText && {
                            marginRight: 5
                        }
                    }}
                >
                    {optionElements}
                </Select>
                {hasHelperText && (
                    <Collapse in={showHelperText}>
                        <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
                    </Collapse>
                )}
            </FormControl>
        )
    );
}
