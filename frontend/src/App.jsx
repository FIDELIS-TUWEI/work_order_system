import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
        <ToastContainer />
        <ThemeProvider theme={theme}>
            <CssBaseline />  
        </ThemeProvider>
    </>
  )
}

export default App;