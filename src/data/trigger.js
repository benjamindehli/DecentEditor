const triggerOptions = [
    {
        label: "Attack",
        value: "attack",
        description: "The sample is played when a note on message is received."
    },
    {
        label: "Release",
        value: "release",
        description: "The sample is played when a note off message is received"
    },
    {
        label: "First",
        value: "first",
        description: "the sample will only be played if no other notes are playing"
    },
    {
        label: "Legato",
        value: "legato",
        description: "The sample will only be played if some other notes are already playing"
    }
];

export default triggerOptions;
