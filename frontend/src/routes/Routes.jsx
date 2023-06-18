import { createBrowserRouter } from "react-router-dom";
import Layout from "../scenes/layout/Layout";
import Dashboard from "../scenes/dashboard/Dashboard";
import AdminDashboard from "../scenes/dashboard/AdminDashboard";


import Register from "../pages/auth/Register"
import Login from "../pages/auth/Login"

import AddTask from "../pages/admin/tasks/AddTask";
import AllTasks from "../pages/admin/tasks/AllTasks";
import UpdateTask from "../pages/admin/tasks/UpdateTask";

import EditUser from "../pages/admin/users/EditUsers";
import GetAllUsers from "../pages/admin/users/GetAllUsers";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/admin",
                element: <AdminDashboard />
            }
        ]
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/addtasks',
        element: <AddTask />
    },
    {
        path: '/alltasks',
        element: <AllTasks />
    },
    {
        path: '/update/:id',
        element: <UpdateTask />
    },
    {
        path: '/allusers',
        element: <GetAllUsers />
    },
    {
        path: '/edit/:id',
        element: <EditUser />
    }
])