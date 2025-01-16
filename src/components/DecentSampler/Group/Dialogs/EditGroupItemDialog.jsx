// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { FormControl, FormControlLabel, FormHelperText, Icon, Switch } from "@mui/material";
import { Folder, FolderOff, MiscellaneousServices, SettingsInputSvideo, ShowChart } from "@mui/icons-material";

// Template
import { DefaultTextField } from "@/components/Template/DefaultTextField";
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import DefaultTagsField from "@/components/Template/DefaultTagsField";
import { DefaultSelectList } from "@/components/Template/DefaultSelectList";

// Data
import glideModes from "@/data/glideModes";
import triggerOptions from "@/data/trigger";

export function EditGroupItemDialog({ groupItem, open, onClose }) {
    const [enabled, setEnabled] = useState(groupItem.enabled !== "0");

    function handleEnabledOnChange(event) {
        setEnabled(event.target.checked);
        groupItem.enabled = event.target.checked ? "1" : "0";
    }

    function handleTagsOnChange(tags) {
        groupItem.tags = tags;
    }

    function getElementItemValue(name) {
        return groupItem?.[name] || "";
    }

    function setElementItemValue(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        groupItem[fieldName] = fieldValue;
    }

    const tabs = [
        {
            icon: <MiscellaneousServices />,
            label: "GENERAL",
            children: (
                <Fragment key="general-tab">
                    <FormControl margin="dense">
                        <FormControlLabel
                            value="1"
                            name="enabled"
                            control={
                                <Switch
                                    checked={enabled}
                                    onChange={handleEnabledOnChange}
                                    inputProps={{ "aria-label": "controlled" }}
                                    color="primary"
                                    sx={{ ml: 1 }}
                                />
                            }
                            label="Enabled"
                        />
                        <FormHelperText component="span" sx={{ display: "block" }}>
                            Whether or not this group is enabled. Possible values: true, false. Default: true
                        </FormHelperText>
                    </FormControl>
                    <DefaultTagsField
                        name="tags"
                        helperText="A comma-separated list of tags. Example: tags=”rt,mic1”. These are useful when controlling volumes using tags. See Appendix D."
                        getValue={getElementItemValue}
                        onChange={handleTagsOnChange}
                    />
                    <DefaultTextField
                        name="volume"
                        type="number"
                        inputProps={{ step: "0.1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The volume of the group. Value can be in linear 0.0-1.0 or in decibels. If it's in decibels you must append dB after the value (example: “3dB”). Default: 1.0"
                    />
                    <DefaultTextField
                        name="ampVelTrack"
                        label="Amplitude velocity tracking"
                        type="number"
                        inputProps={{ step: "0.01", min: "0", max: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The degree to which the velocity of the incoming notes affects the volume of the samples in this group. 0 = not at all. 1 = volume is completely determined by incoming velocity. When the value is 1, a velocity of 127 (max velocity) yields a gain 1.0 (full volume), a velocity of 63 (half velocity) yields a gain of 0.5 (half volume), etc."
                    />
                    <DefaultTextField
                        name="groupTuning"
                        label="Group tuning"
                        type="number"
                        inputProps={{ step: "0.5" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Group-level pitch adjustment for changing note pitch. In semitones. For example 1.0 would be a half-step up and -1 would a half-step down. Default: 0"
                    />

                    <DefaultTextField
                        name="glideTime"
                        label="Glide time"
                        type="number"
                        inputProps={{ step: "0.01", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The glide/portamento time in seconds. A value of 0.0 would mean no portamento. This value can also be set at the <group> and <sample> levels, although most people will want to set it globally at the <groups> level. Default: 0.0"
                    />
                    <DefaultSelectList
                        name="glideMode"
                        label="Glide mode"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={glideModes}
                        helperText="Controls the glide/portamento behavior. This value can also be set at the <group> and <sample> levels, although most people will want to set it globally at the <groups> level. Default: legato"
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
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The attack time in seconds of the amplitude envelope of this zone. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="decay"
                        type="number"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The decay time in seconds of the amplitude envelope of this zone. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="sustain"
                        type="number"
                        inputProps={{ step: "0.01", min: "0", max: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The sustain level (0.0 - 1.0) of the amplitude envelope of this zone. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="release"
                        type="number"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The release time in seconds of the amplitude envelope of this zone. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="attackCurve"
                        label="Attack curve"
                        type="number"
                        inputProps={{ step: "1", min: "-100", max: "100" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="A value from -100 to 100 that determines the shape of the attack curve. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="decayCurve"
                        label="Decay curve"
                        type="number"
                        inputProps={{ step: "1", min: "-100", max: "100" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="A value from -100 to 100 that determines the shape of the decay curve. This can also be set at the <sample> or <groups> levels."
                    />
                    <DefaultTextField
                        name="releaseCurve"
                        label="Release curve"
                        type="number"
                        inputProps={{ step: "1", min: "-100", max: "100" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="A value from -100 to 100 that determines the shape of the release curves. This can also be set at the <sample> or <groups> levels."
                    />
                </Fragment>
            )
        },
        {
            icon: <SettingsInputSvideo />,
            label: "MIDI",
            children: (
                <Fragment>
                    <DefaultSelectList
                        name="trigger"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={triggerOptions}
                    />
                    <DefaultTextField
                        name="loCCN"
                        label="Low CC number"
                        type="number"
                        inputProps={{ step: "1", min: "-1", max: "127" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText={`Use MIDI continuous controllers to filter whether or not a note should be played. This lets you, for example, have one set of samples that get played when the piano sustain pedal is down and another set that get played when it is up. Each time a MIDI CC value comes for a specific CC number, the engine stores that value. When a "note on" signal is received, the engine makes a decision (based on the last received value and the range defined by these attributes) about whether or not this sample should be played. If you use loCCN, you must also use a corresponding hiCCN for the same MIDI CC number so that you are defining a range of values. Example: loCC64="90" and hiCC64="127" would mean that a "note on" message will only trigger this sample if the last received value for CC64 (Sustain Pedal) is between 90 and 127. This can also be set at the <sample> level. Default:-1 (off)`}
                    />
                    <DefaultTextField
                        name="hiCCN"
                        label="High CC number"
                        type="number"
                        inputProps={{ step: "1", min: "-1", max: "127" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText={`Use MIDI continuous controllers to filter whether or not a note should be played. This lets you, for example, have one set of samples that get played when the piano sustain pedal is down and another set that get played when it is up. Each time a MIDI CC value comes for a specific CC number, the engine stores that value. When a "note on" signal is received, the engine makes a decision (based on the last received value and the range defined by these attributes) about whether or not this sample should be played. If you use hiCCN, you must also use a corresponding loCCN for the same MIDI CC number so that you are defining a range of values. Example: loCC64="90" and hiCC64="127" would mean that a "note on" message will only trigger this sample if the last received value for CC64 (Sustain Pedal) is between 90 and 127. This can also be set at the <sample> level. Default:-1 (off)`}
                    />
                    <DefaultTextField
                        name="onLoCCN"
                        label="On low CC number"
                        type="number"
                        inputProps={{ step: "1", min: "-1", max: "127" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText={`If you want a sample to be triggered when a MIDI CC controller message comes in, for example for sustain pedal down and pedal up samples, you use these attributes to specify the range of values that should trigger the sample. If you use onLoCCN, you must also use a corresponding onHiCCN for the same MIDI CC number. Example: onLoCC64="90" and onHiCC64="127" would mean that values of CC64 (Sustain Pedal) between 90 and 127 will trigger the given sample. This can also be set at the <group> level. Default:-1 (off)`}
                    />
                    <DefaultTextField
                        name="onHiCCN"
                        label="On high CC number"
                        type="number"
                        inputProps={{ step: "1", min: "-1", max: "127" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText={`If you want a sample to be triggered when a MIDI CC controller message comes in, for example for sustain pedal down and pedal up samples, you use these attributes to specify the range of values that should trigger the sample. If you use onHiCCN, you must also use a corresponding onLoCCN for the same MIDI CC number. Example: onLoCC64="90" and onHiCC64="127" would mean that values of CC64 (Sustain Pedal) between 90 and 127 will trigger the given sample. This can also be set at the <group> level. Default:-1 (off)`}
                    />
                </Fragment>
            )
        }
    ];

    const dialogIcon = <Icon>{enabled ? <Folder /> : <FolderOff />}</Icon>;
    const dialogTitle = "Edit group";
    return (
        !!groupItem && (
            <DefaultItemDialog
                elementItem={groupItem}
                dialogIcon={dialogIcon}
                dialogTitle={dialogTitle}
                contentHeight="564px"
                tabs={tabs}
                open={open}
                onClose={onClose}
            />
        )
    );
}
