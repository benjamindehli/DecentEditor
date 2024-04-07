import { Fragment } from "react";
import { ColorItemComponent } from "./ColorItemComponent";

export function ColorListComponent({ colorList }) {
    return (
        <Fragment>
            {!!colorList?.length &&
                colorList.map((colorItem) => <ColorItemComponent colorItem={colorItem} key={colorItem.id} />)}
        </Fragment>
    );
}
