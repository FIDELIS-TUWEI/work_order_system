import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectToken, selectUserInfo } from '../utils/redux/slices/authSlice';

const PrivateRoute = ({ children }) => {
    const userInfo = useSelector(selectUserInfo);
    const token = useSelector(selectToken);

    if ( token) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;
