import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home"
import AdminDashboard from "../pages/admin/AdminDashboard";
import UsersDashboard from "../pages/admin/users/UsersDashboard";

import Register from "../pages/auth/Register"
import Login from "../pages/auth"

import AddTask from "../pages/admin/tasks/AddTask";
import AllTasks from "../pages/admin/tasks/AllTasks";

import EditUser from "../pages/admin/users/EditUsers";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/admin-dashboard',
        element: <AdminDashboard />
    },{
        path: '/user-dashboard',
        element: <UsersDashboard />
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
        path: '/users',
        element: <Users />
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