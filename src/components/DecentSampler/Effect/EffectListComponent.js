import { Fragment } from "react";
import { EffectItemComponent } from "./EffectItemComponent";

export function EffectListComponent({ effectList }) {
    return (
        <Fragment>
            {!!effectList?.length &&
                effectList.map((effectItem) => (
                    <EffectItemComponent
                        effectItem={effectItem}
                        key={effectItem.id}
                    />
                ))}
        </Fragment>
    );
}
