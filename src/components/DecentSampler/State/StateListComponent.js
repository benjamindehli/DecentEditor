import { Fragment } from "react";
import { StateItemComponent } from "./StateItemComponent";

export function StateListComponent({ stateList }) {
    return (
        <Fragment>
            {!!stateList?.length &&
                stateList.map((stateItem) => <StateItemComponent stateItem={stateItem} key={stateItem.id} />)}
        </Fragment>
    );
}
