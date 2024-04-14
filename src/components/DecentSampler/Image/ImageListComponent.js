import { Fragment } from "react";
import { ImageItemComponent } from "./ImageItemComponent";

export function ImageListComponent({ imageList }) {
    return (
        <Fragment>
            {!!imageList?.length &&
                imageList.map((imageItem) => <ImageItemComponent imageItem={imageItem} key={imageItem.id} />)}
        </Fragment>
    );
}
