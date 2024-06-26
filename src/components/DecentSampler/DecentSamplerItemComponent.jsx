// Dependencies
import { Fragment } from "react";

// Material UI
import { List } from "@mui/material";

// Components
import { UiItemComponent } from "./Ui/UiItemComponent";
import { GroupsItemComponent } from "./Groups/GroupsItemComponent";
import { EffectsItemComponent } from "./Effects/EffectsItemComponent";
import { TagsItemComponent } from "./Tags/TagsItemComponent";
import { ModulatorsItemComponent } from "./Modulators/ModulatorsItemComponent";
import { NoteSequencesItemComponent } from "./NoteSequences/NoteSequencesItem";
import { MidiItemComponent } from "./Midi/MidiItemComponent";

export function DecentSamplerItemComponent({ decentSamplerItem }) {
    function renderChildElement(childElement) {
        switch (childElement?.elementType) {
            case "ui":
                return <UiItemComponent key={childElement.id} uiItem={childElement} />;
            case "groups":
                return <GroupsItemComponent key={childElement.id} groupsItem={childElement} />;
            case "effects":
                return <EffectsItemComponent key={childElement.id} effectsItem={childElement} />;
            case "midi":
                return <MidiItemComponent key={childElement.id} midiItem={childElement} />;
            case "modulators":
                return <ModulatorsItemComponent key={childElement.id} modulatorsItem={childElement} />;
            case "noteSequences":
                return <NoteSequencesItemComponent key={childElement.id} noteSequencesItem={childElement} />;
            case "tags":
                return <TagsItemComponent key={childElement.id} tagsItem={childElement} />;
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
