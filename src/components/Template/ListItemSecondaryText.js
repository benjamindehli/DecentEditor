// Material-UI
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export function ListItemSecondaryText({ children, fullWidth = false }) {
    const width = fullWidth ? "100%" : "calc(100% - 30px)";
    return (
        <Typography component="span" fontSize={14} color={grey[700]} noWrap width={width} display={"block"}>
            {children}
        </Typography>
    );
}
