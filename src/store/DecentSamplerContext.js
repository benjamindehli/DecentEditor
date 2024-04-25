"use client";

// Dependencies
import { createContext, useState } from "react";

// Classes
import { DecentSampler } from "@/classes/DecentSampler";

// Functions
import { updateStore } from "@/functions/store";

const DecentSamplerContext = createContext({
    decentSampler: {},
    initDecentSampler: function (decentSamplerElement) {},
    updateDecentSamplerElement: function (decentSamplerElement) {}
});

export function DecentSamplerContextProvider({ children }) {
    const [decentSampler, setDecentSampler] = useState(null);

    function initDecentSamplerHandler(decentSamplerElement) {
        let decentSampler;
        if (decentSamplerElement){
            decentSampler = new DecentSampler(null, decentSamplerElement?.$$, decentSamplerElement?.["#name"]);
        } else {
            decentSampler = new DecentSampler();
            decentSampler.createNewPreset();
        }
        decentSampler.init(decentSampler);
        setDecentSampler(decentSampler);
    }

    function updateDecentSamplerElementHandler(decentSamplerElement) {
        const updatedDecentSampler = updateStore(decentSampler, decentSamplerElement);
        setDecentSampler(new DecentSampler(updatedDecentSampler));
    }

    const context = {
        decentSampler: decentSampler,
        initDecentSampler: initDecentSamplerHandler,
        updateDecentSamplerElement: updateDecentSamplerElementHandler
    };

    return <DecentSamplerContext.Provider value={context}>{children}</DecentSamplerContext.Provider>;
}

export default DecentSamplerContext;
