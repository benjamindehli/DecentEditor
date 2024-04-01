import { v4 as uuidv4 } from "uuid";

export class Sample {
    constructor(props, sample) {
        this.id = uuidv4();
        this.elementType = "sample";
        this.loNote = props?.loNote;
        this.hiNote = props?.hiNote;
        this.rootNote = props?.rootNote;
        this.path = props?.path;
        this.sampleRate = props?.sampleRate;
        this.pitchKeyTrack = props?.pitchKeyTrack;
        this.loopEnabled = props?.loopEnabled;
    }
    toJson() {
        return {
            $: {
                loNote: this.loNote,
                hiNote: this.hiNote,
                rootNote: this.rootNote,
                path: this.path,
                sampleRate: this.sampleRate,
                pitchKeyTrack: this.pitchKeyTrack,
                loopEnabled: this.loopEnabled
            }
        };
    }
}
