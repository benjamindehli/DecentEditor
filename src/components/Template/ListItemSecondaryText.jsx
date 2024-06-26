// Material-UI
import { Typography } from "@mui/material";

export function ListItemSecondaryText({ children, fullWidth = false }) {
    const width = fullWidth ? "100%" : "calc(100% - 30px)";
    return (
        <Typography component="span" fontSize={14} color="text.secondary" noWrap width={width} display={"block"}>
            {children}
        </Typography>
    );
}
