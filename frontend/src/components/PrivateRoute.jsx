import { Navigate } from 'react-router-dom';
import { useUserDataMutation } from '../utils/redux/slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    
    const [userData] = useUserDataMutation();

    // get user
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUser = async () => {
        try {
            const res = await userData(
                { token: localStorage.getItem('userInfo') },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userInfo')}`
                    }
                }
                ).unwrap()
            if (res.data) {
                dispatch(userData(res.data.data));
            } else {
                <Navigate to="/login" />
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!userData) {
            getUser();
        }
    }, [userData, getUser]);

    if (localStorage.getItem('userInfo')) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;
