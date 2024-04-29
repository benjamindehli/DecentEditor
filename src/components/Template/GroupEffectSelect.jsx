// Dependencies
import { Fragment, useContext } from "react";

// Material UI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Chip, Grid, Icon } from "@mui/material";
import { Tune } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Functions
import { getColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

// Data
import effectTypesData from "@/data/effectTypes";

export default function GroupEffectSelect({ groupRef, effectRef, onChange, open }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const theme = useTheme();

    const groupsWithEffects = decentSamplerContext.decentSampler.getFirstGroupsItem().getGroupItemsWithEffects();

    const defaultValue = groupRef && effectRef ? { groupRef, effectRef } : "";

    const optionElements = renderSelectChildElements(groupsWithEffects);

    function getEffectTypeForEffectItem(effect) {
        return effectTypesData.find((effectType) => {
            return effectType.type === effect.type;
        });
    }

    function renderSelectChildElements(groups) {
        const selectChildElements = [];
        groups?.length &&
            groups.forEach((group, groupIndex) => {
                const effects = group?.getFirstEffectsItem()?.getEffectItems();

                if (!!effects?.length) {
                    const tagList = !!group?.tags?.length ? (
                        <Fragment>
                            {group.tags.split(",").map((tag) => {
                                return <Chip component="span" label={tag} key={tag} size="small" />;
                            })}
                        </Fragment>
                    ) : (
                        ""
                    );

                    selectChildElements.push(
                        <ListSubheader key={group.id}>
                            Group {groupIndex + 1} {tagList}
                        </ListSubheader>
                    );

                    effects.forEach((effect) => {
                        const containsDefaultValue =
                            group?.id === defaultValue?.groupRef?.id && effect?.id === defaultValue?.effectRef?.id;
                        const value = containsDefaultValue ? defaultValue : { groupRef: group, effectRef: effect };
                        selectChildElements.push(
                            <MenuItem key={effect.id} value={value}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                        <Icon>
                                            <Tune
                                                sx={{ color: getColorForElementType("effect")[theme.palette.mode] }}
                                            />
                                        </Icon>
                                    </Grid>
                                    <Grid item>{getEffectTypeForEffectItem(effect).description}</Grid>
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

    return (
        open &&
        optionElements?.length && ( // Prevent warning with unmounted component
            <div>
                <FormControl margin="dense" fullWidth variant="outlined">
                    <InputLabel id="group-effect-select-label" htmlFor="group-effect-select">
                        Group effects
                    </InputLabel>
                    <Select
                        defaultValue={defaultValue}
                        id="group-effect-select"
                        label="Group effects"
                        labelId="group-effect-select-label"
                        onChange={handleOnChange}
                    >
                        {optionElements}
                    </Select>
                </FormControl>
            </div>
        )
    );
}
