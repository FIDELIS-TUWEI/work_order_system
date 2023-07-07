import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from "react-pro-sidebar";
import LogIn from "./pages/LogIn";
import UserDashboard from "./pages/user/UserDashboard";
import UserRoute from "./components/UserRoute";
import Layout from "./pages/global/Layout";
import UserTasksHistory from "./pages/user/UserTasksHistory";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import DashCreateTask from "./pages/admin/tasks/DashCreateTask";

// Higher Order Component
const UserDashboardHOC = Layout(UserDashboard);
const UserTasksHistoryHOC = Layout(UserTasksHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);

function App() {
  return (
    <>
        <ToastContainer />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ProSidebarProvider>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search/location/:location" element={<Home />} />
                  <Route path="/search/:keyword" element={<Home />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/user/dashboard" element={<UserRoute><UserDashboardHOC /></UserRoute>} />
                  <Route path="/user/tasks" element={<UserRoute><UserTasksHistoryHOC /></UserRoute>} />
                  <Route path="/user/info" element={<UserRoute><UserInfoDashboardHOC /></UserRoute>} />
                  <Route path="/tasks/create" element={<DashCreateTask />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
              </ProSidebarProvider>
        </ThemeProvider>
    </>
  )
}

export default App