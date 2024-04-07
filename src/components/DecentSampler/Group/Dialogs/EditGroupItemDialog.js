// Dependencies
import { useContext, useState } from "react";

// Material UI
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
import { Folder, FolderOff, SettingsInputSvideo, ShowChart, Tune } from "@mui/icons-material";

// Components
import { TabPanel } from "@/components/Template/TabPanel";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

// Clases
import { Group } from "@/classes/Group";

export function EditGroupItemDialog({ groupItem, open, onClose }) {
    const decentSampler = useContext(DecentSamplerContext);
    const [enabled, setEnabled] = useState(groupItem.enabled === "1");
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    function a11yProps(index) {
        return {
            id: `tab-${index}`,
            "aria-controls": `tabpanel-${index}`
        };
    }

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
                    console.log({ formJson });
                    const stateProps = {
                        enabled: enabled ? "1" : "0"
                    };

                    const updatedGroupItem = new Group({ ...groupItem, ...formJson, ...stateProps });
                    decentSampler.updateGroupItem(updatedGroupItem);
                    onClose();
                }
            }}
        >
            <DialogTitle>
                <Icon>{enabled ? <Folder /> : <FolderOff />}</Icon> Edit group
            </DialogTitle>
            <AppBar position="static">
                <Tabs
                    value={selectedTab}
                    textColor="inherit"
                    indicatorColor="secondary"
                    centered
                    variant="fullWidth"
                    onChange={handleTabChange}
                    aria-label="icon label tabs example"
                >
                    <Tab icon={<Tune />} label="GENERAL" {...a11yProps(0)} />
                    <Tab icon={<ShowChart />} label="ENVELOPE" {...a11yProps(1)} />
                    <Tab icon={<SettingsInputSvideo />} label="MIDI" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <DialogContent>
                <TabPanel value={selectedTab} index={0}>
                    <FormControlLabel
                        value="1"
                        name="enabled"
                        control={
                            <Switch
                                checked={enabled}
                                onChange={(event) => setEnabled(event.target.checked)}
                                inputProps={{ "aria-label": "controlled" }}
                                color="primary"
                            />
                        }
                        label="enabled"
                    />
                    <FormHelperText component="span" sx={{display: "block"}}>
                        Whether or not this group is enabled. Possible values: true, false. Default: true
                    </FormHelperText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="tags"
                        name="tags"
                        label="Tags"
                        type="text"
                        defaultValue={groupItem.tags}
                        fullWidth
                        helperText="A comma-separated list of tags. Example: tags=”rt,mic1”. These are useful when controlling volumes using tags. See Appendix D."
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="volume"
                        name="volume"
                        label="Volume"
                        type="number"
                        inputProps={{ step: "0.1", min: "0", max: "10" }}
                        defaultValue={groupItem.volume}
                        fullWidth
                        helperText="The volume of the group. Value can be in linear 0.0-1.0 or in decibels. If it’s in decibels you must append dB after the value (example: “3dB”). Default: 1.0"
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="ampVelTrack"
                        name="ampVelTrack"
                        label="ampVelTrack"
                        type="number"
                        inputProps={{ step: "0.01", min: "0", max: "1" }}
                        defaultValue={groupItem.ampVelTrack}
                        fullWidth
                        helperText="The degree to which the velocity of the incoming notes affects the volume of the samples in this group. 0 = not at all. 1 = volume is completely determined by incoming velocity. When the value is 1, a velocity of 127 (max velocity) yields a gain 1.0 (full volume), a velocity of 63 (half velocity) yields a gain of 0.5 (half volume), etc."
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="groupTuning"
                        name="groupTuning"
                        label="groupTuning"
                        type="number"
                        inputProps={{ step: "0.5" }}
                        defaultValue={groupItem.groupTuning}
                        fullWidth
                        helperText="Group-level pitch adjustment for changing note pitch. In semitones. For example 1.0 would be a half-step up and -1 would a half-step down. Default: 0"
                        variant="standard"
                    />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <TextField
                        margin="dense"
                        id="attack"
                        name="attack"
                        label="Attack"
                        type="number"
                        defaultValue={groupItem.attack}
                        fullWidth
                        helperText="The attack time in seconds of the amplitude envelope of this zone. This can also be set at the <sample> or <groups> levels."
                        variant="standard"
                    />
                </TabPanel>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}
