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
