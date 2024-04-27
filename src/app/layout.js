// Material UI
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

// Store
import { DecentSamplerContextProvider } from "@/store/DecentSamplerContext";
import { ColorModeContextProvider } from "@/store/ColorModeContext";

// Stylesheets
import "@/app/globals.css";

export const metadata = {
    title: "DecentEditor",
    description: "Editor for DecentSampler preset files"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <ColorModeContextProvider>
                        <DecentSamplerContextProvider>
                            <CssBaseline />
                            {children}
                        </DecentSamplerContextProvider>
                    </ColorModeContextProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
