export function classNameArrayToClassNameString(classNameArray) {
    return classNameArray?.filter((className) => className)?.join(" ") || "";
}

function getElementTypesArray() {
    return [
        "binding",
        "button",
        "cc",
        "color",
        "control",
        "effect",
        "effects",
        "envelope",
        "group",
        "groups",
        "image",
        "keyboard",
        "label",
        "labeledKnob",
        "lfo",
        "menu",
        "midi",
        "modulators",
        "note",
        "noteSequences",
        "option",
        "sample",
        "sequence",
        "state",
        "tab",
        "tag",
        "tags",
        "ui"
    ];
}

const hueValues = [
    296, 77, 154, 231, 309, 13, 103, 167, 321, 244, 26, 90, 180, 257, 334, 39, 116, 193, 270, 347, 51, 129, 206, 283,
    64, 141, 219, 0
];

export function getBgColorForElementType(elementType) {
    const elementTypes = getElementTypesArray();
    const elementTypeIndex = elementTypes.indexOf(elementType);
    return `hsla(${hueValues[elementTypeIndex]}, 100%, 25%, 0.05)`;
}

export function getFgColorForElementType(elementType) {
    const elementTypes = getElementTypesArray();
    const elementTypeIndex = elementTypes.indexOf(elementType);
    return `hsla(${hueValues[elementTypeIndex]}, 100%, 65%, 0.95)`;
}
