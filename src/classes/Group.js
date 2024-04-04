import { v4 as uuidv4 } from "uuid";
import { Sample } from "./Sample";

export class Group {
    constructor(props, effects, sample) {
        this.id = props.id || uuidv4();
        this.elementType = "group";
        this.enabled = props?.enabled;
        this.tags = props?.tags;
        this.silencingMode = props?.silencingMode;
        this.ampVelTrack = props?.ampVelTrack;
        this.groupTuning = props?.groupTuning;
        this.volume = props?.volume;
        this.trigger = props?.trigger;
        this.effects = [];
        this.samples = props.samples || sample?.map((sample) => new Sample({ ...sample.$, groupId: this.id }, sample.sample));
    }
    toJson() {
        return {
            $: {
                enabled: this.enabled,
                tags: this.tags,
                silencingMode: this.silencingMode,
                ampVelTrack: this.ampVelTrack,
                groupTuning: this.groupTuning,
                volume: this.volume,
                trigger: this.trigger
            },
            sample: this.samples?.map((sample) => sample.toJson())
        };
    }
    newSample() {
        this.samples.push(new Sample({}));
    }
    addSample(sample) {
        this.samples.push(sample);
    }
}
