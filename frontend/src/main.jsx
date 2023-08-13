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
import Home from './pages/home/Home';
import LogIn from './pages/LogIn';
import NotFound from './pages/NotFound';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/admin/users/Profile';
import Analytics from './pages/admin/reports/Analytics';
import Register from './pages/admin/users/Register';
import UsersAll from './pages/admin/users/UsersAll';
import EditUser from './pages/admin/users/EditUser';
import AllWorkOrders from './pages/admin/workOrders/AllWorkOrders';
import CreateWorkOrder from './pages/admin/workOrders/CreateWorkOrder';
import EditWorkOrder from './pages/admin/workOrders/EditWorkOrder';
import WorkDetails from './pages/admin/workOrders/workDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index={true} path="/" element={<PublicRoute> <Home /> </PublicRoute>} />
      <Route path="/login" element={ <PublicRoute> <LogIn /> </PublicRoute>} />
      <Route path="/private" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
      <Route path="/work/list" element={ <PrivateRoute> <AllWorkOrders /> </PrivateRoute> } />
      <Route path="/new/work" element={ <PrivateRoute> <CreateWorkOrder /> </PrivateRoute> } />
      <Route path="/work/details/:id" element={ <PrivateRoute> <WorkDetails /> </PrivateRoute> } />
      <Route path="/edit/work/:id" element={ <PrivateRoute> <EditWorkOrder /> </PrivateRoute> } />
      <Route path="/users/all" element={ <PrivateRoute> <UsersAll/> </PrivateRoute> } />
      <Route path="/users/register" element={ <PrivateRoute> <Register/> </PrivateRoute> } />
      <Route path="/work/analytics" element={ <PrivateRoute> <Analytics /> </PrivateRoute> } />
      <Route path="/profile" element={ <PrivateRoute> <Profile /> </PrivateRoute> } />
      <Route path="/edit/user/:id" element={ <PrivateRoute> <EditUser /> </PrivateRoute> } />
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
