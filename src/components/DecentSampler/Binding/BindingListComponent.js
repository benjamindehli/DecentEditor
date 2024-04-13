import { Fragment } from "react";
import { BindingItemComponent } from "./BindingItemComponent";

export function BindingListComponent({ bindingList }) {
    return (
        <Fragment>
            {!!bindingList?.length &&
                bindingList.map((bindingItem) => (
                    <BindingItemComponent bindingItem={bindingItem} key={bindingItem.id} />
                ))}
        </Fragment>
    );
}
