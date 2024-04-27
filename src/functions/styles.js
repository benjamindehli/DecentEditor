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
    296, 77, 154, 231, 347, 13, 64, 167, 321, 244, 26, 90, 180, 257, 39, 334, 129, 193, 283, 309, 51, 103, 206, 219,
    116, 141, 270, 0
];

export function getColorForElementType(elementType) {
    const elementTypes = getElementTypesArray();
    const elementTypeIndex = elementTypes.indexOf(elementType);
    return {
        light: `hsla(${hueValues[elementTypeIndex]}, 90%, 40%, 0.95)`,
        dark: `hsla(${hueValues[elementTypeIndex]}, 100%, 65%, 0.95)`
    };
}
