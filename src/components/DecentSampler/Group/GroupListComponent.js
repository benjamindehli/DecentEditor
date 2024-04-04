import { Fragment } from "react";
import { GroupItemComponent } from "./GroupItemComponent";

export function GroupListComponent({ groupList }) {
    return (
        <Fragment>
            {!!groupList?.length &&
                groupList.map((groupItem) => <GroupItemComponent groupItem={groupItem} key={groupItem.id} />)}
        </Fragment>
    );
}
