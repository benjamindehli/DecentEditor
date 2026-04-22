// Dependencies
import { Fragment } from "react";

// Material UI
import { BurstMode, MiscellaneousServices, Straighten } from "@mui/icons-material";

// Template
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import { DefaultTextField } from "@/components/Template/DefaultTextField";
import { DefaultSelectList } from "@/components/Template/DefaultSelectList";

const sourceFormatOptions = [
    { value: "horizontal_image_strip", label: "Horizontal image strip" },
    { value: "vertical_image_strip", label: "Vertical image strip" }
];

const playbackModeOptions = [
    { value: "forward_loop", label: "Forward loop" },
    { value: "forward_once", label: "Forward once" },
    { value: "reverse_loop", label: "Reverse loop" },
    { value: "reverse_once", label: "Reverse once" },
    { value: "ping_pong_loop", label: "Ping pong loop" },
    { value: "stopped", label: "Stopped" }
];

export function EditMultiFrameImageItemDialog({ multiFrameImageItem, open, onClose }) {
    function getElementItemValue(name) {
        return multiFrameImageItem?.[name] ?? "";
    }

    function setElementItemValue(event) {
        multiFrameImageItem[event.target.name] = event.target.value;
    }

    const tabs = [
        {
            icon: <MiscellaneousServices />,
            label: "GENERAL",
            children: (
                <Fragment key="general-tab">
                    <DefaultTextField
                        name="path"
                        label="Image path"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Relative path to the image strip file."
                    />
                    <DefaultTextField
                        name="numFrames"
                        label="Number of frames"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The number of animation frames in the image strip."
                    />
                    <DefaultTextField
                        name="frameRate"
                        label="Frame rate"
                        type="number"
                        inputProps={{ step: "1", min: "1", max: "24" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Animation speed in frames per second. Maximum: 24."
                    />
                    <DefaultSelectList
                        name="sourceFormat"
                        label="Source format"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={sourceFormatOptions}
                        helperText="Orientation of frames within the image strip."
                    />
                    <DefaultSelectList
                        name="playbackMode"
                        label="Playback mode"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={playbackModeOptions}
                        helperText="Direction in which the animation plays. Default: forward_loop."
                    />
                    <DefaultTextField
                        name="opacity"
                        label="Opacity"
                        type="number"
                        inputProps={{ step: "0.1", min: "0", max: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Opacity of the animation. Range: 0–1. Default: 1."
                    />
                    <DefaultTextField
                        name="tags"
                        label="Tags"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Comma-separated list of tags for use with bindings."
                    />
                    <DefaultTextField
                        name="tooltip"
                        label="Tooltip"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Text shown when the user hovers over this element."
                    />
                </Fragment>
            )
        },
        {
            icon: <Straighten />,
            label: "POSITION",
            children: (
                <Fragment key="position-tab">
                    <DefaultTextField
                        name="x"
                        label="X position"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Horizontal position in pixels."
                    />
                    <DefaultTextField
                        name="y"
                        label="Y position"
                        type="number"
                        inputProps={{ step: "1", min: "0" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Vertical position in pixels."
                    />
                    <DefaultTextField
                        name="width"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Width in pixels."
                    />
                    <DefaultTextField
                        name="height"
                        type="number"
                        inputProps={{ step: "1", min: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="Height in pixels."
                    />
                </Fragment>
            )
        }
    ];

    const dialogIcon = <BurstMode />;
    const dialogTitle = "Edit multi-frame image";

    return (
        !!multiFrameImageItem && (
            <DefaultItemDialog
                elementItem={multiFrameImageItem}
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
