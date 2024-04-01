// Dependencies
import { Fragment, useState } from "react";

// Material UI
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";

// Classes
import { Sample } from "@/classes/Sample";

// Components
import { SampleComponent } from "@/components/DecentSampler/SampleComponent";

export function GroupComponent({ group, onUpdateGroup, onSelectElement }) {
  const [isExpanded, setIsExpanded] = useState(false);
  function addSample() {
    const sample = new Sample();
    group.samples.push(sample);
    onUpdateGroup(group);
  }

  function handleUpdateSample(updatedSample) {
    const sampleIndex = group.samples.findIndex((sample) => sample.id === updatedSample.id);
    group.samples[sampleIndex] = updatedSample;
    onUpdateGroup(group);
  }

  const groupActionButtons = (
    <Fragment>
      <button>Remove group</button>
    </Fragment>
  );

  const samplesActionButtons = (
    <Fragment>
      <button onClick={addSample}>Add sample</button>
      <button>Add multiple samples</button>
    </Fragment>
  );

  const effectsActionButtons = (
    <Fragment>
      <button>Add effect</button>
    </Fragment>
  );

  return (
    <Fragment>
      <ListItemButton sx={{ pl: 4 }} onClick={() => setIsExpanded(!isExpanded)}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="Group" />
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListSubheader sx={{ pl: 8 }} component="div" id="nested-list-subheader">
            Effects
          </ListSubheader>
          {!!group?.effects?.length &&
            group.effects.map((effect) => {
              return "Effect";
            })}
        </List>
        <List component="div" disablePadding>
          <ListSubheader sx={{ pl: 8 }} component="div" id="nested-list-subheader">
            Samples
          </ListSubheader>
          {!!group?.samples?.length &&
            group.samples.map((sample) => {
              return (
                <SampleComponent
                  key={sample.id}
                  sampleItem={sample}
                  onUpdateSample={(updatedSample) => handleUpdateSample(updatedSample)}
                  onSelectElement={onSelectElement}
                />
              );
            })}
        </List>
      </Collapse>
    </Fragment>
  );
}

/*
        <Accordion title="Group" type="group" actionButtons={groupActionButtons}>
            <AccordionContent>
                <Accordion title="Effects" type="effects" actionButtons={effectsActionButtons}></Accordion>
                <Accordion
                    title={`Samples (${group?.samples?.length || 0})`}
                    type="samples"
                    actionButtons={samplesActionButtons}
                >
                    <AccordionContent>
                        {group?.samples?.length &&
                            group.samples.map((sample) => {
                                return (
                                    <SampleComponent
                                        key={sample.id}
                                        sample={sample}
                                        onUpdateSample={(updatedSample) => handleUpdateSample(updatedSample)}
                                    />
                                );
                            })}
                    </AccordionContent>
                </Accordion>
            </AccordionContent>
        </Accordion>
                        */
