// Dependencies
import * as React from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

// Material UI
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IconControllableParameter } from "./Icons/IconControllableParameter";

export default function BindingParameterSelect({ onChange, controllableParameters, defaultValue }) {
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
                onChange(newValue);
            }}
            value={defaultValue}
            renderInput={(params) => <TextField {...params} label="Controllable parameter" margin="normal" />}
            renderOption={(props, option, { inputValue }) => {
                const descriptionMatches = match(option.description, inputValue, { insideWords: true });
                const descriptionParts = parse(option.description, descriptionMatches);

                const secondaryDescriptionMatches =
                    option.secondaryDescription &&
                    match(option.secondaryDescription, inputValue, { insideWords: true });
                const secondaryDescriptionParts =
                    option.secondaryDescription && parse(option.secondaryDescription, secondaryDescriptionMatches);

                const levelMatches = match(option.level, inputValue, { insideWords: true });
                const levelParts = parse(option.level, levelMatches);

                const typeMatches = match(option.type, inputValue, { insideWords: true });
                const typeParts = parse(option.type, typeMatches);

                return (
                    <li {...props} key={option.id}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: "flex", width: 64 }}>
                                <IconControllableParameter parameterType={option.type} parameterLevel={option.level} />
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
                                {option.secondaryDescription && (
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
                                    </Grid>
                                    <Grid item xs={8}>
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
