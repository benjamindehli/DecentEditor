export function addGlobalStylesheet(styleElementId, styles) {
    const style = document.createElement("style");
    style.setAttribute("id", styleElementId);
    style.textContent = styles;
    document.getElementById(styleElementId)?.remove();
    document.head.appendChild(style);
}

export function generateCssBgColors() {
    const types = ["groups", "group", "effects", "effect", "samples", "sample"];
    const cssColorVariablesString = types
        .map((type, index) => {
            return [
                `--bg-${type}-regular: hsl(${(index * 100) % 360}, 92%, 85%)`,
                `--bg-${type}-hover: hsl(${(index * 100) % 360}, 92%, 75%)`,
                `--bg-${type}-active: hsl(${(index * 100) % 360}, 92%, 65%)`,
                `--bg-${type}-focus: hsl(${(index * 100) % 360}, 92%, 55%)`,
                `--bg-${type}-selected: hsl(${(index * 100) % 360}, 92%, 45%)`,
                `--bg-${type}-disabled: hsl(${(index * 100) % 360}, 92%, 35%)`
            ].join("; ");
        })
        .join("; ");
    addGlobalStylesheet("bg-colors", `:root {${cssColorVariablesString}}`);
}

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return `${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}`;
}

export function getBackgroundRgbForType(color) {
    const types = [
        "ui",
        "tab",
        "keyboard",
        "color",
        "button",
        "control",
        "binding",
        "state",
        "groups",
        "group",
        "effects",
        "effect",
        "samples",
        "sample",
        "midi",
        "cc",
        "modulators",
        "lfo"
    ];
    const colors = {};
    types.forEach((type, index) => {
        const hue = index / types.length;
        colors[type] = hslToRgb(hue, 0.84, 0.42);
    });
    return colors[color];
}

export function getColorVariableForType(type) {
    return `--bg-${type}-regular`;
}

export function classNameArrayToClassNameString(classNameArray) {
    return classNameArray?.filter((className) => className)?.join(" ") || "";
}
