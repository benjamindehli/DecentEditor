// Stylesheets
import style from "./IconColor.module.scss";

export function IconColor({ color }) {
    return <span className={style.iconColor} style={{ "--color": color }} />;
}
