import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectToken, selectUserInfo } from '../utils/redux/slices/authSlice';

const PrivateRoute = ({ children }) => {
    //const userInfo = useSelector(selectUserInfo);
    const userToken = useSelector(selectToken);

    if ( userToken) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;
