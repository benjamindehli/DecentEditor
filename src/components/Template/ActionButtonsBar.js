// Stylesheets
import style from "./ActionButtonsBar.module.scss";

export function ActionButtonsBar({ children }) {
    return <div className={style.actionButtonsBar}>{children}</div>;
}
