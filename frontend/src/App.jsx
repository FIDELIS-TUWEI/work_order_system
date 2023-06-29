import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/location/:location" element={<Home />} />
                <Route path="/search/:keyword" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ThemeProvider>
    </>
  )
}

export default App