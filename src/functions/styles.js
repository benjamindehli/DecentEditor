import { bindingLevels, bindingTypes } from "@/data/bindingPropValues";

export function classNameArrayToClassNameString(classNameArray) {
    return classNameArray?.filter((className) => className)?.join(" ") || "";
}

const elementTypes = [
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

const hueValuesForElementTypes = [
    296, 77, 154, 231, 347, 13, 64, 167, 321, 244, 26, 90, 180, 257, 39, 334, 129, 193, 283, 309, 51, 103, 206, 219,
    116, 141, 270, 0
];

const hueValuesForBindingTypes = [5, 38, 70, 103, 136, 169, 201, 234, 267, 300, 332];

const hueValuesForBindingLevels = [139, 211, 283, 355, 67];

export function getColorForElementType(elementType) {
    const elementTypeIndex = elementTypes.indexOf(elementType);
    return {
        light: `hsla(${hueValuesForElementTypes[elementTypeIndex]}, 90%, 40%, 0.95)`,
        dark: `hsla(${hueValuesForElementTypes[elementTypeIndex]}, 100%, 65%, 0.95)`
    };
}

export function getColorForBindingType(bindingType) {
    const bindingTypeIndex = bindingTypes.indexOf(bindingType);
    return {
        light: `hsla(${hueValuesForBindingTypes[bindingTypeIndex]}, 90%, 40%, 0.95)`,
        dark: `hsla(${hueValuesForBindingTypes[bindingTypeIndex]}, 100%, 65%, 0.95)`
    };
}

export function getColorForBindingLevel(bindingLevel) {
    const bindingLevelIndex = bindingLevels.indexOf(bindingLevel);
    return {
        light: `hsla(${hueValuesForBindingLevels[bindingLevelIndex]}, 90%, 40%, 0.95)`,
        dark: `hsla(${hueValuesForBindingLevels[bindingLevelIndex]}, 100%, 65%, 0.95)`
    };
}
