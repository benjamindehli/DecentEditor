// Stylesheets
import style from "./AccordionContent.module.scss";

export function AccordionContent({ children }) {
    return <div className={style.accordionContent}>{children}</div>;
}
