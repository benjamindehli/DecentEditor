import { Fragment } from "react";
import { GroupsItemComponent } from "./GroupsItemComponent";

export function GroupsListComponent({ groupsList, onUpdateGroupsList, onSelectElement }) {
    function handleUpdateGroupsList(updatedGroupsItem) {
        const groupsItemIndex = groupsList.findIndex((groupsItem) => groupsItem.id === updatedGroupsItem.id);
        groupsList[groupsItemIndex] = updatedGroupsItem;
        onUpdateGroupsList([...groupsList]);
    }
    return (
        <Fragment>
            {groupsList?.length &&
                groupsList.map((groupsItem) => (
                    <GroupsItemComponent
                        groupsItem={groupsItem}
                        onUpdateGroupsItem={handleUpdateGroupsList}
                        key={groupsItem.id}
                        onSelectElement={onSelectElement}
                    />
                ))}
        </Fragment>
    );
}
