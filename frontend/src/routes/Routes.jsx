import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Auth from "../pages/Auth";
import TasksPage from "../pages/TasksPage";
import UsersPage from "../pages/UsersPage";
import GetAllUsers from "../components/users/GetAllUsers";
import EditUser from "../components/users/EditUsers";
import AllTasks from "../components/tasks/AllTasks";
import UpdateTask from "../components/tasks/UpdateTask";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../components/users/Profile";
import Main from "../pages/dashboard/Main/Main";
import Users from "../pages/dashboard/users/Users";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/main',
        element: <Main />
    },
    {
        path: '/people',
        element: <Users />
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
        element: <TasksPage />
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
        path: '/profile',
        element: <Profile />
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
        path: '/edit/:id',
        element: <EditUser />
    }
])