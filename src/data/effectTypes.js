const effectTypesData = [
    {
        description: "Low-pass filter 1-pole",
        type: "lowpass_1pl",
        helperText: "A 1-pole low-pass filter with a gentle roll-off.",
        fields: [
            {
                label: "Resonance",
                key: "resonance",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The resonance of the filter."
            },
            {
                label: "Frequency",
                key: "frequency",
                inputProps: {
                    minValue: "20",
                    maxValue: "22000",
                    step: "1",
                    type: "number",
                    adornment: {
                        text: "Hz",
                        position: "end"
                    }
                },
                helperText: "The cutoff frequency of the filter."
            }
        ]
    },
    {
        description: "Low-pass filter 2-pole",
        type: "lowpass",
        helperText: "A 2-pole low-pass filter with a steeper roll-off than the 1-pole version.",
        fields: [
            {
                label: "Resonance",
                key: "resonance",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The resonance of the filter."
            },
            {
                label: "Frequency",
                key: "frequency",
                inputProps: {
                    minValue: "20",
                    maxValue: "22000",
                    step: "1",
                    type: "number",
                    adornment: {
                        text: "Hz",
                        position: "end"
                    }
                },
                helperText: "The cutoff frequency of the filter."
            }
        ]
    },
    {
        description: "Low-pass filter 4-pole (legacy)",
        type: "lowpass_4pl",
        helperText: "A 4-pole low-pass filter with a steeper roll-off than the 2-pole version.",
        fields: [
            {
                label: "Resonance",
                key: "resonance",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The resonance of the filter."
            },
            {
                label: "Frequency",
                key: "frequency",
                inputProps: {
                    minValue: "20",
                    maxValue: "22000",
                    step: "1",
                    type: "number",
                    adornment: {
                        text: "Hz",
                        position: "end"
                    },
                    helperText: "The cutoff frequency of the filter."
                }
            }
        ]
    },
    {
        description: "Band-pass filter",
        type: "bandpass",
        helperText: "A band-pass filter allows frequencies between the cutoff frequencies to pass through.",
        fields: [
            {
                label: "Resonance",
                key: "resonance",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The resonance of the filter."
            },
            {
                label: "Frequency",
                key: "frequency",
                inputProps: {
                    minValue: "20",
                    maxValue: "22000",
                    step: "1",
                    type: "number",
                    adornment: {
                        text: "Hz",
                        position: "end"
                    }
                },
                helperText: "The center frequency of the filter."
            }
        ]
    },
    {
        description: "High-pass filter",
        type: "highpass",
        helperText: "A high-pass filter allows frequencies higher than the cutoff frequency to pass through.",
        fields: [
            {
                label: "Resonance",
                key: "resonance",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The resonance of the filter."
            },
            {
                label: "Frequency",
                key: "frequency",
                inputProps: {
                    minValue: "20",
                    maxValue: "22000",
                    step: "1",
                    type: "number",
                    adornment: {
                        text: "Hz",
                        position: "end"
                    }
                },
                helperText: "The cutoff frequency of the filter."
            }
        ]
    },
    {
        description: "Notch EQ Filter",
        type: "notch",
        helperText: "A notch filter is a band-stop filter with a narrow bandwidth.",
        fields: [
            {
                label: "Frequency",
                key: "frequency",
                inputProps: {
                    minValue: "60",
                    maxValue: "22000",
                    step: "1",
                    type: "number",
                    adornment: {
                        text: "Hz",
                        position: "end"
                    },
                    helperText: "The center frequency of the filter."
                }
            },
            {
                label: "Q",
                key: "q",
                inputProps: {
                    minValue: "0.01",
                    maxValue: "18",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The higher the Q, the narrower the band affected by the filter."
            }
        ]
    },
    {
        description: "Peak EQ Filter",
        type: "peak",
        helperText: "A peak filter centred around a given frequency, with a variable Q and gain.",
        fields: [
            {
                label: "Frequency",
                key: "frequency",
                inputProps: {
                    minValue: "60",
                    maxValue: "22000",
                    step: "1",
                    type: "number",
                    adornment: {
                        text: "Hz",
                        position: "end"
                    },
                    helperText: "The center frequency of the filter."
                }
            },
            {
                label: "Q",
                key: "q",
                inputProps: {
                    minValue: "0.01",
                    maxValue: "18",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The higher the Q, the narrower the band affected by the filter."
            },
            {
                label: "Gain",
                key: "gain",
                inputProps: {
                    minValue: "0.01",
                    maxValue: "18",
                    step: "0.01",
                    type: "number",
                    adornment: {
                        text: "dB",
                        position: "end"
                    }
                },
                helperText:
                    "Values greater than 1.0 will boost the high frequencies, values less than 1.0 will attenuate them."
            }
        ]
    },
    {
        description: "Gain",
        type: "gain",
        helperText: "Applies a volume boost or cut to the output signal.",
        fields: [
            {
                label: "Level",
                key: "level",
                inputProps: {
                    minValue: "-99",
                    maxValue: "24",
                    step: "0.1",
                    type: "number",
                    adornment: {
                        text: "dB",
                        position: "end"
                    }
                },
                helperText:
                    "The amount of gain to be applied expressed in decibels. In other words, gain of -6dB reduces sound by 50%"
            }
        ]
    },
    {
        description: "Reverb",
        type: "reverb",
        helperText: "A reverb effect simulates the sound of a space by reflecting the sound off surfaces.",
        fields: [
            {
                label: "Room size",
                key: "roomSize",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText:
                    "The size of the simulated room. A value of 0.0 will make the room sound like a small box, 1.0 will make it sound like a large hall."
            },
            {
                label: "Damping",
                key: "damping",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText:
                    "The damping factor of the reverb. A value of 0.0 will make the reverb sound bright, 1.0 will make it sound dark."
            },
            {
                label: "Wet level",
                key: "wetLevel",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The level of the wet signal in the mix."
            }
        ]
    },
    {
        description: "Delay",
        type: "delay",
        helperText:
            "A simple delay effect that can be controlled either in seconds or using musical time increments based on the host tempo.",
        fields: [
            {
                label: "Delay time format",
                key: "delayTimeFormat",
                inputProps: {
                    type: "select",
                    options: [
                        {
                            value: "seconds",
                            label: "Seconds"
                        },
                        {
                            value: "musical_time",
                            label: "Musical time"
                        }
                    ]
                },
                helperText:
                    "Determines whether the delay will be synced to DAW tempo or not, as well as what format you will be using for the delayTime parameter. There are two possible values: 1) seconds, which is the default, means that delayTime will be specified in seconds and will not change when the DAW tempo changes; 2) musical_time means that delay time will be specified using an integer value generated by a control which is setup to use the musical_time valueType parameter. In order for this to work, you will need to be using the plug-in within a DAW that provides a tempo to the plug-in."
            },
            {
                label: "Delay time",
                key: "delayTime",
                inputProps: {
                    minValue: "0",
                    maxValue: "20",
                    step: "0.01",
                    type: "number"
                },
                helperText:
                    "The delay time in seconds or musical time increments. The maximum delay time is 20 seconds."
            },
            {
                label: "Feedback",
                key: "feedback",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The amount of feedback in the delay loop."
            },
            {
                label: "Stereo offset",
                key: "stereoOffset",
                inputProps: {
                    minValue: "-10",
                    maxValue: "10",
                    step: "0.01",
                    type: "number",
                    adornment: {
                        text: "seconds",
                        position: "end"
                    }
                },
                helperText:
                    "The parameter allows you to introduce delay variations between the left and right channels. Half of this amount is subtracted from the left channel’s delay time and half of this amount is added to the right channel’s delay time. For example, if the delayTime is 0.5 seconds and the stereoOffset is 0.02 s, then the actual left channel delay time will be 0.49s and the actual right channel delay time will be 0.51s so that the two channels are offset by 0.02 seconds."
            },
            {
                label: "Wet level",
                key: "wetLevel",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The volume of the delay signal"
            }
        ]
    },
    {
        description: "Convolution (Impulse Response)",
        type: "convolution",
        helperText:
            "This effect allows you to use a convolution reverb or amp simulation to your sample library. Depending on the length of the impulse response, the convolution effect can use substantial CPU, so you’ll definitely want to do some testing both with and without the convolution effect turned on.",
        fields: [
            {
                label: "Mix",
                key: "mix",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.1",
                    type: "number"
                },
                helperText: "The wet/dry mix controls how much of the convolution signal we hear"
            },
            {
                label: "IR file path",
                key: "irFile",
                inputProps: {
                    type: "text"
                },
                helperText: "The path of the WAV or AIFF to use as an Impulse Response (IR) file"
            }
        ]
    },
    {
        description: "Wave Folder",
        type: "wave_folder",
        helperText:
            "This effect allows you to fold a waveform back on itself. This is very useful for generating additional harmonic content. Because wave folding tends to sound better when applied on a per-voice basis, it usually makes sense to set up the wave folder at the group level (separate group effects get created for each keypress).",
        fields: [
            {
                label: "Drive",
                key: "drive",
                inputProps: {
                    minValue: "1",
                    maxValue: "100",
                    step: "0.1",
                    type: "number"
                },
                helperText:
                    "1 - 100, where 100 means the signal is amplified by a factor of 100 and 1 means no amplification is applied"
            },
            {
                label: "Threshold",
                key: "threshold",
                inputProps: {
                    minValue: "0",
                    maxValue: "10",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The threshold at which the wave folding will start to take effect"
            }
        ]
    },
    {
        description: "Wave Shaper",
        type: "wave_shaper",
        helperText:
            "This effect allows you to distort an audio signal. This is very useful for generating additional harmonic content. Because wave shaping tends to sound better when applied on a per-voice basis, it usually makes sense to set up the wave shaper at the group level (separate group effects get created for each keypress).",
        fields: [
            {
                label: "Drive",
                key: "drive",
                inputProps: {
                    minValue: "1",
                    maxValue: "1000",
                    step: "1",
                    type: "number"
                },
                helperText:
                    "The amount of distortion. This really just controls the volume of the input signal. The volume of the input signal"
            },
            {
                label: "Drive boost",
                key: "driveBoost",
                inputProps: {
                    minValue: "1",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText: "Introduces an extra gain boost to the drive"
            },
            {
                label: "Output level",
                key: "outputLevel",
                inputProps: {
                    minValue: "0",
                    maxValue: "1",
                    step: "0.01",
                    type: "number"
                },
                helperText: "The linear output level of the signal"
            },
            {
                label: "High quality",
                key: "highQuality",
                inputProps: {
                    type: "boolean"
                },
                helperText:
                    "Whether or not oversampling is performed. Oversampling sounds better, but it’s CPU intensive. If you want to save CPU, set this to false."
            }
        ]
    }
];

export default effectTypesData;
