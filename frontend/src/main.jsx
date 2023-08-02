import React from 'react'
import ReactDOM from 'react-dom/client';
import App from "./App"
import { Provider } from 'react-redux';
import store from './utils/redux/store';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider,  
} from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './features/LogIn';
import Dashboard from './pages/global/Dashboard';
import Tasks from './pages/admin/Tasks';
import Users from './pages/admin/Users';
import CreateUsers from './pages/admin/CreateUsers';
import CreateTask from './pages/admin/CreateTask';
import EditUser from './pages/admin/EditUser';
import EditTask from './pages/admin/EditTask';
import NotFound from './pages/NotFound';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import PrivateHome from './pages/PrivateHome';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index={true} path="/" element={ <Home /> } />
      <Route path="/login" element={ <PublicRoute> <LogIn /> </PublicRoute>} />
      <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
      <Route path="/private" element={ <PrivateHome /> } />
      <Route path="/tasks/list" element={ <Tasks /> } />
      <Route path="/users/list" element={ <Users /> } />
      <Route path="/users/create" element={ <CreateUsers /> } />
      <Route path="/tasks/create" element={ <CreateTask /> } />
      <Route path="/users/edit/:id" element={ <EditUser /> } />
      <Route path="/tasks/edit/:id" element={ <EditTask /> } />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
          <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>

)
