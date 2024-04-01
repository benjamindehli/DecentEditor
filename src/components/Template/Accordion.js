// Dependencies
import { useState } from "react";

// Stylesheets
import style from "./Accordion.module.scss";
import { classNameArrayToClassNameString, getBackgroundRgbForType } from "@/functions/styles";

export function Accordion({ title, children, actionButtons, type }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    const rgbColor = getBackgroundRgbForType(type);
    return (
        <div className={style.accordionContainer} style={{ "--bg-color": rgbColor }}>
            <div className={style.accordion}>
                <div className={style.titleBar}>
                    <button className={style.title} onClick={toggleOpen}>
                        <i className={classNameArrayToClassNameString([style.icon, isOpen && style.expanded])} />
                        {title}
                    </button>
                    <div className={style.actionButtons}>{actionButtons}</div>
                </div>
                {isOpen && <div className={style.content}>{children}</div>}
            </div>
        </div>
    );
}
