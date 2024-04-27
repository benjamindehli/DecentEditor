"use client";

// Dependencies
const { createContext, useMemo, useState } = require("react");

// Material UI
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ColorModeContextProvider({ children }) {
    const [mode, setMode] = useState("dark");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            }
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode
                }
            }),
        [mode]
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default ColorModeContext;

