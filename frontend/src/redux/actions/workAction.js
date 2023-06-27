import axios from "axios";
import { JOB_LOAD_REQUEST, JOB_LOAD_SUCCESS, JOB_LOAD_FAIL } from "../constants/workConstants";

export const taskLoadAction = (pageNumber, keyword = '', cat = '') => async(dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST })

    try {
        const { data } = await axios.get(`/hin/tasks/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}`)
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        })
    }
}