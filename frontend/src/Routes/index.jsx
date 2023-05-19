import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Layout from '../layouts/Layout';
import Profile from '../pages/profile/Profile';
import UserList from '../pages/userList/UserList';
import Tasks from '../pages/tasks/Tasks';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/home",
        element: <Layout />,
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/users",
        element: <UserList />,
    },
    {
        path: "/task",
        element: <Tasks />
    }
]);