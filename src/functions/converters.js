import xmlFormat from "xml-formatter";

export function jsonToXml(json) {
    let sequenceElement = document.createElementNS(null, json["#name"]);
    if (!!json?.$ && Object.keys(json.$).length) {
        Object.keys(json.$).forEach((key) => {
            if (json.$[key] !== undefined) {
                sequenceElement.setAttribute(key, json.$[key]);
            }
        });
    }
    if (!!json?.$$?.length) {
        json.$$?.forEach((childElement) => {
            sequenceElement.appendChild(jsonToXml(childElement));
        });
    }
    return sequenceElement;
}

export function createXmlDoc(xmlContent) {
    const docHead = `<?xml version="1.0" encoding="UTF-8"?>`;
    const docBody = xmlContent.outerHTML;
    const formatOptions = {
        indentation: "  ",
        forceSelfClosingEmptyTag: true,
        whiteSpaceAtEndOfSelfclosingTag: true,
        collapseContent: true
    };
    return xmlFormat(`${docHead}${docBody}`, formatOptions);
}
