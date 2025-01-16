// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { Box, Slider, Typography } from "@mui/material";
import { Palette } from "@mui/icons-material";

// Template
import { DefaultColorField } from "@/components/Template/DefaultColorField";
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";

// Classes
import midiNotes from "@/data/midiNotes";

export function EditColorItemDialog({ colorItem, open, onClose }) {
    const [keyRangeValue, setKeyRangeValue] = useState([parseInt(colorItem.loNote), parseInt(colorItem.hiNote)]);

    const handleKeyRangeChange = (event, keyRangeValue) => {
        setKeyRangeValue(keyRangeValue);
        colorItem.loNote = keyRangeValue[0];
        colorItem.hiNote = keyRangeValue[1];
    };

    function valuetext(value) {
        return `${value}°C`;
    }

    function getElementItemValue(name) {
        return colorItem?.[name] || "";
    }

    function setElementItemValue(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        colorItem[fieldName] = fieldValue;
    }

    const marks = [
        {
            value: 0,
            label: "C-2"
        },
        {
            value: 12,
            label: "C-1"
        },
        {
            value: 24,
            label: "C0"
        },
        {
            value: 36,
            label: "C1"
        },
        {
            value: 48,
            label: "C2"
        },
        {
            value: 60,
            label: "C3"
        },
        {
            value: 127,
            label: "G8"
        }
    ];

    function valueLabelFormat(value) {
        const midiNote = midiNotes[value];
        const midiNoteName = `${midiNote.name}${midiNote.octave}`;
        return `${midiNoteName} (${value})`;
    }

    const tabs = [
        {
            label: "GENERAL",
            children: (
                <Fragment key="general-tab">
                    <DefaultColorField
                        autoFocus
                        required
                        name="color"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                    />
                    <Box sx={{ mt: 2 }}>
                        <Typography id="track-false-slider" gutterBottom>
                            Key range: {valueLabelFormat(keyRangeValue[0])} - {valueLabelFormat(keyRangeValue[1])}
                        </Typography>
                        <Box sx={{ px: 2 }}>
                            <Slider
                                getAriaLabel={() => "Key range"}
                                value={keyRangeValue}
                                min={0}
                                step={1}
                                max={127}
                                onChange={handleKeyRangeChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                valueLabelFormat={valueLabelFormat}
                                marks={marks}
                            />
                        </Box>
                    </Box>
                </Fragment>
            )
        }
    ];

    const dialogIcon = <Palette />;
    const dialogTitle = "Edit color";

    return (
        !!colorItem && (
            <DefaultItemDialog
                elementItem={colorItem}
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
