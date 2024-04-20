function createIndexArrayFromParentRefs(elementToSearch, parentRefs, parentRefsIndex, indexArray) {
    parentRefsIndex = parentRefsIndex || 0;
    indexArray = indexArray || [];
    if (parentRefsIndex === parentRefs.length) {
        return indexArray;
    } else {
        const indexFromParentRef = elementToSearch.childElements.findIndex((childElement) => {
            return childElement.id === parentRefs[parentRefsIndex];
        });
        indexArray.push(indexFromParentRef);
        parentRefsIndex++;
        const childElement = elementToSearch.childElements[indexFromParentRef];
        return createIndexArrayFromParentRefs(childElement, parentRefs, parentRefsIndex, indexArray);
    }
}

function updateObjectInStore(store, payload, pathToPayload) {
    eval(`store.${pathToPayload} = payload`);
    return store;
}

export function updateStore(store, payload) {
    const indexArray = createIndexArrayFromParentRefs(store, payload.hierarchyPath);
    const pathToPayload = indexArray
        .map((index) => {
            return `childElements[${index}]`;
        })
        .join(".");
    const mutatedStore = updateObjectInStore(store, payload, pathToPayload);
    return mutatedStore;
}
