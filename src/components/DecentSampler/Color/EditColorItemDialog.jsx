// Dependencies
import { useState } from "react";

// Material UI
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Icon,
    Slider,
    Typography
} from "@mui/material";
import { Palette } from "@mui/icons-material";

// Template
import { DefaultColorField } from "@/components/Template/DefaultColorField";

// Classes
import midiNotes from "@/data/midiNotes";

export function EditColorItemDialog({ colorItem, open, onClose }) {
    const [previewXmlCode, setPreviewXmlCode] = useState(false);

    const [keyRangeValue, setKeyRangeValue] = useState([parseInt(colorItem.loNote), parseInt(colorItem.hiNote)]);

    const handleKeyRangeChange = (event, newValue) => {
        setKeyRangeValue(newValue);
    };

    function valuetext(value) {
        return `${value}°C`;
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

    function handleTogglePreviewXmlCode() {
        setPreviewXmlCode(!previewXmlCode);
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
                    colorItem.color = formJson.color.replace("#", "FF");
                    colorItem.loNote = keyRangeValue[0];
                    colorItem.hiNote = keyRangeValue[1];
                    onClose();
                }
            }}
        >
            <DialogTitle>
                <Icon>
                    <Palette />
                </Icon>{" "}
                Edit Color
            </DialogTitle>

            {previewXmlCode ? (
                <DialogContent>hoy</DialogContent>
            ) : (
                <DialogContent>
                    <DefaultColorField autoFocus required name="color" defaultValue={colorItem.color} />

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
                </DialogContent>
            )}

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleTogglePreviewXmlCode}>Preview code</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    );
}
