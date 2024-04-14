// Dependencies
import { v4 as uuidv4 } from "uuid";

// Classes
import { Button } from "./Button";
import { Menu } from "./Menu";
import { Image } from "./Image";

export class Tab {
    constructor(props, buttonList, controlList, imageList, labelList, labeledKnobList, menuList) {
        this.id = props?.id || uuidv4();
        this.elementType = "tab";
        this.name = props?.name;
        this.buttons = buttonList?.map((button) => new Button({ ...button.$ }, button.state));
        this.images = imageList?.map((image) => new Image({ ...image.$ }));
        this.menus = menuList?.map((menu) => new Menu({ ...menu.$ }, menu.option));
    }
    toJson() {
        const jsonObject = {
            $: {
                name: this.name
            }
        };
        if (this.buttons?.length) {
            jsonObject.button = this.buttons?.map((button) => button.toJson());
        }
        if (this.images?.length) {
            jsonObject.image = this.images?.map((image) => image.toJson());
        }
        if (this.menus?.length) {
            jsonObject.menu = this.menus?.map((menu) => menu.toJson());
        }
        return jsonObject;
    }
}
