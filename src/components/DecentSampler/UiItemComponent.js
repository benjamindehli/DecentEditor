import { Accordion } from "../Template/Accordion";

export function UiItemComponent({ uiItem, onUpdateUiItem }) {
    {/*}
    function handleUpdateUiItem(updatedUiItem) {
        onUpdateUiItem(updatedUiItem);
    }
*/}
    return (
        <Accordion title={uiItem.name} type="ui">
           {/* <UiItemSettingsComponent uiItem={uiItem} onUpdateUiItem={handleUpdateUiItem} />*/}
        </Accordion>
    );
}