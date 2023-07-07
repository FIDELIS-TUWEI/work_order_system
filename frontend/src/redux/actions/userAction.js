import axios from "axios";
import { toast } from 'react-toastify';
import {  
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL, 
    USER_LOGOUT_FAIL, 
    USER_LOGOUT_REQUEST, 
    USER_LOGOUT_SUCCESS,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL
} from "../constants/userConstant";

const url = "http://localhost:5000"

// User Login Action
export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST })

    try {
        const { data } = await axios.post(`${url}/hin/login`, user);
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

// User Profile Action
{/*export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${url}/hin/info`);
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}*/}

// User Logout Action
export const userLogoutAction = () => async(dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });

    try {
        const { data } = await axios.get(`${url}/hin/logout`);
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