import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Auth from "../pages/Auth";
import Tasks from "../pages/dashboard/tasks/Tasks";
import Users from "../pages/dashboard/users/Users";
import GetAllUsers from "../components/users/GetAllUsers";
import EditUser from "../components/users/EditUsers";
import AllTasks from "../components/tasks/AllTasks";
import UpdateTask from "../components/tasks/UpdateTask";
import Dashboard from "../pages/dashboard/Dashboard";
import Main from "../pages/dashboard/Main/Main";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Auth />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/addtasks',
        element: <Tasks />
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
        path: '/main',
        element: <Main />
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