import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./features/LogIn";
import Dashboard from "./pages/global/Dashboard";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/admin/Tasks";
import Users from "./pages/admin/Users";


function App() {
  return (
    <>
        <ToastContainer />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/tasks/list" element={<Tasks />} />
              <Route path="/users/list" element={<Users />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </ThemeProvider>
    </>
  )
}

export default App;