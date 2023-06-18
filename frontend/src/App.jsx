import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { themeSettings } from "./theme";
import { router } from "./routes/Routes";

function App() {
    // redux state
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return <div>
    <RouterProvider router={router}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
        </ThemeProvider>
    </RouterProvider>
  </div>
}

export default App