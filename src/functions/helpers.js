export function capitalizeFirstLetter(string) {
    if (!string?.length) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getIndentSize(decentSamplerElement, hasChildren) {
    const indentMultiplier = 2;
    const hierarchyMultiplier = decentSamplerElement?.hierarchyPath?.length || 0;
    const noChildrenAddition = !hasChildren ? 3 : 0;
    return indentMultiplier * hierarchyMultiplier + noChildrenAddition;
}
