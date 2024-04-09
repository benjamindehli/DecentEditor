import { Fragment } from "react";
import { GroupsItemComponent } from "./GroupsItemComponent";

export function GroupsListComponent({ groupsList }) {
    return (
        <Fragment>
            {!!groupsList?.length &&
                groupsList.map((groupsItem) => <GroupsItemComponent groupsItem={groupsItem} key={groupsItem.id} />)}
        </Fragment>
    );
}
