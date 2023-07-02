import axios from "axios";
import { toast } from 'react-toastify';
import {  
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL, 
    USER_LOGOUT_FAIL, 
    USER_LOGOUT_REQUEST, 
    USER_LOGOUT_SUCCESS
} from "../constants/userConstant";

// User Login Action
export const userSignInAction = (user) => async(dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST })

    try {
        const { data } = await axios.post(`/hin/login`, user);
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Succesful")
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error)
    }
}

// User Logout Action
export const userLogoutAction = () => async(dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });

    try {
        const { data } = await axios.get("/hin/logout");
        localStorage.removeItem("userInfo");
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log Out Succesfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}