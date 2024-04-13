import { Fragment } from "react";
import { ButtonItemComponent } from "./ButtonItemComponent";

export function ButtonListComponent({ buttonList }) {
    return (
        <Fragment>
            {!!buttonList?.length &&
                buttonList.map((buttonItem) => <ButtonItemComponent buttonItem={buttonItem} key={buttonItem.id} />)}
        </Fragment>
    );
}
