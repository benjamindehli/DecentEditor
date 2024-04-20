// Dependencies
import { useContext, useState } from "react";

// Material UI
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormHelperText,
    Icon,
    OutlinedInput,
    Switch,
    Tab,
    Tabs
} from "@mui/material";
import { Folder, FolderOff, MiscellaneousServices, SettingsInputSvideo, ShowChart, Tune } from "@mui/icons-material";

// Template
import { DefaultTextField } from "@/components/Template/DefaultTextField";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

// Classes
import { Color } from "@/classes/Color";

export function EditColorItemDialog({ colorItem, open, onClose }) {
    const decentSamplerContext = useContext(DecentSamplerContext);
    const [enabled, setEnabled] = useState(colorItem.enabled === "1");

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
                    const stateProps = {
                        enabled: enabled ? "1" : "0"
                    };
                    const updatedColorItem = new Color({ ...colorItem, ...formJson, ...stateProps });
                    decentSamplerContext.updateDecentSamplerElement(updatedColorItem);
                    onClose();
                }
            }}
        >
            <DialogTitle>
                <Icon>{enabled ? <Folder /> : <FolderOff />}</Icon> Edit group
            </DialogTitle>

            <DialogContent>
                <DefaultTextField
                    autoFocus
                    required
                    name="color"
                    defaultValue={colorItem.color}
                    helperText="A comma-separated list of tags. Example: tags=”rt,mic1”. These are useful when controlling volumes using tags. See Appendix D."
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    );
}
