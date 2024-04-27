import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormHelperText,
    Icon,
    Switch,
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import { useContext, useState } from "react";
import DecentSamplerContext from "@/store/DecentSamplerContext";
import { AudioFile, Folder, FolderOff, RestorePage } from "@mui/icons-material";

import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Sample } from "@/classes/Sample";

export function EditSampleItemDialog({ sampleItem, open, onClose }) {
    const decentSampler = useContext(DecentSamplerContext);
    const [loopEnabled, setLoopEnabled] = useState(sampleItem.loopEnabled === "1");
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: "form",
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const stateProps = {};
                    const updatedSampleItem = new Sample({ ...sampleItem, ...formJson, ...stateProps });
                    decentSampler.updateSampleItem(updatedSampleItem);
                    onClose();
                }
            }}
        >
            <DialogTitle>
                <Icon>{loopEnabled ? <RestorePage /> : <AudioFile />}</Icon> Edit group
            </DialogTitle>
            <AppBar position="static">
                <Tabs
                    value={0}
                    textColor="inherit"
                    indicatorColor="secondary"
                    centered
                    variant="fullWidth"
                    onChange={() => {
                        console.log("test");
                    }}
                    aria-label="icon label tabs example"
                >
                    <Tab icon={<PhoneIcon />} label="GENERAL" />
                    <Tab icon={<FavoriteIcon />} label="LOOPING" />
                    <Tab icon={<FavoriteIcon />} label="ENVELOPE" />
                    <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                    <Tab icon={<PersonPinIcon />} label="Voice-Muting / Legato" />
                </Tabs>
            </AppBar>
            <DialogContent></DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    );
}
