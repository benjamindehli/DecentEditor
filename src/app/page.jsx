"use client";

// Depenedencies
import { useContext, useState } from "react";
import xml2js from "xml2js";

// Material UI
import { useTheme } from "@mui/material/styles";
import { AppBar, Box, Divider, ListItemButton, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Code, CodeOff, NoteAdd, OpenInBrowser } from "@mui/icons-material";

// Components
import { DecentSamplerItemComponent } from "@/components/DecentSampler/DecentSamplerItemComponent";
import { XmlPreview } from "@/components/Template/XmlPreview";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";
import ColorModeContext from "@/store/ColorModeContext";

export default function Home() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [showXmlPreview, setShowXmlPreview] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState(null);

    function toggleXmlPreview() {
        setShowXmlPreview(!showXmlPreview);
    }

    function handleFileInputChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const parser = new xml2js.Parser({ preserveChildrenOrder: true, explicitChildren: true });
            parser.parseString(e.target.result, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                setSelectedFileName(file.name);
                if (result?.DecentSampler) {
                    decentSamplerContext.initDecentSampler(result.DecentSampler);
                }
            });
        };
        reader.readAsText(file);
    }

    function handleCreateNewPresetClick() {
        decentSamplerContext.initDecentSampler();
    }

    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1
    });

    const elementSectionWidth = showXmlPreview ? "400px" : "530px";

    return (
        <Box>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        DecentEditor{selectedFileName ? `: ${selectedFileName}` : ""}
                    </Typography>
                    <Grid flexBasis="fit-content" container flexDirection="row" justifyContent="right">
                        <ListItemButton dense component="label" onClick={toggleXmlPreview} disabled={!decentSamplerContext?.decentSampler}>
                            <Stack flexDirection="column" alignItems="center">
                                {showXmlPreview ? <CodeOff /> : <Code />}
                                <ListItemText sx={{ my: 0 }} primary={showXmlPreview ? "Hide XML" : "Show XML"} />
                            </Stack>
                        </ListItemButton>
                        <ListItemButton dense component="label" onClick={colorMode.toggleColorMode}>
                            <Stack flexDirection="column" alignItems="center">
                                {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                                <ListItemText
                                    sx={{ my: 0 }}
                                    primary={theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}
                                />
                            </Stack>
                        </ListItemButton>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 2 }} />
                        <ListItemButton dense component="label" role={undefined} tabIndex={-1}>
                            <Stack flexDirection="column" alignItems="center">
                                <OpenInBrowser />
                                <ListItemText sx={{ my: 0 }} primary="Open preset" />
                            </Stack>
                            <VisuallyHiddenInput type="file" onChange={handleFileInputChange} />
                        </ListItemButton>
                        <ListItemButton dense component="label" onClick={handleCreateNewPresetClick}>
                            <Stack flexDirection="column" alignItems="center">
                                <NoteAdd />
                                <ListItemText sx={{ my: 0 }} primary="New preset" />
                            </Stack>
                        </ListItemButton>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/*                
              <BindingParameterSelect /> 
               */}
            <Grid
                container
                component="main"
                sx={{ mx: 0, px: 0 }}
                columnSpacing={0}
                direction="row"
                justifyContent={!showXmlPreview ? "center" : "space-between"}
            >
                <Grid
                    item
                    sx={{
                        width: elementSectionWidth,
                        height: "calc(100vh - 64px)",
                        overflow: "auto",
                        pt: 2,
                        pb: 2,
                        pr: 1,
                        pl: 0
                    }}
                >
                    {!!decentSamplerContext.decentSampler && (
                        <DecentSamplerItemComponent decentSamplerItem={decentSamplerContext.decentSampler} />
                    )}
                </Grid>
                {showXmlPreview && (
                    <Grid item sx={{ width: `calc(100% - ${elementSectionWidth})`, mt: 0, mb: 0 }}>
                        <Paper
                            sx={{
                                p: 0,
                                overflow: "auto",
                                borderRadius: 0,
                                height: "calc(100vh - 64px)"
                            }}
                        >
                            <XmlPreview xmlString={decentSamplerContext?.decentSampler?.toXml()} />
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}
