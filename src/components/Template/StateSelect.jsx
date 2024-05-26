// Dependencies
import { useContext, useState } from "react";

// Material UI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Chip, Grid, Icon } from "@mui/material";
import { ToggleOn } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Functions
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export default function StateSelect({ stateBinding, onChange, open }) {
    const decentSamplerContext = useContext(DecentSamplerContext);
    const [value, setValue] = useState(stateBinding || "");

    const theme = useTheme();

    const buttonsWithStates = decentSamplerContext.decentSampler
        .getFirstUiItem()
        .getFirstTabItem()
        .getButtonItemsWithStates();

    const optionElements = renderSelectChildElements(buttonsWithStates);

    function getChipLabelForButton(button) {
        return button?.mainImage || button?.style || (button?.x && button?.y) ? `x: ${button.x}, y: ${button.y}` : "";
    }

    function renderSelectChildElements(buttons) {
        const selectChildElements = [];
        buttons?.length &&
            buttons.forEach((button, buttonIndex) => {
                const states = button?.getStateItems();

                if (!!states?.length) {
                    const buttonChipLabel = getChipLabelForButton(button);
                    const buttonChip = !!buttonChipLabel?.length && (
                        <Chip component="span" label={buttonChipLabel} size="small" />
                    );

                    selectChildElements.push(
                        <ListSubheader key={button.id}>
                            Button {buttonIndex + 1} {buttonChip}
                        </ListSubheader>
                    );

                    states.forEach((state) => {
                        const containsSelectedValue =
                            button?.id === value?.controlRef?.id && state?.id === value?.stateRef?.id;
                        const optionValue = containsSelectedValue ? value : { controlRef: button, stateRef: state };
                        selectChildElements.push(
                            <MenuItem key={state.id} value={optionValue}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                        <Icon>
                                            <ToggleOn
                                                sx={{ color: getColorForElementType("state")[theme.palette.mode] }}
                                            />
                                        </Icon>
                                    </Grid>
                                    <Grid item>{state?.name}</Grid>
                                </Grid>
                            </MenuItem>
                        );
                    });
                }
            });
        return selectChildElements;
    }

    function handleOnChange(event) {
        setValue(event.target.value);
        onChange(event.target.value);
    }

    return (
        open &&
        optionElements?.length && ( // Prevent warning with unmounted component
            <div>
                <FormControl margin="dense" fullWidth variant="outlined">
                    <InputLabel id="state-select-label" htmlFor="state-select">
                        State
                    </InputLabel>
                    <Select
                        value={value}
                        id="state-select"
                        label="State"
                        labelId="state-select-label"
                        onChange={handleOnChange}
                    >
                        {optionElements}
                    </Select>
                </FormControl>
            </div>
        )
    );
}
