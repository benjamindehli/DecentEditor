import xmlFormat from "xml-formatter";

export function jsonToXml(json) {
    let xmlElement = document.createElementNS(null, json["#name"]);
    if (!!json?.$ && Object.keys(json.$).length) {
        Object.keys(json.$).forEach((key) => {
            if (json.$[key] !== undefined) {
                xmlElement.setAttribute(key, json.$[key]);
            }
        });
    }
    if (!!json?.$$?.length) {
        json.$$?.forEach((childElement) => {
            xmlElement.appendChild(jsonToXml(childElement));
        });
    }
    return xmlElement;
}

function getXmlFormatOption() {
    return {
        indentation: "  ",
        forceSelfClosingEmptyTag: true,
        whiteSpaceAtEndOfSelfclosingTag: true,
        collapseContent: true
    };
}

export function formatXml(xmlContent) {
    const docBody = xmlContent.outerHTML;
    const formatOptions = getXmlFormatOption();
    return xmlFormat(docBody, formatOptions);
}

export function createXmlDoc(xmlContent) {
    const docHead = `<?xml version="1.0" encoding="UTF-8"?>`;
    const docBody = xmlContent.outerHTML;
    const formatOptions = getXmlFormatOption();
    return xmlFormat(`${docHead}${docBody}`, formatOptions);
}
