// Dependencies
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

// Stylesheets
import "@/app/globals.css";

// Theme
import theme from "@/theme";

export const metadata = {
  title: "DecentEditor",
  description: "Editor for DecentSampler preset files",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <body>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
  );
}
