// Material UI
import { Add } from "@mui/icons-material";
import { blue, common } from "@mui/material/colors";

// Stylesheets
import style from "./Icons.module.scss";

export function IconDuplicate({ children }) {
    return (
        <span className={style.iconContainer}>
            {children}
            <Add sx={{ bgcolor: blue[500], color: common["white"] }} className={style.addon} />
        </span>
    );
}
