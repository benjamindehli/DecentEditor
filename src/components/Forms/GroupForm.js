import { TextField } from "@mui/material";
import { Box } from "@mui/system";

export function GroupForm(element) {
  function handleSubmit() {
    console.log("submitted");
  }
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="tags"
        label="tags"
        name="tags"
        autoComplete="tags"
        value={element?.tags}
        helperText="The relative path of the sample file to play for this zone. This can be a .wav or .flac file."
        autoFocus
      />
      <pre>
        <code>{JSON.stringify(element, null, 2)}</code>
      </pre>
    </Box>
  );
}
