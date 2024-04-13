// Material UI
import {
    CheckBox,
    DisplaySettings,
    Folder,
    LocalOffer,
    MusicNote,
    Piano,
    Settings,
    SettingsInputSvideo,
    Speed,
    ToggleOff,
    ToggleOn,
    Tune,
    VolumeUp
} from "@mui/icons-material";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import Stack from "@mui/material/Stack";

export function IconControllableParameter({ parameterType, parameterLevel }) {
    function renderParameterLevelIcon(parameterLevel) {
        const iconProps = {
            sx: {
                color: "text.secondary"
            }
        };
        switch (parameterLevel) {
            case "instrument":
                return <Piano {...iconProps} />;
            case "group":
                return <Folder {...iconProps} />;
            case "ui":
                return <DisplaySettings {...iconProps} />;
            case "midi":
                return <SettingsInputSvideo {...iconProps} />;
            case "tag":
                return <LocalOffer {...iconProps} />;
            default:
                return "";
        }
    }
    function renderParameterTypeIcon(parameterType) {
        const iconProps = {
            sx: {
                color: "text.secondary"
            }
        };
        switch (parameterType) {
            case "amp":
                return <VolumeUp {...iconProps} />;
            case "general":
                return <Settings {...iconProps} />;
            case "effect":
                return <Tune {...iconProps} />;
            case "control":
                return <ToggleOn {...iconProps} />;
            case "note_sequence":
                return <QueueMusicIcon {...iconProps} />;
            case "note":
            case "note_binding":
                return <MusicNote {...iconProps} />;
            case "velocity_binding":
                return <Speed {...iconProps} />;
            case "button_state_binding":
                return <CheckBox {...iconProps} />;
            default:
                return "";
        }
    }

    return (
        <Stack direction="row" spacing={0} sx={{minWidth: "56px"}}>
            {renderParameterLevelIcon(parameterLevel)}
            {renderParameterTypeIcon(parameterType)}
        </Stack>
    );
}
