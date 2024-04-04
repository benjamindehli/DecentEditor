import { Fragment } from "react";
import { SampleItemComponent } from "./SampleItemComponent";

export function SampleListComponent({ sampleList }) {
    return (
        <Fragment>
            {!!sampleList?.length &&
                sampleList.map((sampleItem) => (
                    <SampleItemComponent
                        sampleItem={sampleItem}
                        key={sampleItem.id}
                    />
                ))}
        </Fragment>
    );
}
