import { Fragment } from "react";
import { KeyboardItemComponent } from "./KeyboardItemComponent";

export function KeyboardListComponent({ keyboardList }) {
    return (
        <Fragment>
            {!!keyboardList?.length &&
                keyboardList.map((keyboardItem) => (
                    <KeyboardItemComponent keyboardItem={keyboardItem} key={keyboardItem.id} />
                ))}
        </Fragment>
    );
}
