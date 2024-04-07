"use client";

// Dependencies
import { createContext, useState } from "react";

const DecentSamplerContext = createContext({
    groupsList: [],
    uiList: [],
    updateUiList: function (uiList) {},
    updateGroupsList: function (groupsList) {},
    updateGroupsItem: function (groupsItem) {},
    updateGroupList: function (groupList) {},
    addGroupItem: function (groupItem) {},
    removeGroupItem: function (groupItem) {},
    updateGroupItem: function (groupItem) {},
    updateSampleList: function (sampleList) {},
    updateSampleItem: function (sampleItem) {}
});

export function DecentSamplerContextProvider({ children }) {
    const [uiList, setUiList] = useState([]);
    const [groupsList, setGroupsList] = useState([]);

    function updateUiListHandler(updatedUiList) {
        setUiList([...updatedUiList]);
    }

    function updateGroupsListHandler(updatedGroupsList) {
        setGroupsList([...updatedGroupsList]);
    }

    function updateGroupsItemHandler(updatedGroupsItem) {
        const groupsListCopy = [...groupsList];
        const itemIndex = groupsListCopy.findIndex((groupsItem) => groupsItem.id === updatedGroupsItem.id);
        groupsListCopy[itemIndex] = updatedGroupsItem;
        updateGroupsListHandler(groupsListCopy);
    }

    function updateGroupListHandler(updatedGroupList) {
        const groupsItemCopy = groupsList[0];
        groupsItemCopy.groups = updatedGroupList;
        updateGroupsItemHandler(groupsItemCopy);
    }

    function addGroupItemHandler(newGroupItem) {
        const groupListCopy = groupsList[0].groups;
        groupListCopy.push(newGroupItem);
        updateGroupListHandler(groupListCopy);
    }

    function removeGroupItemHandler(groupItem) {
        const groupListCopy = groupsList[0].groups;
        const groupIndex = groupListCopy.findIndex((group) => group.id === groupItem.id);
        groupListCopy.splice(groupIndex, 1);
        updateGroupListHandler(groupListCopy);
    }

    function updateGroupItemHandler(updatedGroupItem) {
        const groupListCopy = groupsList[0].groups;
        const itemIndex = groupListCopy.findIndex((groupItem) => groupItem.id === updatedGroupItem.id);
        groupListCopy[itemIndex] = updatedGroupItem;
        updateGroupListHandler(groupListCopy);
    }

    function updateSampleListHandler(updatedSampleList) {
        const groupListCopy = groupsList[0].groups;
        const groupIndex = groupListCopy.findIndex((groupItem) => groupItem.id === updatedSampleList[0].groupId);
        groupListCopy[groupIndex].samples = updatedSampleList;
        updateGroupListHandler(groupListCopy);
    }

    function updateSampleItemHandler(updatedSampleItem) {
        const groupListCopy = groupsList[0].groups;
        const groupIndex = groupListCopy.findIndex((groupItem) => groupItem.id === updatedSampleItem.groupId);
        const sampleIndex = groupListCopy[groupIndex].samples.findIndex(
            (sampleItem) => sampleItem.id === updatedSampleItem.id
        );
        groupListCopy[groupIndex].samples[sampleIndex] = updatedSampleItem;
        updateGroupListHandler(groupListCopy);
    }

    

    const context = {
        uiList: uiList,
        groupsList: groupsList,
        updateUiList: updateUiListHandler,
        updateGroupsList: updateGroupsListHandler,
        updateGroupsItem: updateGroupsItemHandler,
        updateGroupList: updateGroupListHandler,
        addGroupItem: addGroupItemHandler,
        removeGroupItem: removeGroupItemHandler,
        updateGroupItem: updateGroupItemHandler,
        updateSampleList: updateSampleListHandler,
        updateSampleItem: updateSampleItemHandler
    };

    return <DecentSamplerContext.Provider value={context}>{children}</DecentSamplerContext.Provider>;
}

export default DecentSamplerContext;
