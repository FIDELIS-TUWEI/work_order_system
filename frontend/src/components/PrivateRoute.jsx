import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectToken, selectUserInfo } from '../utils/redux/slices/authSlice';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ children }) => {
    const [cookies] = useCookies(['logged_in']);

    if (!cookies.logged_in) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
    //const userInfo = useSelector(selectUserInfo);
    //const token = useSelector(selectToken);

    //if (userInfo && token) {
    //    return children;
    //} else {
    //    return <Navigate to="/login" />
    //}
}

export default PrivateRoute;
