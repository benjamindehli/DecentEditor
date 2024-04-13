"use client";

// Depenedencies
import { useContext, useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";
import xml2js from "xml2js";

// Material UI
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AppBar, Box, IconButton, List, Toolbar, Typography } from "@mui/material";
import { Badge, Button } from "@mui/base";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import { blueGrey } from "@mui/material/colors";

// Classes
import { Ui } from "@/classes/Ui";
import { Groups } from "@/classes/Groups";
import { DecentSampler } from "@/classes/DecentSampler";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

// Components
import { generateCssBgColors } from "@/functions/styles";
import { GroupsListComponent } from "@/components/DecentSampler/Groups/GroupsListComponent";
import { UiListComponent } from "@/components/DecentSampler/Ui/UiListComponent";

// Stylesheets
import style from "./page.module.scss";
import { Keyboard } from "@/classes/Keyboard";
import { Tab } from "@/classes/Tab";

hljs.registerLanguage("xml", xml);

export default function Home() {
    const decentSamplerContext = useContext(DecentSamplerContext);

    const [jsonData, setJsonData] = useState({});
    const [xmlData, setXmlData] = useState(null);
    const [showXmlPreview, setShowXmlPreview] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [decentSampler, setDecentSampler] = useState(null);

    function updateJsonData(decentSampler) {
        const jsonData = { DecentSampler: decentSampler.toJson() };
        setJsonData(jsonData);
    }

    function toggleXmlPreview() {
        setShowXmlPreview(!showXmlPreview);
    }

    useEffect(() => {
        generateCssBgColors();
    }, []);

    useEffect(() => {
        setDecentSampler(new DecentSampler(decentSamplerContext));
    }, [decentSamplerContext]);

    useEffect(() => {
        if (decentSampler) {
            updateJsonData(decentSampler);
        }
    }, [decentSampler]);

    useEffect(() => {
        var builder = new xml2js.Builder();
        if (Object.keys(jsonData).length) {
            var xml = builder.buildObject(jsonData);
            setXmlData(hljs.highlight(xml, { language: "xml" }).value);
        }
    }, [jsonData]);

    function convertJsonDataToObject(jsonData) {
        const groupsList = jsonData.DecentSampler.groups.map((groupsItem) => {
            const groupsObject = new Groups({ ...groupsItem.$ }, groupsItem.group);
            return groupsObject;
        });
        const uiList = jsonData.DecentSampler.ui.map((uiItem) => {
            const uiObject = new Ui({ ...uiItem.$ }, uiItem.keyboard, uiItem.tab);
            return uiObject;
        });
        return { groupsList, uiList };
    }

    function handleFileInputChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const parser = new xml2js.Parser();
            parser.parseString(e.target.result, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const objectFromJsonData = convertJsonDataToObject(result);
                setSelectedFileName(file.name);
                decentSampler.updateGroupsList(objectFromJsonData.groupsList);
                decentSampler.updateUiList(objectFromJsonData.uiList);
            });
        };
        reader.readAsText(file);
    }

    function handleCreateNewPresetClick() {
        const newPreset = new DecentSampler(decentSamplerContext);
        const newGroupsList = new Groups();
        const newUiList = new Ui({}, [new Keyboard()], [new Tab()]);
        decentSampler.updateUiList([newUiList]);
        decentSampler.updateGroupsList([newGroupsList]);
        setDecentSampler(newPreset);
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

    return (
        <Box
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh"
            }}
        >
            <AppBar position="sticky">
                <Toolbar>
                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        DecentEditor{selectedFileName ? `: ${selectedFileName}` : ""}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" component="label" role={undefined} tabIndex={-1}>
                        <CloudUploadIcon />
                        <VisuallyHiddenInput type="file" onChange={handleFileInputChange} />
                    </IconButton>
                    <button onClick={toggleXmlPreview}>{showXmlPreview ? "Hide XML" : "Show XML"}</button>
                    <Button onClick={handleCreateNewPresetClick}>Create new preset</Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ display: "flex" }} component="main">
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Paper sx={{ p: 0, display: "flex", flexDirection: "column", overflow: "auto", maxHeight: "calc(100vh - 128px)", }}>
                                <List
                                    sx={{
                                        width: "100%",
                                        bgcolor: "background.paper",
                                        
                                    }}
                                    component="nav"
                                    disablePadding
                                    dense
                                >
                                    {!!decentSampler?.uiList?.length && (
                                        <UiListComponent uiList={decentSampler.uiList} />
                                    )}
                                    {!!decentSampler?.groupsList?.length && (
                                        <GroupsListComponent groupsList={decentSampler.groupsList} />
                                    )}
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                            <Paper sx={{ p: 0, display: "flex", flexDirection: "column", overflow: "auto", maxHeight: "calc(100vh - 128px)", bgcolor: blueGrey[900] }}>
                                {showXmlPreview && (
                                    <div className={style.container}>
                                        <div className={style.code}>
                                            <pre dangerouslySetInnerHTML={xmlData && { __html: xmlData }}></pre>
                                        </div>
                                    </div>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}