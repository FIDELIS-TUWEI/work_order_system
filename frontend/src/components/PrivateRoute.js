import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  if (localStorage.getItem("userInfo")) {
        return children;
    }
    return <Navigate to="/" />
}
