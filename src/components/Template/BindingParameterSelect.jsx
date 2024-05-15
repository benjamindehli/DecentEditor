import { useContext, useState } from "react";
// Dependencies
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

// Material UI
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Template
import { IconControllableParameter } from "./Icons/IconControllableParameter";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export default function BindingParameterSelect({ onChange, defaultValue }) {
    const decentSamplerContext = useContext(DecentSamplerContext);
    const controllableParameters = decentSamplerContext.decentSampler.getControllableParameters();
    const [value, setValue] = useState(defaultValue && Object.keys(defaultValue).length ? defaultValue : controllableParameters[0]);

    const filterOptions = createFilterOptions({
        stringify: (option) => `${option.description} ${option.secondaryDescription} ${option.level} ${option.type}`
    });

    return (
        <Autocomplete
            id="controllable-parameters-select"
            fullWidth
            options={controllableParameters}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.description}
            onChange={(event, newValue) => {
                setValue(newValue);
                onChange(newValue);
            }}
            value={value || ""}
            renderInput={(params) => <TextField {...params} label="Controllable parameter" margin="normal" />}
            renderOption={(props, option, { inputValue }) => {
                const descriptionMatches =
                    option?.description && match(option.description, inputValue, { insideWords: true });
                const descriptionParts = option?.description && parse(option.description, descriptionMatches);

                const secondaryDescriptionMatches =
                    option?.secondaryDescription &&
                    match(option.secondaryDescription, inputValue, { insideWords: true });
                const secondaryDescriptionParts =
                    option?.secondaryDescription && parse(option.secondaryDescription, secondaryDescriptionMatches);

                const levelMatches = option?.level && match(option.level, inputValue, { insideWords: true });
                const levelParts = option?.level && parse(option.level, levelMatches);

                const typeMatches = option?.type && match(option.type, inputValue, { insideWords: true });
                const typeParts = option?.type && parse(option.type, typeMatches);

                return (
                    <li {...props} key={option.id}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: "flex", width: 64 }}>
                                <IconControllableParameter controllableParameter={option} />
                            </Grid>
                            <Grid item sx={{ width: "calc(100% - 64px)", wordWrap: "break-word" }}>
                                {descriptionParts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}
                                {option?.secondaryDescription && (
                                    <Typography variant="body2" color="text.primary">
                                        {secondaryDescriptionParts.map((part, index) => (
                                            <Box
                                                key={index}
                                                component="span"
                                                sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                                            >
                                                {part.text}
                                            </Box>
                                        ))}
                                    </Typography>
                                )}

                                <Grid container>
                                    <Grid item xs={4}>
                                        {!!levelParts?.length && (
                                            <Typography variant="body2" color="text.secondary">
                                                Level:{" "}
                                                {levelParts.map((part, index) => (
                                                    <Box
                                                        key={index}
                                                        component="span"
                                                        sx={{
                                                            fontWeight: part.highlight ? "bold" : "regular",
                                                            color: part.highlight ? "text.primary" : "text.secondary"
                                                        }}
                                                    >
                                                        {part.text}
                                                    </Box>
                                                ))}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={8}>
                                        {!!typeParts?.length && (
                                            <Typography variant="body2" color="text.secondary">
                                                Type:{" "}
                                                {typeParts.map((part, index) => (
                                                    <Box
                                                        key={index}
                                                        component="span"
                                                        sx={{
                                                            fontWeight: part.highlight ? "bold" : "regular",
                                                            color: part.highlight ? "text.primary" : "text.secondary"
                                                        }}
                                                    >
                                                        {part.text}
                                                    </Box>
                                                ))}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}
