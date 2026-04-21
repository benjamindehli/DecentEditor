// Dependencies
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

// Functions
import { formatXml, jsonToXml } from "@/functions/converters";

export class Tag {
    constructor(props, elementType, parentHierarchyPath) {
        const id = props?.id || uuidv4();
        const hierarchyPath = props?.hierarchyPath || [...parentHierarchyPath, id];
        this.id = id;
        this.hierarchyPath = hierarchyPath;
        this.elementType = props?.elementType || elementType;
        this.enabled = props?.enabled;
        this.name = props?.name;
        this.volume = props?.volume;
        this.polyphony = props?.polyphony;
    }
    toJson(decentSampler) {
        const jsonObject = {
            $: {
                enabled: this.enabled,
                name: this.name,
                volume: this.volume,
                polyphony: this.polyphony
            }
        };
        jsonObject["#name"] = this.elementType;
        return jsonObject;
    }
    toXml(decentSampler) {
        const xmlBody = jsonToXml(this.toJson(decentSampler));
        const xmlDoc = formatXml(xmlBody);
        return xmlDoc;
    }
}

Tag.propTypes = {
    id: PropTypes.string,
    enabled: PropTypes.bool,
    name: PropTypes.string,
    volume: PropTypes.number,
    polyphony: PropTypes.number
};
