import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/Home'
import Error from './pages/Error'
import SharedLayout from './pages/SharedLayout';
import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from './pages/Dashboard'

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/signup' element={<SignUp />} />

          <Route path='dashboard' 
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<Error />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
