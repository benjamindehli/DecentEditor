"use client";

// Dependencies
import { createContext, useState } from "react";

// Classes
import { DecentSampler } from "@/classes/DecentSampler";

const DecentSamplerContext = createContext({
    decentSampler: {},
    initDecentSampler: function (decentSamplerElement) {}
});

export function DecentSamplerContextProvider({ children }) {
    const [decentSampler, setDecentSampler] = useState(null);

    function initDecentSamplerHandler(decentSamplerElement) {
        let decentSampler;
        if (decentSamplerElement) {
            decentSampler = new DecentSampler(null, decentSamplerElement?.$$, decentSamplerElement?.["#name"]);
        } else {
            decentSampler = new DecentSampler();
            decentSampler.createNewPreset();
        }
        decentSampler.init(decentSampler);
        setDecentSampler(decentSampler);
    }

    const context = {
        decentSampler: decentSampler,
        initDecentSampler: initDecentSamplerHandler
    };

    return <DecentSamplerContext.Provider value={context}>{children}</DecentSamplerContext.Provider>;
}

export default DecentSamplerContext;
