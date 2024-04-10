// Dependencies
import * as React from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

// Material UI
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IconControllableParameter } from "./Icons/IconControllableParameter";

// Classes
import { ControllableParameter } from "@/classes/ControllableParameter";

// Data
import controllableParametersData from "@/data/controllableParameters.js";

export default function BindingParameterSelect() {
    const controllableParameters = controllableParametersData.map((controllableParameter) => {
        return new ControllableParameter(controllableParameter);
    });

    return (
        <Autocomplete
            id="controllable-parameters-select"
            fullWidth
            options={controllableParameters}
            getOptionLabel={(option) => option.description}
            renderInput={(params) => <TextField {...params} label="Controllable parameter" margin="normal" />}
            renderOption={(props, option, { inputValue }) => {
                const matches = match(option.description, inputValue, { insideWords: true });
                const parts = parse(option.description, matches);

                return (
                    <li {...props} key={option.id}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: "flex", width: 64 }}>
                                <IconControllableParameter parameterType={option.type} parameterLevel={option.level} />
                            </Grid>
                            <Grid item sx={{ width: "calc(100% - 64px)", wordWrap: "break-word" }}>
                                {parts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Level: {option.level}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Type: {option.type}
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
