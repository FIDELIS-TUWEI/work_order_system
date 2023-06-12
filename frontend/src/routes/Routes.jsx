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
import Main from "../pages/dashboard/Main/Main";
import AdminHome from "../pages/AdminHome";
import UserHome from "../pages/UserHome";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/admin-home',
        element: <AdminHome />
    },{
        path: '/user-home',
        element: <UserHome />
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