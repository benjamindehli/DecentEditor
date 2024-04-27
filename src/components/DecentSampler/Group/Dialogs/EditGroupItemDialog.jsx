// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { FormControlLabel, FormHelperText, Icon, Switch } from "@mui/material";
import { Folder, FolderOff, MiscellaneousServices, SettingsInputSvideo, ShowChart } from "@mui/icons-material";

// Template
import { DefaultTextField } from "@/components/Template/DefaultTextField";
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import DefaultTagsField from "@/components/Template/DefaultTagsField";

export function EditGroupItemDialog({ groupItem, open, onClose }) {
    const [enabled, setEnabled] = useState(groupItem.enabled !== "0");
    const [tags, setTags] = useState(groupItem.tags);

    function handleTagsOnChange(tags) {
        setTags(tags);
    }

    const tabs = [
        {
            icon: <MiscellaneousServices />,
            label: "GENERAL",
            children: (
                <Fragment>
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
                        label="Enabled"
                    />
                    <FormHelperText component="span" sx={{ display: "block" }}>
                        Whether or not this group is enabled. Possible values: true, false. Default: true
                    </FormHelperText>
                    <DefaultTagsField
                        name="tags"
                        defaultValue={groupItem.tags}
                        helperText="A comma-separated list of tags. Example: tags=”rt,mic1”. These are useful when controlling volumes using tags. See Appendix D."
                        onChange={handleTagsOnChange}
                    />
                    <DefaultTextField
                        name="volume"
                        type="number"
                        inputProps={{ step: "0.1", min: "0" }}
                        defaultValue={groupItem.volume}
                        helperText="The volume of the group. Value can be in linear 0.0-1.0 or in decibels. If it’s in decibels you must append dB after the value (example: “3dB”). Default: 1.0"
                    />
                    <DefaultTextField
                        name="ampVelTrack"
                        label="Amplitude velocity tracking"
                        type="number"
                        inputProps={{ step: "0.01", min: "0", max: "1" }}
                        defaultValue={groupItem.ampVelTrack}
                        helperText="The degree to which the velocity of the incoming notes affects the volume of the samples in this group. 0 = not at all. 1 = volume is completely determined by incoming velocity. When the value is 1, a velocity of 127 (max velocity) yields a gain 1.0 (full volume), a velocity of 63 (half velocity) yields a gain of 0.5 (half volume), etc."
                    />
                    <DefaultTextField
                        name="groupTuning"
                        label="Group tuning"
                        type="number"
                        inputProps={{ step: "0.5" }}
                        defaultValue={groupItem.groupTuning}
                        helperText="Group-level pitch adjustment for changing note pitch. In semitones. For example 1.0 would be a half-step up and -1 would a half-step down. Default: 0"
                    />
                </Fragment>
            )
        },
        {
            icon: <ShowChart />,
            label: "ENVELOPE",
            children: (
                <Fragment>
                    <DefaultTextField
                        name="attack"
                        type="number"
                        defaultValue={groupItem.attack}
                        helperText="The attack time in seconds of the amplitude envelope of this zone. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="decay"
                        type="number"
                        defaultValue={groupItem.decay}
                        helperText="The decay time in seconds of the amplitude envelope of this zone. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="sustain"
                        type="number"
                        inputProps={{ step: "0.01", min: "0", max: "1" }}
                        defaultValue={groupItem.sustain}
                        helperText="The sustain level (0.0 - 1.0) of the amplitude envelope of this zone. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="release"
                        type="number"
                        defaultValue={groupItem.release}
                        helperText="The release time in seconds of the amplitude envelope of this zone. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="attackCurve"
                        label="Attack curve"
                        type="number"
                        inputProps={{ step: "1", min: "-100", max: "100" }}
                        defaultValue={groupItem.attackCurve}
                        helperText="A value from -100 to 100 that determines the shape of the attack curve. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="decayCurve"
                        label="Decay curve"
                        type="number"
                        inputProps={{ step: "1", min: "-100", max: "100" }}
                        defaultValue={groupItem.decayCurve}
                        helperText="A value from -100 to 100 that determines the shape of the decay curve. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="releaseCurve"
                        label="Release curve"
                        type="number"
                        inputProps={{ step: "1", min: "-100", max: "100" }}
                        defaultValue={groupItem.decayCurve}
                        helperText="A value from -100 to 100 that determines the shape of the release curves. This can also be set at the <sample> or <groups> levels."
                    />
                </Fragment>
            )
        },
        {
            icon: <SettingsInputSvideo />,
            label: "MIDI",
            children: <Fragment>Midi test</Fragment>
        }
    ];

    function onSubmit(event) {
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        groupItem.enabled = enabled ? "1" : "0";
        groupItem.tags = tags;
        groupItem.volume = formJson.volume;
        groupItem.ampVelTrack = formJson.ampVelTrack;
        groupItem.groupTuning = formJson.groupTuning;

        groupItem.attack = formJson.attack;
        groupItem.decay = formJson.decay;
        groupItem.sustain = formJson.sustain;
        groupItem.release = formJson.release;
        groupItem.attackCurve = formJson.attackCurve;
        groupItem.decayCurve = formJson.decayCurve;
        groupItem.releaseCurve = formJson.releaseCurve;
    }

    const dialogIcon = <Icon>{enabled ? <Folder /> : <FolderOff />}</Icon>;

    const dialogTitle = "Edit group";

    return (
        <DefaultItemDialog
            elementItem={groupItem}
            dialogIcon={dialogIcon}
            dialogTitle={dialogTitle}
            tabs={tabs}
            open={open}
            onClose={onClose}
            onSubmit={onSubmit}
        />
    );
}
