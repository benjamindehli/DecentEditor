"use client";

// Dependencies
import { createContext, useState } from "react";

const DecentSamplerContext = createContext({
    groupsList: [],
    uiList: [],
    updateGroupsList: function (groupsList) {},
    updateGroupsItem: function (groupsItem) {},
    updateGroupList: function (groupList) {},
    updateGroupItem: function (groupItem) {},
    updateSampleList: function (sampleList) {},
    updateSampleItem: function (sampleItem) {}
});

export function DecentSamplerContextProvider({ children }) {
    const [activeNotification, setActiveNotification] = useState();
    const [groupsList, setGroupsList] = useState([]);
    const [uiList, setUiList] = useState([]);

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
        groupsList: groupsList,
        uiList: uiList,
        updateGroupsList: updateGroupsListHandler,
        updateGroupsItem: updateGroupsItemHandler,
        updateGroupList: updateGroupListHandler,
        updateGroupItem: updateGroupItemHandler,
        updateSampleList: updateSampleListHandler,
        updateSampleItem: updateSampleItemHandler
    };

    return <DecentSamplerContext.Provider value={context}>{children}</DecentSamplerContext.Provider>;
}

export default DecentSamplerContext;
