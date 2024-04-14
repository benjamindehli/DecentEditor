import { Fragment } from "react";
import { MenuItemComponent } from "./MenuItemComponent";

export function MenuListComponent({ menuList }) {
    return (
        <Fragment>
            {!!menuList?.length &&
                menuList.map((menuItem) => <MenuItemComponent menuItem={menuItem} key={menuItem.id} />)}
        </Fragment>
    );
}
