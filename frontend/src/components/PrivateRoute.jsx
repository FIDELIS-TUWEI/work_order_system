import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

//const PrivateRoute = () => {
//    const { userInfo } = useSelector(state => state.auth);
//    return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
//}
const PrivateRoute = ({ children }) => {
    if (localStorage.getItem('userInfo')) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;
