import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectToken, selectUserInfo } from '../utils/redux/slices/authSlice';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const userInfo = useSelector(selectUserInfo);
    const token = useSelector(selectToken);

    useEffect(() => {
        // check if cookie has expired
        const cookieValue = Cookies.get("cookieExpiry");

        if (cookieValue && new Date(cookieValue) < new Date()) {
            Cookies.remove("cookieExpiry");
            window.location.reload();
        }
    }, [token]);

    if (userInfo && token) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;
