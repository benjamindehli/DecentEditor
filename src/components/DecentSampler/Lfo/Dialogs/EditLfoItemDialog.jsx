// Dependencies
import { Fragment } from "react";

// Material UI
import { Water } from "@mui/icons-material";

// Template
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import { DefaultTextField } from "@/components/Template/DefaultTextField";
import { DefaultSelectList } from "@/components/Template/DefaultSelectList";

const lfoShapeOptions = [
    { value: "sine", label: "Sine" },
    { value: "square", label: "Square" },
    { value: "saw", label: "Sawtooth" },
    { value: "random", label: "Random (sample & hold)" }
];

const scopeOptions = [
    { value: "global", label: "Global", description: "One LFO shared across all voices" },
    { value: "voice", label: "Voice", description: "Each voice has its own LFO" }
];

export function EditLfoItemDialog({ lfoItem, open, onClose }) {
    function getElementItemValue(name) {
        return lfoItem?.[name] ?? "";
    }

    function setElementItemValue(event) {
        lfoItem[event.target.name] = event.target.value;
    }

    const tabs = [
        {
            label: "GENERAL",
            children: (
                <Fragment key="general-tab">
                    <DefaultSelectList
                        name="shape"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={lfoShapeOptions}
                        helperText="The waveform shape of the LFO."
                    />
                    <DefaultTextField
                        name="frequency"
                        label="Frequency (Hz)"
                        type="number"
                        inputProps={{ step: "0.01", min: "0.01" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="The frequency of the LFO in Hz. Default: 1."
                    />
                    <DefaultTextField
                        name="modAmount"
                        label="Modulation amount"
                        type="number"
                        inputProps={{ step: "0.01", min: "0", max: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="How much the LFO affects the target parameter (0.0–1.0). Default: 1."
                    />
                    <DefaultSelectList
                        name="scope"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={scopeOptions}
                        helperText="Whether this LFO runs globally or per-voice."
                    />
                </Fragment>
            )
        }
    ];

    const dialogIcon = <Water />;
    const dialogTitle = "Edit LFO";

    return (
        !!lfoItem && (
            <DefaultItemDialog
                elementItem={lfoItem}
                dialogIcon={dialogIcon}
                dialogTitle={dialogTitle}
                contentHeight="400px"
                tabs={tabs}
                open={open}
                onClose={onClose}
            />
        )
    );
}
