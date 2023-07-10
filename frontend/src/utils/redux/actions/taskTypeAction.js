import axios from "axios";
import { WORK_TYPE_LOAD_FAIL, WORK_TYPE_LOAD_REQUEST, WORK_TYPE_LOAD_SUCCESS } from "../constants/taskTypeConstants";

const url = "http://localhost:5000"

export const taskTypeLoadAction = () => async(dispatch) => {
    dispatch({ type: WORK_TYPE_LOAD_REQUEST })

    try {
        const { data } = await axios.get(`${url}/hin/type/tasks`)
        dispatch({
            type: WORK_TYPE_LOAD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: WORK_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        })
    }
}