// Material UI
import { useTheme } from "@mui/material/styles";
import {
    AutoAwesome,
    DisplaySettings,
    Folder,
    LocalOffer,
    MusicNote,
    Palette,
    Piano,
    Settings,
    SettingsInputSvideo,
    Speed,
    SwapCalls,
    ToggleOn,
    Tune,
    VolumeUp
} from "@mui/icons-material";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import Stack from "@mui/material/Stack";

// Functions
import { getColorForBindingLevel, getColorForBindingType } from "@/functions/styles";

export function IconControllableParameter({ controllableParameter }) {
    const theme = useTheme();

    function renderParameterLevelIcon(parameterLevel) {
        const iconProps = {
            sx: {
                color: getColorForBindingLevel(parameterLevel)[theme.palette.mode]
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
                color: getColorForBindingType(parameterType)[theme.palette.mode]
            }
        };
        switch (parameterType) {
            case "amp":
                return <VolumeUp {...iconProps} />;
            case "general":
                return <Settings {...iconProps} />;
            case "effect":
                return <AutoAwesome {...iconProps} />;
            case "control":
                return <Tune {...iconProps} />;
            case "keyboard_color": ///
                return <Palette {...iconProps} />;
            case "modulator": ///
                return <SwapCalls {...iconProps} />;
            case "note_sequence":
                return <QueueMusicIcon {...iconProps} />;
            case "note":
            case "note_binding":
                return <MusicNote {...iconProps} />;
            case "velocity_binding":
                return <Speed {...iconProps} />;
            case "button_state_binding":
                return <ToggleOn {...iconProps} />;
            default:
                return "";
        }
    }

    return (
        <Stack direction="row" spacing={0}>
            {renderParameterLevelIcon(controllableParameter?.level)}
            {renderParameterTypeIcon(controllableParameter?.type)}
        </Stack>
    );
}
