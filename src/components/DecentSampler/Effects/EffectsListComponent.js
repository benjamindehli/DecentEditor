import { Fragment } from "react";
import { EffectsItemComponent } from "./EffectsItemComponent";

export function EffectsListComponent({ effectsList }) {
    return (
        <Fragment>
            {!!effectsList?.length &&
                effectsList.map((effectsItem) => (
                    <EffectsItemComponent effectsItem={effectsItem} key={effectsItem.id} />
                ))}
        </Fragment>
    );
}
