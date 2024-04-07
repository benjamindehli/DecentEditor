import { TextField } from "@mui/material";
import { Box } from "@mui/system";

export function SampleForm(element) {
  function handleSubmit() {
    console.log("submitted");
  }
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="path"
        label="path"
        name="path"
        autoComplete="path"
        value={element?.path}
        helperText="The relative path of the sample file to play for this zone. This can be a .wav or .flac file."
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="loNote"
        label="loNote"
        name="loNote"
        autoComplete="loNote"
        value={element?.loNote}
        helperText="The MIDI note number (from 1 to 127) of the lowest note for which the zone should be triggered. Default: 0."
        type="number"
        min="0"
        max="127"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="hiNote"
        label="hiNote"
        name="hiNote"
        autoComplete="hiNote"
        value={element?.hiNote}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="rootNote"
        label="rootNote"
        name="rootNote"
        autoComplete="rootNote"
        value={element?.rootNote}
      />
      <pre>
        <code>{JSON.stringify(element, null, 2)}</code>
      </pre>
    </Box>
  );
}
