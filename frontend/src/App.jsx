import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogIn from "./features/LogIn";
import DashCreateTask from "./pages/admin/CreateTask";
import DashTasks from "./pages/admin/Tasks";
import DashCreateUsers from "./pages/admin/CreateUsers";
import DashUsers from "./pages/admin/Users";
import Dashboard from "./pages/global/Dashboard";


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
                  <Route path="/tasks/create" element={<DashCreateTask />} />
                  <Route path="/tasks/list" element={<DashTasks />} />
                  <Route path="/users/create" element={<DashCreateUsers />} />
                  <Route path="/users/list" element={<DashUsers />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
        </ThemeProvider>
    </>
  )
}

export default App