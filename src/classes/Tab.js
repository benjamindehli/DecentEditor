// Dependencies
import { v4 as uuidv4 } from "uuid";

// Classes
import { Button } from "./Button";

export class Tab {
    constructor(props, buttonList, controlList, imageList, labelList, labeledKnobList, menuList) {
        this.id = props?.id || uuidv4();
        this.elementType = "tab";
        this.name = props?.name;
        this.button = buttonList?.map((button) => new Button({ ...button.$ }, button.state));
    }
    toJson() {
        const jsonObject = {
            $: {
                name: this.name
            }
        };
        if (this.button?.length) {
            jsonObject.button = this.button?.map((button) => button.toJson());
        }
        return jsonObject;
        
    }
}
