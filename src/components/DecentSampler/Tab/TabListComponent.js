import { Fragment } from "react";
import { TabItemComponent } from "./TabItemComponent";

export function TabListComponent({ tabList }) {
    return (
        <Fragment>
            {!!tabList?.length &&
                tabList.map((tabItem) => (
                    <TabItemComponent tabItem={tabItem} key={tabItem.id} />
                ))}
        </Fragment>
    );
}
