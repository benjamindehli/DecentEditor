// Material UI
import { Remove } from "@mui/icons-material";
import { red, common } from "@mui/material/colors";

// Stylesheets
import style from "./Icons.module.scss";

export function IconRemove({ children }) {
    return (
        <span className={style.iconContainer}>
            {children}
            <Remove sx={{ bgcolor: red[500], color: common["white"] }} className={style.addon} />
        </span>
    );
}
