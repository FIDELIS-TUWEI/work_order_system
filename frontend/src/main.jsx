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
import NotFound from './pages/NotFound';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import PrivateHome from './pages/PrivateHome';
import Profile from './pages/admin/Profile';
import WorkOrder from './pages/admin/WorkOrder';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index={true} path="/" element={ <Home /> } />
      <Route path="/login" element={ <PublicRoute> <LogIn /> </PublicRoute>} />
      <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
      <Route path="/private" element={ <PrivateRoute> <PrivateHome /> </PrivateRoute> } />
      <Route path="/work/list" element={ <PrivateRoute> <WorkOrder /> </PrivateRoute> } />
      <Route path="/profile" element={ <PrivateRoute> <Profile /> </PrivateRoute> } />
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
