// Dependencies
import { useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";

// Material UI
import { useTheme } from "@mui/material/styles";
import { classNameArrayToClassNameString } from "@/functions/styles";

// Stylesheets
import "./XmlPreview.css";

hljs.registerLanguage("xml", xml);

export function XmlPreview({ xmlString }) {
    const theme = useTheme();

    const [xmlData, setXmlData] = useState();

    useEffect(() => {
        if (!!xmlString?.length) {
            setXmlData(hljs.highlight(xmlString, { language: "xml" }).value);
        }
    }, [xmlString]);
    return (
        <div className={classNameArrayToClassNameString(["code", theme.palette.mode])}>
            <pre dangerouslySetInnerHTML={xmlData && { __html: xmlData }}></pre>
        </div>
    );
}
