import { v4 as uuidv4 } from "uuid";
import { Sample } from "./Sample";

export class Group {
    constructor(props, effects, sample) {
        this.id = uuidv4();
        this.elementType = "group";
        this.tags = props?.tags;
        this.silencingMode = props?.silencingMode;
        this.ampVelTrack = props?.ampVelTrack;
        this.volume = props?.volume;
        this.effects = [];
        this.samples = sample?.map((sample) => new Sample({ ...sample.$ }, sample.sample));
    }
    toJson() {
        return {
            $: {
                tags: this.tags,
                silencingMode: this.silencingMode,
                ampVelTrack: this.ampVelTrack,
                volume: this.volume
            },
            sample: this.samples?.map((sample) => sample.toJson())
        };
    }
}
