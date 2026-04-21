// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { AudioFile, FolderOff, MiscellaneousServices, RestorePage, SettingsInputSvideo, ShowChart, Speaker } from "@mui/icons-material";
import { FormControl, FormControlLabel, FormHelperText, Icon, Switch } from "@mui/material";

// Template
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import { DefaultTextField } from "@/components/Template/DefaultTextField";
import { DefaultSelectList } from "@/components/Template/DefaultSelectList";
import DefaultTagsField from "@/components/Template/DefaultTagsField";

// Data
import glideModes from "@/data/glideModes";
import triggerOptions from "@/data/trigger";

const loopCrossfadeModeOptions = [
    { value: "linear", label: "Linear" },
    { value: "equal_power", label: "Equal power" }
];

const playbackModeOptions = [
    { value: "memory", label: "Memory" },
    { value: "disk_streaming", label: "Disk streaming" },
    { value: "auto", label: "Auto" }
];

const seqModeOptions = [
    { value: "random", label: "Random" },
    { value: "true_random", label: "True random" },
    { value: "round_robin", label: "Round robin" },
    { value: "always", label: "Always" }
];

const silencingModeOptions = [
    { value: "fast", label: "Fast" },
    { value: "normal", label: "Normal" }
];

export function EditSampleItemDialog({ sampleItem, open, onClose }) {
    const [loopEnabled, setLoopEnabled] = useState(sampleItem.loopEnabled === "1");

    function handleLoopEnabledOnChange(event) {
        setLoopEnabled(event.target.checked);
        sampleItem.loopEnabled = event.target.checked ? "1" : "0";
    }

    function getElementItemValue(name) {
        return sampleItem?.[name] ?? "";
    }

    function setElementItemValue(event) {
        sampleItem[event.target.name] = event.target.value;
    }

    function handleTagsOnChange(tags) {
        sampleItem.tags = tags;
    }

    const tabs = [
        {
            icon: <MiscellaneousServices />,
            label: "GENERAL",
            children: (
                <Fragment key="general-tab">
                    <DefaultTextField
                        name="path"
                        label="File path"
                        autoFocus
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The path to the sample file, relative to the preset file."
                    />
                    <DefaultTextField
                        name="rootNote"
                        label="Root note"
                        type="number"
                        inputProps={{ step: "1", min: "0", max: "127" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The MIDI note number (0–127) that this sample was recorded at. Default: 60 (middle C)."
                    />
                    <DefaultTextField
                        name="loNote"
                        label="Low note"
                        type="number"
                        inputProps={{ step: "1", min: "0", max: "127" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The lowest MIDI note (0–127) that will trigger this sample. Default: 0."
                    />
                    <DefaultTextField
                        name="hiNote"
                        label="High note"
                        type="number"
                        inputProps={{ step: "1", min: "0", max: "127" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The highest MIDI note (0–127) that will trigger this sample. Default: 127."
                    />
                    <DefaultTextField
                        name="loVel"
                        label="Low velocity"
                        type="number"
                        inputProps={{ step: "1", min: "0", max: "127" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The lowest MIDI velocity (0–127) that will trigger this sample. Default: 0."
                    />
                    <DefaultTextField
                        name="hiVel"
                        label="High velocity"
                        type="number"
                        inputProps={{ step: "1", min: "0", max: "127" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The highest MIDI velocity (0–127) that will trigger this sample. Default: 127."
                    />
                    <DefaultTextField
                        name="volume"
                        type="number"
                        inputProps={{ step: "0.1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The volume of this sample (0.0–1.0 linear, or dB value like '3dB'). Default: 1.0."
                    />
                    <DefaultTextField
                        name="pan"
                        type="number"
                        inputProps={{ step: "1", min: "-100", max: "100" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The panning of this sample (-100 = full left, 100 = full right). Default: 0."
                    />
                    <DefaultTextField
                        name="tuning"
                        type="number"
                        inputProps={{ step: "0.01" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Fine tuning in semitones. Default: 0."
                    />
                    <DefaultSelectList
                        name="trigger"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={triggerOptions}
                        helperText="When this sample is triggered. Default: attack."
                    />
                    <DefaultTagsField
                        name="tags"
                        helperText="A comma-separated list of tags used for volume control or voice muting."
                        getValue={getElementItemValue}
                        onChange={handleTagsOnChange}
                    />
                    <DefaultSelectList
                        name="playbackMode"
                        label="Playback mode"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={playbackModeOptions}
                        helperText="Controls how the sample is loaded into memory. Default: auto."
                    />
                </Fragment>
            )
        },
        {
            icon: <RestorePage />,
            label: "LOOPING",
            children: (
                <Fragment key="looping-tab">
                    <FormControl margin="dense">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={loopEnabled}
                                    onChange={handleLoopEnabledOnChange}
                                    color="primary"
                                    sx={{ ml: 1 }}
                                />
                            }
                            label="Loop enabled"
                        />
                        <FormHelperText component="span" sx={{ display: "block" }}>
                            Whether or not looping is enabled for this sample.
                        </FormHelperText>
                    </FormControl>
                    <DefaultTextField
                        name="loopStart"
                        label="Loop start"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The sample position (in samples) where looping begins. Default: 0."
                    />
                    <DefaultTextField
                        name="loopEnd"
                        label="Loop end"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The sample position (in samples) where looping ends."
                    />
                    <DefaultTextField
                        name="loopCrossfade"
                        label="Loop crossfade"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The length of the crossfade (in samples) at the loop point. Default: 0."
                    />
                    <DefaultSelectList
                        name="loopCrossfadeMode"
                        label="Loop crossfade mode"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={loopCrossfadeModeOptions}
                        helperText="The crossfade curve shape. Default: linear."
                    />
                </Fragment>
            )
        },
        {
            icon: <ShowChart />,
            label: "ENVELOPE",
            children: (
                <Fragment key="envelope-tab">
                    <DefaultTextField
                        name="attack"
                        type="number"
                        inputProps={{ step: "0.01", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Attack time in seconds. Default: 0."
                    />
                    <DefaultTextField
                        name="decay"
                        type="number"
                        inputProps={{ step: "0.01", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Decay time in seconds. Default: 0."
                    />
                    <DefaultTextField
                        name="sustain"
                        type="number"
                        inputProps={{ step: "0.01", min: "0", max: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Sustain level (0.0–1.0). Default: 1."
                    />
                    <DefaultTextField
                        name="release"
                        type="number"
                        inputProps={{ step: "0.01", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Release time in seconds. Default: 0."
                    />
                    <DefaultTextField
                        name="attackCurve"
                        label="Attack curve"
                        type="number"
                        inputProps={{ step: "1", min: "-100", max: "100" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Shape of the attack curve (-100 to 100). Default: 0."
                    />
                    <DefaultTextField
                        name="decayCurve"
                        label="Decay curve"
                        type="number"
                        inputProps={{ step: "1", min: "-100", max: "100" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Shape of the decay curve (-100 to 100). Default: 0."
                    />
                    <DefaultTextField
                        name="releaseCurve"
                        label="Release curve"
                        type="number"
                        inputProps={{ step: "1", min: "-100", max: "100" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Shape of the release curve (-100 to 100). Default: 0."
                    />
                </Fragment>
            )
        },
        {
            icon: <SettingsInputSvideo />,
            label: "MIDI / SEQ",
            children: (
                <Fragment key="midi-tab">
                    <DefaultTextField
                        name="seqPosition"
                        label="Round-robin position"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The position of this sample in the round-robin sequence (1-based). Default: 1."
                    />
                    <DefaultSelectList
                        name="seqMode"
                        label="Sequence mode"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={seqModeOptions}
                        helperText="How round-robin samples are cycled. Default: round_robin."
                    />
                    <DefaultTextField
                        name="seqLength"
                        label="Sequence length"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The total number of samples in the round-robin group."
                    />
                    <DefaultSelectList
                        name="glideMode"
                        label="Glide mode"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={glideModes}
                        helperText="Portamento behavior. Default: legato."
                    />
                    <DefaultTextField
                        name="glideTime"
                        label="Glide time"
                        type="number"
                        inputProps={{ step: "0.01", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Portamento time in seconds. Default: 0."
                    />
                </Fragment>
            )
        },
        {
            icon: <Speaker />,
            label: "VOICE",
            children: (
                <Fragment key="voice-tab">
                    <DefaultTextField
                        name="silencedByTags"
                        label="Silenced by tags"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="A comma-separated list of tags. When a note with any of these tags starts, this sample will be silenced."
                    />
                    <DefaultSelectList
                        name="silencingMode"
                        label="Silencing mode"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={silencingModeOptions}
                        helperText="How quickly the silencing happens. Default: normal."
                    />
                    <DefaultTextField
                        name="previousNotes"
                        label="Previous notes"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="A comma-separated list of note numbers. This sample will only trigger as a legato note if the previously held note is in this list."
                    />
                    <DefaultTextField
                        name="legatoInterval"
                        label="Legato interval"
                        type="number"
                        inputProps={{ step: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="A specific interval (in semitones) for legato triggering."
                    />
                </Fragment>
            )
        }
    ];

    const dialogIcon = <Icon>{loopEnabled ? <RestorePage /> : <AudioFile />}</Icon>;
    const dialogTitle = "Edit sample";

    return (
        !!sampleItem && (
            <DefaultItemDialog
                elementItem={sampleItem}
                dialogIcon={dialogIcon}
                dialogTitle={dialogTitle}
                contentHeight="540px"
                tabs={tabs}
                open={open}
                onClose={onClose}
            />
        )
    );
}
