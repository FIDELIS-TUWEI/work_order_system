import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import TasksPage from "../pages/TasksPage";
import UsersPage from "../pages/UsersPage";
import GetAllUsers from "../components/users/GetAllUsers";
import EditUser from "../components/users/EditUsers";
import AllTasks from "../components/tasks/AllTasks";
import UpdateTask from "../components/tasks/UpdateTask";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../components/users/Profile";

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