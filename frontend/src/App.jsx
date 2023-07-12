import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from "react-pro-sidebar";
import LogIn from "./features/LogIn";
import UserDashboard from "./pages/user/UserDashboard";
import UserRoute from "./components/UserRoute";
import Layout from "./pages/global/Layout";
import UserTasksHistory from "./pages/user/UserTasksHistory";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import DashCreateTask from "./pages/admin/tasks/DashCreateTask";
import DashTasks from "./pages/admin/tasks/DashTasks";
import DashCreateUsers from "./pages/admin/manager/DashCreateUsers";
import DashUsers from "./pages/admin/manager/DashUsers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/global/Dashboard";

// Higher Order Component
//const UserDashboardHOC = Layout(UserDashboard);
//const UserTasksHistoryHOC = Layout(UserTasksHistory);
//const UserInfoDashboardHOC = Layout(UserInfoDashboard);
//const AdminDashboardHOC = Layout(AdminDashboard);

function App() {
  return (
    <>
        <ToastContainer />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ProSidebarProvider>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/search/:keyword" element={<Home />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/user/dashboard" element={<UserRoute><UserDashboard /></UserRoute>} />
                  <Route path="/user/tasks" element={<UserRoute><UserTasksHistory /></UserRoute>} />
                  <Route path="/user/info" element={<UserRoute><UserInfoDashboard /></UserRoute>} />
                  <Route path="/tasks/create" element={<DashCreateTask />} />
                  <Route path="/tasks/list" element={<DashTasks />} />
                  <Route path="/users/create" element={<DashCreateUsers />} />
                  <Route path="/users/list" element={<DashUsers />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
              </ProSidebarProvider>
        </ThemeProvider>
    </>
  )
}

export default App