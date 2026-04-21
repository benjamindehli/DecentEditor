// Dependencies
import { Fragment } from "react";

// Material UI
import { ShowChart } from "@mui/icons-material";

// Template
import { DefaultItemDialog } from "@/components/Template/DefaultItemDialog";
import { DefaultTextField } from "@/components/Template/DefaultTextField";
import { DefaultSelectList } from "@/components/Template/DefaultSelectList";

const scopeOptions = [
    { value: "global", label: "Global", description: "One envelope shared across all voices" },
    { value: "voice", label: "Voice", description: "Each voice has its own envelope" }
];

export function EditEnvelopeItemDialog({ envelopeItem, open, onClose }) {
    function getElementItemValue(name) {
        return envelopeItem?.[name] ?? "";
    }

    function setElementItemValue(event) {
        envelopeItem[event.target.name] = event.target.value;
    }

    const tabs = [
        {
            label: "GENERAL",
            children: (
                <Fragment key="general-tab">
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
                        name="modAmount"
                        label="Modulation amount"
                        type="number"
                        inputProps={{ step: "0.01", min: "0", max: "1" }}
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        helperText="How much the envelope affects the target parameter (0.0–1.0). Default: 1."
                    />
                    <DefaultSelectList
                        name="scope"
                        onChange={setElementItemValue}
                        getValue={getElementItemValue}
                        options={scopeOptions}
                        helperText="Whether this envelope runs globally or per-voice."
                    />
                </Fragment>
            )
        }
    ];

    const dialogIcon = <ShowChart />;
    const dialogTitle = "Edit envelope";

    return (
        !!envelopeItem && (
            <DefaultItemDialog
                elementItem={envelopeItem}
                dialogIcon={dialogIcon}
                dialogTitle={dialogTitle}
                contentHeight="420px"
                tabs={tabs}
                open={open}
                onClose={onClose}
            />
        )
    );
}
