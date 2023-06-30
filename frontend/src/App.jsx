import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
        <ToastContainer toast={toast} />
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