import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    if (localStorage.getItem('userInfo')) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;
