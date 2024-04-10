const controllableParametersData = [
    {
        description: "Global Volume",
        type: "amp",
        level: "instrument",
        parameter: "AMP_VOLUME",
        inputProps: {
            minValue: "0",
            maxValue: "16",
            step: "0.1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Global Tuning",
        type: "amp",
        level: "instrument",
        parameter: "GLOBAL_TUNING",
        inputProps: {
            minValue: "-36",
            maxValue: "36",
            step: "0.1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Global Pan",
        type: "amp",
        level: "instrument",
        parameter: "PAN",
        inputProps: {
            minValue: "-100",
            maxValue: "100",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Sample Start",
        type: "general",
        level: "instrument",
        parameter: "SAMPLE_START",
        inputProps: {
            minValue: "0",
            maxValue: null,
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Sample Start",
        type: "general",
        level: "group",
        parameter: "SAMPLE_START",
        inputProps: {
            minValue: "0",
            maxValue: null,
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Sample End",
        type: "general",
        level: "instrument",
        parameter: "SAMPLE_END",
        inputProps: {
            minValue: "0",
            maxValue: null,
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Sample End",
        type: "general",
        level: "group",
        parameter: "SAMPLE_END",
        inputProps: {
            minValue: "0",
            maxValue: null,
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Loop Start",
        type: "general",
        level: "instrument",
        parameter: "LOOP_START",
        inputProps: {
            minValue: "0",
            maxValue: null,
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Loop Start",
        type: "general",
        level: "group",
        parameter: "LOOP_START",
        inputProps: {
            minValue: "0",
            maxValue: null,
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Loop End",
        type: "general",
        level: "instrument",
        parameter: "LOOP_END",
        inputProps: {
            minValue: "0",
            maxValue: null,
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Loop End",
        type: "general",
        level: "group",
        parameter: "LOOP_END",
        inputProps: {
            minValue: "0",
            maxValue: null,
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: "This value will be in number of raw samples where 0 is the beginning."
    },
    {
        description: "Amplitude Velocity Tracking",
        type: "amp",
        level: "instrument",
        parameter: "AMP_VEL_TRACK",
        inputProps: {
            minValue: "0",
            maxValue: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Global Amp Envelope Attack",
        type: "amp",
        level: "instrument",
        parameter: "ENV_ATTACK",
        inputProps: {
            minValue: "0",
            maxValue: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Global Amp Envelope Attack Curve Shape",
        type: "amp",
        level: "instrument",
        parameter: "ENV_ATTACK_CURVE",
        inputProps: {
            minValue: "-100",
            maxValue: "100",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Global Amp Envelope Decay",
        type: "amp",
        level: "instrument",
        parameter: "ENV_DECAY",
        inputProps: {
            minValue: "0",
            maxValue: "25",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Global Amp Envelope Decay Curve Shape",
        type: "amp",
        level: "instrument",
        parameter: "ENV_DECAY_CURVE",
        inputProps: {
            minValue: "-100",
            maxValue: "100",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Global Amp Envelope Sustain",
        type: "amp",
        level: "instrument",
        parameter: "ENV_SUSTAIN",
        inputProps: {
            minValue: "0",
            maxValue: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Global Amp Envelope Release",
        type: "amp",
        level: "instrument",
        parameter: "ENV_RELEASE",
        inputProps: {
            minValue: "0",
            maxValue: "25",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Global Amp Envelope Release Curve Shape",
        type: "amp",
        level: "instrument",
        parameter: "ENV_RELEASE_CURVE",
        inputProps: {
            minValue: "-100",
            maxValue: "100",
            step: "1",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Glide/Portamento Time",
        type: "amp",
        level: "instrument",
        parameter: "GLIDE_TIME",
        inputProps: {
            minValue: "0",
            maxValue: "10",
            step: "0.01",
            type: "number"
        },
        modulatable: false,
        additionalParams: null,
        helperText: null
    },
    {
        description: "Effect Enabled (all effects)",
        type: "effect",
        level: "instrument",
        parameter: "ENABLED",
        inputProps: {
            minValue: null,
            maxValue: null,
            step: null,
            type: "boolean"
        },
        modulatable: true,
        additionalParams: "effectIndex",
        helperText: null
    },
    {
        description: "Convolution Mix Level",
        type: "effect",
        level: "instrument",
        parameter: "FX_MIX",
        inputProps: {
            minValue: "0",
            maxValue: "1",
            step: "0.01",
            type: "number"
        },
        modulatable: true,
        additionalParams: "effectIndex",
        helperText: null
    },
    {
        description: "Convolution IR File",
        type: "effect",
        level: "instrument",
        parameter: "FX_IR_FILE",
        inputProps: {
            minValue: null,
            maxValue: null,
            step: null,
            type: "number"
        },
        modulatable: true,
        additionalParams: "effectIndex",
        helperText: null
    }
];

export default controllableParametersData;
