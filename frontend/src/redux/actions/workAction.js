import axios from "axios";
import { WORK_LOAD_REQUEST, WORK_LOAD_SUCCESS, WORK_LOAD_FAIL, ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAIL } from "../constants/workConstants";
import { toast } from "react-toastify";

const url = "http://localhost:5000"

export const taskLoadAction = (pageNumber) => async(dispatch) => {
    dispatch({ type: WORK_LOAD_REQUEST })

    try {
        const { data } = await axios.get(`${url}/hin/tasks/show/?pageNumber=${pageNumber}`)
        dispatch({
            type: WORK_LOAD_SUCCESS,
            payload: data
       })
    } catch (error) {
        dispatch({
            type: WORK_LOAD_FAIL,
            payload: error.response.data.error
        })
    }
}

{/*export const addTaskAction = (task) => async (dispatch) => {
    dispatch({ type: ADD_TASK_REQUEST })

    try {
        const { data } = await axios.post(`${url}/tasks/create`, task)
        dispatch({
            type: ADD_TASK_SUCCESS,
            payload: data
        });
        toast.success("Task Created Successfully")

    } catch (error) {
        dispatch({
            type: ADD_TASK_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error)
    }
}*/}

