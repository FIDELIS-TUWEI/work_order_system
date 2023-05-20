import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import TasksPage from "../pages/TasksPage";
import UsersPage from "../pages/UsersPage";
import GetAllUsers from "../components/users/GetAllUsers";
import EditUser from "../components/users/EditUsers";

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
        element: <Login />
    },
    {
        path: '/tasks',
        element: <TasksPage />
    },
    {
        path: '/users',
        element: <UsersPage />
    },
    {
        path: '/allusers',
        element: <GetAllUsers />
    },
    {
        path: "/edit",
        element: <EditUser />
    }
])