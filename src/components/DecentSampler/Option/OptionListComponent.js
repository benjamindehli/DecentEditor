import { Fragment } from "react";
import { OptionItemComponent } from "./OptionItemComponent";

export function OptionListComponent({ optionList }) {
    return (
        <Fragment>
            {!!optionList?.length &&
                optionList.map((optionItem) => <OptionItemComponent optionItem={optionItem} key={optionItem.id} />)}
        </Fragment>
    );
}
