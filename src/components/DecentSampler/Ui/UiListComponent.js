import { Fragment } from "react";
import { UiItemComponent } from "./UiItemComponent";

export function UiListComponent({ uiList }) {
    function handleUpdateUiList(updatedUiItem) {
        console.log({ updatedUiItem });
    }
    
    return (
        <Fragment>
            {!!uiList?.length &&
                uiList.map((uiItem) => (
                    <UiItemComponent uiItem={uiItem} onUpdateGroupsItem={handleUpdateUiList} key={uiItem.id} />
                ))}
        </Fragment>
    );
}
