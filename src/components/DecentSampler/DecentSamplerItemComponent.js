// Dependencies
import { Fragment } from "react";

// Material UI
import { List } from "@mui/material";

// Components
import { UiItemComponent } from "./Ui/UiItemComponent";
import { GroupsItemComponent } from "./Groups/GroupsItemComponent";

export function DecentSamplerItemComponent({ decentSamplerItem }) {
    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "ui":
                return <UiItemComponent key={childElement.id} uiItem={childElement} />;
            case "groups":
                return <GroupsItemComponent key={childElement.id} groupsItem={childElement} />;
            default:
                return null;
        }
    }

    return (
        <Fragment>
            <List
                sx={{
                    width: "100%",
                    bgcolor: "background.paper"
                }}
                component="nav"
                disablePadding
                dense
            >
                {decentSamplerItem?.childElements?.length &&
                    decentSamplerItem.childElements.map((childElement) => renderChildElement(childElement))}
            </List>
        </Fragment>
    );
}
