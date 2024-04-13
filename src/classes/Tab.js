// Dependencies
import { v4 as uuidv4 } from "uuid";

// Classes
import { Button } from "./Button";

export class Tab {
    constructor(props, buttonList, controlList, imageList, labelList, labeledKnobList, menuList) {
        this.id = props?.id || uuidv4();
        this.elementType = "tab";
        this.name = props?.name;
        this.buttons = buttonList?.map((button) => new Button({ ...button.$ }, button.state));
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
        return jsonObject;
        
    }
}
