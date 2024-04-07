import { Add } from "@mui/icons-material";
import { green, common } from "@mui/material/colors";
import style from "./Icons.module.scss";

export function IconAdd({ children }) {
    return (
        <span className={style.iconContainer}>
            {children}
            <Add sx={{ bgcolor: green[500], color: common["white"] }} className={style.addon} />
        </span>
    );
}
