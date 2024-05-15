const controllableParametersData = [
    {
        description: "Unselected",
    },
    {
        description: "Global Volume",
        type: "amp",
        level: "instrument",
        parameter: "AMP_VOLUME",
        inputProps: {
            min: "0",
            max: "16",
            step: "0.1",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Global Tuning",
        type: "amp",
        level: "instrument",
        parameter: "GLOBAL_TUNING",
        inputProps: {
            min: "-36",
            max: "36",
            step: "0.1",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Global Pan",
        type: "amp",
        level: "instrument",
        parameter: "PAN",
        inputProps: {
            min: "-100",
            max: "100",
            step: "1",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Sample Start",
        type: "general",
        level: "instrument",
        parameter: "SAMPLE_START",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Sample Start",
        type: "general",
        level: "group",
        parameter: "SAMPLE_START",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Sample End",
        type: "general",
        level: "instrument",
        parameter: "SAMPLE_END",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Sample End",
        type: "general",
        level: "group",
        parameter: "SAMPLE_END",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Loop Start",
        type: "general",
        level: "instrument",
        parameter: "LOOP_START",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Loop Start",
        type: "general",
        level: "group",
        parameter: "LOOP_START",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Loop End",
        type: "general",
        level: "instrument",
        parameter: "LOOP_END",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Loop End",
        type: "general",
        level: "group",
        parameter: "LOOP_END",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Amplitude Velocity Tracking",
        type: "amp",
        level: "instrument",
        parameter: "AMP_VEL_TRACK",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Global Amp Envelope Attack",
        type: "amp",
        level: "instrument",
        parameter: "ENV_ATTACK",
        inputProps: {
            min: "0",
            max: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Global Amp Envelope Attack Curve Shape",
        type: "amp",
        level: "instrument",
        parameter: "ENV_ATTACK_CURVE",
        inputProps: {
            min: "-100",
            max: "100",
            step: "1",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Global Amp Envelope Decay",
        type: "amp",
        level: "instrument",
        parameter: "ENV_DECAY",
        inputProps: {
            min: "0",
            max: "25",
            step: "0.01",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Global Amp Envelope Decay Curve Shape",
        type: "amp",
        level: "instrument",
        parameter: "ENV_DECAY_CURVE",
        inputProps: {
            min: "-100",
            max: "100",
            step: "1",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Global Amp Envelope Sustain",
        type: "amp",
        level: "instrument",
        parameter: "ENV_SUSTAIN",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Global Amp Envelope Release",
        type: "amp",
        level: "instrument",
        parameter: "ENV_RELEASE",
        inputProps: {
            min: "0",
            max: "25",
            step: "0.01",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Global Amp Envelope Release Curve Shape",
        type: "amp",
        level: "instrument",
        parameter: "ENV_RELEASE_CURVE",
        inputProps: {
            min: "-100",
            max: "100",
            step: "1",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Glide/Portamento Time",
        type: "amp",
        level: "instrument",
        parameter: "GLIDE_TIME",
        inputProps: {
            min: "0",
            max: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: false
    },
    {
        description: "Effect Enabled",
        type: "effect",
        level: "instrument",
        parameter: "ENABLED",
        inputProps: {
            type: "boolean"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Convolution Mix Level",
        type: "effect",
        level: "instrument",
        parameter: "FX_MIX",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Convolution IR File",
        type: "effect",
        level: "instrument",
        parameter: "FX_IR_FILE",
        inputProps: {
            type: "text"
        },
        modulatable: false,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Filter Frequency (for several filters)",
        type: "effect",
        level: "instrument",
        parameter: "FX_FILTER_FREQUENCY",
        inputProps: {
            min: "0",
            max: "22000",
            step: "1",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Peak or Notch Filter Q",
        type: "effect",
        level: "instrument",
        parameter: "FX_FILTER_Q",
        inputProps: {
            min: "0.01",
            max: "18",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Peak or Notch Filter Gain",
        type: "effect",
        level: "instrument",
        parameter: "FX_FILTER_GAIN",
        inputProps: {
            min: "0",
            max: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Low-pass or High-pass Filter Resonance",
        type: "effect",
        level: "instrument",
        parameter: "FX_FILTER_RESONANCE",
        inputProps: {
            min: "0",
            max: "5",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Reverb Wet Level",
        type: "effect",
        level: "instrument",
        parameter: "FX_REVERB_WET_LEVEL",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Reverb Room Size",
        type: "effect",
        level: "instrument",
        parameter: "FX_REVERB_ROOM_SIZE",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Reverb Damping",
        type: "effect",
        level: "instrument",
        parameter: "FX_REVERB_DAMPING",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Chorus/Phaser/Convolution Mix Level",
        type: "effect",
        level: "instrument",
        parameter: "FX_MIX",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Chorus/Phaser Mod Depth",
        type: "effect",
        level: "instrument",
        parameter: "FX_MOD_DEPTH",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Chorus/Phaser Mod Rate",
        type: "effect",
        level: "instrument",
        parameter: "FX_MOD_RATE",
        inputProps: {
            min: "0",
            max: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Phaser Center Frequency",
        type: "effect",
        level: "instrument",
        parameter: "FX_CENTER_FREQUENCY",
        inputProps: {
            min: "0",
            max: "22000",
            step: "1",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Phaser/Delay Feedback",
        type: "effect",
        level: "instrument",
        parameter: "FX_FEEDBACK",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Delay Time",
        type: "effect",
        level: "instrument",
        parameter: "FX_DELAY_TIME",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Delay Time Format",
        type: "effect",
        level: "instrument",
        parameter: "FX_DELAY_TIME_FORMAT",
        inputProps: {
            type: "select",
            options: [
                { label: "Seconds", value: "seconds" },
                { label: "Musical time", value: "musical_time" }
            ]
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Delay Stereo Offset",
        type: "effect",
        level: "instrument",
        parameter: "FX_STEREO_OFFSET",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Delay Wet Level",
        type: "effect",
        level: "instrument",
        parameter: "FX_WET_LEVEL",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Gain Level",
        type: "effect",
        level: "instrument",
        parameter: "LEVEL",
        inputProps: {
            min: "0",
            max: "8",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Wave Folder Drive Level",
        type: "effect",
        level: "instrument",
        parameter: "FX_DRIVE",
        inputProps: {
            min: "1",
            max: "100",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Wave Folder Threshold",
        type: "effect",
        level: "instrument",
        parameter: "FX_THRESHOLD",
        inputProps: {
            min: "0.1",
            max: "100",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Wave Shaper Drive Level",
        type: "effect",
        level: "instrument",
        parameter: "FX_DRIVE",
        inputProps: {
            min: "0",
            max: "1000",
            step: "1",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Wave Shaper Output Level",
        type: "effect",
        level: "instrument",
        parameter: "FX_OUTPUT_LEVEL",
        inputProps: {
            min: "0",
            max: "8",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Wave Shaper Drive Boost",
        type: "effect",
        level: "instrument",
        parameter: "FX_DRIVE_BOOST",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex"]
    },
    {
        description: "Effect Enabled",
        type: "effect",
        level: "group",
        parameter: "ENABLED",
        inputProps: {
            type: "boolean"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Convolution Mix Level",
        type: "effect",
        level: "group",
        parameter: "FX_MIX",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Convolution IR File",
        type: "effect",
        level: "group",
        parameter: "FX_IR_FILE",
        inputProps: {
            type: "text"
        },
        modulatable: false,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Filter Frequency (for several filters)",
        type: "effect",
        level: "group",
        parameter: "FX_FILTER_FREQUENCY",
        inputProps: {
            min: "0",
            max: "22000",
            step: "1",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Peak or Notch Filter Q",
        type: "effect",
        level: "group",
        parameter: "FX_FILTER_Q",
        inputProps: {
            min: "0.01",
            max: "18",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Peak or Notch Filter Gain",
        type: "effect",
        level: "group",
        parameter: "FX_FILTER_GAIN",
        inputProps: {
            min: "0",
            max: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Low-pass or High-pass Filter Resonance",
        type: "effect",
        level: "group",
        parameter: "FX_FILTER_RESONANCE",
        inputProps: {
            min: "0",
            max: "5",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Reverb Wet Level",
        type: "effect",
        level: "group",
        parameter: "FX_REVERB_WET_LEVEL",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Reverb Room Size",
        type: "effect",
        level: "group",
        parameter: "FX_REVERB_ROOM_SIZE",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Reverb Damping",
        type: "effect",
        level: "group",
        parameter: "FX_REVERB_DAMPING",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Chorus/Phaser/Convolution Mix Level",
        type: "effect",
        level: "group",
        parameter: "FX_MIX",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Chorus/Phaser Mod Depth",
        type: "effect",
        level: "group",
        parameter: "FX_MOD_DEPTH",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Chorus/Phaser Mod Rate",
        type: "effect",
        level: "group",
        parameter: "FX_MOD_RATE",
        inputProps: {
            min: "0",
            max: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Phaser Center Frequency",
        type: "effect",
        level: "group",
        parameter: "FX_CENTER_FREQUENCY",
        inputProps: {
            min: "0",
            max: "22000",
            step: "1",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Phaser/Delay Feedback",
        type: "effect",
        level: "group",
        parameter: "FX_FEEDBACK",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Delay Time",
        type: "effect",
        level: "group",
        parameter: "FX_DELAY_TIME",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Delay Time Format",
        type: "effect",
        level: "group",
        parameter: "FX_DELAY_TIME_FORMAT",
        inputProps: {
            type: "select",
            options: [
                {
                    label: "Seconds",
                    value: "seconds"
                },
                {
                    label: "Musical time",
                    value: "musical_time"
                }
            ]
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Delay Stereo Offset",
        type: "effect",
        level: "group",
        parameter: "FX_STEREO_OFFSET",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Delay Wet Level",
        type: "effect",
        level: "group",
        parameter: "FX_WET_LEVEL",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Gain Level",
        type: "effect",
        level: "group",
        parameter: "LEVEL",
        inputProps: {
            min: "0",
            max: "8",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Wave Folder Drive Level",
        type: "effect",
        level: "group",
        parameter: "FX_DRIVE",
        inputProps: {
            min: "1",
            max: "100",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Wave Folder Threshold",
        type: "effect",
        level: "group",
        parameter: "FX_THRESHOLD",
        inputProps: {
            min: "0.1",
            max: "100",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Wave Shaper Drive Level",
        type: "effect",
        level: "group",
        parameter: "FX_DRIVE",
        inputProps: {
            min: "0",
            max: "1000",
            step: "1",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Wave Shaper Output Level",
        type: "effect",
        level: "group",
        parameter: "FX_OUTPUT_LEVEL",
        inputProps: {
            min: "0",
            max: "8",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Wave Shaper Drive Boost",
        type: "effect",
        level: "group",
        parameter: "FX_DRIVE_BOOST",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["effectIndex", "groupIndex"]
    },
    {
        description: "Group Enabled / Disabled",
        type: "amp",
        level: "group",
        parameter: "ENABLED",
        inputProps: {
            type: "boolean"
        },
        modulatable: false,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Group Enabled / Disabled",
        type: "general",
        level: "group",
        parameter: "ENABLED",
        inputProps: {
            type: "boolean"
        },
        modulatable: false,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Group Volume",
        type: "amp",
        level: "group",
        parameter: "AMP_VOLUME",
        inputProps: {
            min: "0",
            max: "16",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Group Tuning",
        type: "amp",
        level: "group",
        parameter: "GROUP_TUNING",
        inputProps: {
            min: "-36",
            max: "36",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Pan",
        type: "amp",
        level: "group",
        parameter: "PAN",
        inputProps: {
            min: "-100",
            max: "100",
            step: "1",
            type: "number"
        },
        modulatable: true,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Amplitude Velocity Tracking",
        type: "amp",
        level: "group",
        parameter: "AMP_VEL_TRACK",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Group Amp Envelope Attack",
        type: "amp",
        level: "group",
        parameter: "ENV_ATTACK",
        inputProps: {
            min: "0",
            max: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Group Amp Envelope Decay",
        type: "amp",
        level: "group",
        parameter: "ENV_DECAY",
        inputProps: {
            min: "0",
            max: "25",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Group Amp Envelope Sustain",
        type: "amp",
        level: "group",
        parameter: "ENV_SUSTAIN",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Group Amp Envelope Release",
        type: "amp",
        level: "group",
        parameter: "ENV_RELEASE",
        inputProps: {
            min: "0",
            max: "25",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Group Glide/Portamento Time",
        type: "amp",
        level: "group",
        parameter: "GLIDE_TIME",
        inputProps: {
            min: "0",
            max: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["groupIndex"]
    },
    {
        description: "Tag Enabled",
        type: "amp",
        level: "tag",
        parameter: "TAG_ENABLED",
        inputProps: {
            type: "boolean"
        },
        modulatable: false,
        additionalParams: ["identifier"]
    },
    {
        description: "Tag Volume",
        type: "amp",
        level: "tag",
        parameter: "TAG_VOLUME",
        inputProps: {
            min: "0",
            max: "16",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["identifier"]
    },
    {
        description: "MIDI Note Mapping Enabled",
        type: "note",
        level: "midi",
        parameter: "ENABLED",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["noteIndex"]
    },
    {
        description: "MIDI Note Binding Enabled",
        type: "note_binding",
        level: "midi",
        parameter: "ENABLED",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["noteIndex", "bindingIndex"]
    },
    {
        description: "MIDI Note Binding Change",
        secondaryDescription: "seqIndex",
        type: "note_binding",
        level: "midi",
        parameter: "SEQ_INDEX",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["noteIndex", "bindingIndex"],
        helperText: "A 0-based index of a sequence underneath the <noteSequences> section"
    },
    {
        description: "MIDI Note Binding Change",
        secondaryDescription: "seqLoopMode",
        type: "note_binding",
        level: "midi",
        parameter: "SEQ_LOOP_MODE",
        inputProps: {
            type: "select",
            options: [
                { label: "Forward", value: "forward" },
                { label: "Reverse", value: "reverse" },
                { label: "Random", value: "random" },
                { label: "Random (no repeat)", value: "random_no_repeat" },
                { label: "No loop", value: "no_loop" }
            ]
        },
        modulatable: false,
        additionalParams: ["noteIndex", "bindingIndex"]
    },
    {
        description: "MIDI Note Binding Change",
        secondaryDescription: "seqTransposeWithRootNote",
        type: "note_binding",
        level: "midi",
        parameter: "SEQ_TRANSPOSE_WITH_ROOT_NOTE",
        inputProps: {
            min: "0",
            max: "127",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["noteIndex", "bindingIndex"],
        helperText:
            "Transpose the notes in the sequence relative to the pitch of the incoming MIDI note. This can only be used when the sequence is being triggered by a MIDI note binding. Value should be a floating point number from 0 to 127."
    },
    {
        description: "MIDI Note Binding Change",
        secondaryDescription: "seqPlaybackRate",
        type: "note_binding",
        level: "midi",
        parameter: "SEQ_PLAYBACK_RATE",
        inputProps: {
            min: "0.001",
            max: "10000",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["noteIndex", "bindingIndex"],
        helperText: "The speed of playback. Value should be a floating point number from 0.001 to 10000."
    },
    {
        description: "MIDI Note Binding Change",
        secondaryDescription: "seqTrackMidiInputVelocity",
        type: "note_binding",
        level: "midi",
        parameter: "SEQ_TRACK_MIDI_INPUT_VELOCITY",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["noteIndex", "bindingIndex"],
        helperText:
            "Whether or not the sequence should respect the velocity of the incoming MIDI note. This can only be used when the sequence is being triggered by a MIDI note binding. Value should be a floating point number from 0.0 to 1."
    },
    {
        description: "MIDI Note Binding Change",
        secondaryDescription: "seqTranspose",
        type: "note_binding",
        level: "midi",
        parameter: "SEQ_TRANSPOSE",
        inputProps: {
            min: "-36",
            max: "36",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["noteIndex", "bindingIndex"],
        helperText:
            "Transpose the notes in the sequence by an arbitrary number of half steps. Value should be a floating point number from -36 to 36."
    },
    {
        description: "MIDI Velocity Binding Enabled",
        type: "velocity_binding",
        level: "midi",
        parameter: "ENABLED",
        inputProps: {
            min: "0",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["bindingIndex"]
    },
    {
        description: "UI Button State Binding Enabled",
        type: "button_state_binding",
        level: "ui",
        parameter: "ENABLED",
        inputProps: {
            type: "boolean"
        },
        modulatable: false,
        additionalParams: ["controlIndex", "stateIndex", "bindingIndex"]
    },
    {
        description: "UI Control Enabled",
        type: "control",
        level: "ui",
        parameter: "ENABLED",
        inputProps: {
            type: "boolean"
        },
        modulatable: false,
        additionalParams: ["controlIndex"]
    },
    {
        description: "UI Control Visibile",
        type: "control",
        level: "ui",
        parameter: "VISIBLE",
        inputProps: {
            type: "boolean"
        },
        modulatable: false,
        additionalParams: ["controlIndex"]
    },
    {
        description: "UI Control Value",
        type: "control",
        level: "ui",
        parameter: "VALUE",
        inputProps: {
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["controlIndex"]
    },
    {
        description: "UI Control Text",
        type: "control",
        level: "ui",
        parameter: "TEXT",
        inputProps: {
            type: "text"
        },
        modulatable: false,
        additionalParams: ["controlIndex"]
    },
    {
        description: "UI Control Minimum Value",
        type: "control",
        level: "ui",
        parameter: "MIN_VALUE",
        inputProps: {
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["controlIndex"]
    },
    {
        description: "UI Control Maximum Value",
        type: "control",
        level: "ui",
        parameter: "MAX_VALUE",
        inputProps: {
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["controlIndex"]
    },
    {
        description: "UI Control Value Type",
        type: "control",
        level: "ui",
        parameter: "VALUE_TYPE",
        inputProps: {
            type: "select",
            options: [
                { label: "Float", value: "float" },
                { label: "Integer", value: "integer" },
                { label: "Musical time", value: "musical_time" }
            ]
        },
        modulatable: false,
        additionalParams: ["controlIndex"]
    },
    {
        description: "UI Image Control Path",
        type: "control",
        level: "ui",
        parameter: "PATH",
        inputProps: {
            type: "text"
        },
        modulatable: false,
        additionalParams: ["controlIndex"]
    },
    {
        description: "UI Keyboard Coloring Enable / Disable",
        type: "keyboard_color",
        level: "ui",
        parameter: "ENABLED",
        inputProps: {
            type: "boolean"
        },
        modulatable: false,
        additionalParams: ["colorIndex"]
    },
    {
        description: "Modulator Amount (Depth)",
        type: "modulator",
        level: "instrument",
        parameter: "MOD_AMOUNT",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["modulatorIndex"]
    },
    {
        description: "LFO Modulator Rate (or Frequency)",
        type: "modulator",
        level: "instrument",
        parameter: "FREQUENCY",
        inputProps: {
            min: "0",
            max: "22000",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["modulatorIndex"]
    },
    {
        description: "Envelope Modulator",
        secondaryDescription: "Attack",
        type: "modulator",
        level: "instrument",
        parameter: "ENV_ATTACK",
        inputProps: {
            min: "0",
            max: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["modulatorIndex"]
    },
    {
        description: "Envelope Modulator",
        secondaryDescription: "Attack Curve Shape",
        type: "modulator",
        level: "instrument",
        parameter: "ENV_ATTACK_CURVE",
        inputProps: {
            min: "-100",
            max: "100",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["modulatorIndex"]
    },
    {
        description: "Envelope Modulator",
        secondaryDescription: "Decay",
        type: "modulator",
        level: "instrument",
        parameter: "ENV_DECAY",
        inputProps: {
            min: "0",
            max: "25",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["modulatorIndex"]
    },
    {
        description: "Envelope Modulator",
        secondaryDescription: "Decay Curve Shape",
        type: "modulator",
        level: "instrument",
        parameter: "ENV_DECAY_CURVE",
        inputProps: {
            min: "-100",
            max: "100",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["modulatorIndex"]
    },
    {
        description: "Envelope Modulator",
        secondaryDescription: "Sustain",
        type: "modulator",
        level: "instrument",
        parameter: "ENV_SUSTAIN",
        inputProps: {
            min: "0",
            max: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["modulatorIndex"]
    },
    {
        description: "Envelope Modulator",
        secondaryDescription: "Release",
        type: "modulator",
        level: "instrument",
        parameter: "ENV_RELEASE",
        inputProps: {
            min: "0",
            max: "25",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["modulatorIndex"]
    },
    {
        description: "Envelope Modulator",
        secondaryDescription: "Release Curve Shape",
        type: "modulator",
        level: "instrument",
        parameter: "ENV_RELEASE_CURVE",
        inputProps: {
            min: "-100",
            max: "100",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["modulatorIndex"]
    },
    {
        description: "Sequence Rate",
        type: "note_sequence",
        level: "instrument",
        parameter: "RATE",
        inputProps: {
            min: "0.01",
            max: "100",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: ["seqIndex"]
    },
    {
        description: "All Notes Off",
        type: "general",
        level: "instrument",
        parameter: "ALL_NOTES_OFF"
    }
];

export default controllableParametersData;
