// Dependencies
import { Fragment, useContext, useState } from "react";

// Material UI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Chip } from "@mui/material";
import { Tune } from "@mui/icons-material";

// Functions
import { getFgColorForElementType } from "@/functions/styles";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

// Data
import effectTypesData from "@/data/effectTypes";

export default function GroupEffectSelect({ defaultValue }) {
    const [selectedGroupEffect, setSelectedGroupEffect] = useState(defaultValue);

    const decentSamplerContext = useContext(DecentSamplerContext);
    //const groupsAndGroupEffects = decentSamplerContext.decentSampler.getAllGroupsAndGroupEffects();

    // const [color, setColor] = useState(defaultValue);

    function getEffectTypeForEffectItem(effect) {
        return effectTypesData.find((effectType) => {
            return effectType.type === effect.type;
        });
    }

    function renderSelectChildElements() {

        const groupsWithEffects = decentSamplerContext.decentSampler.getAllGroupsWithEffects();

        const selectChildElements = [];
        groupsWithEffects.forEach((groupWithEffects, groupIndex) => {
            const effectsItem = groupWithEffects.childElements.find(
                (childElement) => childElement.elementType === "effects"
            );
            const effects = effectsItem?.childElements;

            if (!!effects?.length) {
                const tagList = !!groupWithEffects?.tags?.length ? (
                    <Fragment>
                        {groupWithEffects.tags.split(",").map((tag) => {
                            return <Chip component="span" label={tag} key={tag} size="small" />;
                        })}
                    </Fragment>
                ) : (
                    ""
                );

                selectChildElements.push(
                    <ListSubheader key={groupWithEffects.id}>
                        Group {groupIndex + 1} {tagList}
                    </ListSubheader>
                );

                effects.forEach((effect, effectIndex) => {
                    selectChildElements.push(
                        <MenuItem key={effect.id} value={{ groupIndex, effectIndex }}>
                            <Tune sx={{ mr: 1, color: getFgColorForElementType("effect") }} />{" "}
                            {getEffectTypeForEffectItem(effect).description}
                        </MenuItem>
                    );
                });
            }
        });
        return selectChildElements;
    }

    function handleOnChange(event) {
        console.log("handleOnChange", event.target.value);
    }

    console.log("defaultValue", defaultValue)

    return (
        <div>
            <FormControl margin="dense" fullWidth variant="outlined">
                <pre>{JSON.stringify(defaultValue, null, 2)}</pre>
                <InputLabel htmlFor="grouped-select">Group effects</InputLabel>
                <Select value={selectedGroupEffect} id="grouped-select" label="Group effects" onChange={handleOnChange}>
                    {renderSelectChildElements()}
                </Select>
            </FormControl>
        </div>
    );
}
