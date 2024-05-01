// Dependencies
import { useContext } from "react";

// Material UI
import { Autocomplete, Chip, FormControl, FormHelperText, TextField } from "@mui/material";

// Functions
import { capitalizeFirstLetter } from "@/functions/helpers";

// Store
import DecentSamplerContext from "@/store/DecentSamplerContext";

export default function DefaultTagsField({ id, name, label, getDefaultValue, helperText, autoFocus, onChange }) {
    const decentSamplerContext = useContext(DecentSamplerContext);

    function getTagsInUse() {
        const getTagsInUse = [];
        const decentSampler = decentSamplerContext.decentSampler;
        const groupsItem = decentSampler.getFirstGroupsItem();
        const tabItem = decentSampler.getFirstUiItem()?.getFirstTabItem();
        const midiItem = decentSampler.getFirstMidiItem();
        const modulatorsItem = decentSampler.getFirstModulatorsItem();
        const tagsItem = decentSampler.getFirstTagsItem();

        // Get group tags
        const groupItems = groupsItem?.getGroupItems();
        groupItems?.length && // Group items
            groupItems.forEach((group) => {
                group.getTags()?.forEach((tag) => {
                    if (!getTagsInUse.includes(tag)) {
                        getTagsInUse.push(tag);
                    }
                });
                // Get group sample tags
                const sampleItems = group.getSampleItems();
                sampleItems?.length && // Sample items inside group item
                    sampleItems.forEach((sample) => {
                        sample.getTags()?.forEach((tag) => {
                            if (!getTagsInUse.includes(tag)) {
                                getTagsInUse.push(tag);
                            }
                        });
                    });
            });

        // Get sample tags
        const sampleItems = groupsItem?.getGroupItems();
        sampleItems?.length && // Sample items
            sampleItems.forEach((sample) => {
                sample.getTags()?.forEach((tag) => {
                    if (!getTagsInUse.includes(tag)) {
                        getTagsInUse.push(tag);
                    }
                });
            });

        // Get button state binding tags
        const buttonItems = tabItem?.getButtonItems();
        buttonItems?.length && // Button items
            buttonItems.forEach((button) => {
                const stateItems = button.getStateItems();
                stateItems?.length && // State items inside button item
                    stateItems.forEach((state) => {
                        const bindingItems = state.getBindingItems();
                        bindingItems?.length && // Binding items inside state item
                            bindingItems.forEach((binding) => {
                                binding.getTags()?.forEach((tag) => {
                                    if (!getTagsInUse.includes(tag)) {
                                        getTagsInUse.push(tag);
                                    }
                                });
                            });
                    });
            });

        // Get control binding tags
        const controlItems = tabItem?.getControlItems();
        controlItems?.length && // Control items
            controlItems.forEach((control) => {
                const bindingItems = control.getBindingItems();
                bindingItems?.length && // Binding items inside control item
                    bindingItems.forEach((binding) => {
                        binding.getTags()?.forEach((tag) => {
                            if (!getTagsInUse.includes(tag)) {
                                getTagsInUse.push(tag);
                            }
                        });
                    });
            });

        // Get labeled knob binding tags
        const labeledKnobItems = tabItem?.getLabeledKnobItems();
        labeledKnobItems?.length && // Labeled knob items
            labeledKnobItems.forEach((labeledKnob) => {
                const bindingItems = labeledKnob.getBindingItems();
                bindingItems?.length && // Binding items inside labeled knob item
                    bindingItems.forEach((binding) => {
                        binding.getTags()?.forEach((tag) => {
                            if (!getTagsInUse.includes(tag)) {
                                getTagsInUse.push(tag);
                            }
                        });
                    });
            });

        // Get menu option tags
        const menuItems = tabItem?.getMenuItems();
        menuItems?.length && // Menu items
            menuItems.forEach((menu) => {
                const optionItems = menu.getOptionItems();
                optionItems?.length && // Option items inside menu item
                    optionItems.forEach((option) => {
                        const bindingItems = option.getBindingItems();
                        bindingItems?.length && // Binding items inside option item
                            bindingItems.forEach((binding) => {
                                binding.getTags()?.forEach((tag) => {
                                    if (!getTagsInUse.includes(tag)) {
                                        getTagsInUse.push(tag);
                                    }
                                });
                            });
                    });
            });

        // Get CC binding tags
        const ccItems = midiItem?.getCcItems();
        ccItems?.length && // CC items
            ccItems.forEach((cc) => {
                const bindingItems = cc.getBindingItems();
                bindingItems?.length && // Binding items inside CC item
                    bindingItems.forEach((binding) => {
                        binding.getTags()?.forEach((tag) => {
                            if (!getTagsInUse.includes(tag)) {
                                getTagsInUse.push(tag);
                            }
                        });
                    });
            });

        // Get note binding tags
        const noteItems = midiItem?.getNoteItems();
        noteItems?.length && // Note items
            noteItems.forEach((note) => {
                const bindingItems = note.getBindingItems();
                bindingItems?.length && // Binding items inside note item
                    bindingItems.forEach((binding) => {
                        binding.getTags()?.forEach((tag) => {
                            if (!getTagsInUse.includes(tag)) {
                                getTagsInUse.push(tag);
                            }
                        });
                    });
            });

        // Get LFO binding tags
        const lfoItems = modulatorsItem?.getLfoItems();
        lfoItems?.length && // LFO items
            lfoItems.forEach((lfo) => {
                const bindingItems = lfo.getBindingItems();
                bindingItems?.length && // Binding items inside LFO item
                    bindingItems.forEach((binding) => {
                        binding.getTags()?.forEach((tag) => {
                            if (!getTagsInUse.includes(tag)) {
                                getTagsInUse.push(tag);
                            }
                        });
                    });
            });

        // Get envelope binding tags
        const envelopeItems = modulatorsItem?.getEnvelopeItems();
        envelopeItems?.length && // Envelope items
            envelopeItems.forEach((envelope) => {
                const bindingItems = envelope.getBindingItems();
                bindingItems?.length && // Binding items inside envelope item
                    bindingItems.forEach((binding) => {
                        binding.getTags()?.forEach((tag) => {
                            if (!getTagsInUse.includes(tag)) {
                                getTagsInUse.push(tag);
                            }
                        });
                    });
            });

        // Get tags
        const tagItems = tagsItem?.getTagItems();
        tagItems?.length && // Tag items
            tagItems.forEach((tag) => {
                if (tag?.name?.length && !getTagsInUse.includes(tag.name)) {
                    getTagsInUse.push(tag.name);
                }
            });

        return getTagsInUse.sort();
    }

    function handleOnChange(event, newValue) {
        let newTags = [];
        newValue.forEach((tag) => {
            newTags = [...newTags, ...tag.split(",").filter((tag) => tag.trim().length)];
        });
        onChange(newTags.join(","));
    }

    const labelWithFallback = label || capitalizeFirstLetter(name);
    const idWithFallback = id || name;
    const helperTextId = `${idWithFallback}-helper-text`;

    const defaultValue = !!getDefaultValue?.(name)?.length ? getDefaultValue(name).split(",") : [];

    return (
        <FormControl margin="dense" fullWidth variant="outlined">
            <Autocomplete
                freeSolo
                multiple
                autoSelect
                id={idWithFallback}
                name={name}
                defaultValue={defaultValue}
                autoFocus={autoFocus}
                aria-describedby={helperTextId}
                options={getTagsInUse()}
                onChange={handleOnChange}
                renderTags={(value, getTagProps) =>
                    value.map((tag, index) => (
                        <Chip {...getTagProps({ index })} key={index} variant="outlined" label={tag} />
                    ))
                }
                renderInput={(params) => <TextField {...params} label={labelWithFallback} />}
            />
            <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
        </FormControl>
    );
}
