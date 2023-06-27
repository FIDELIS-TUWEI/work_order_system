import axios from "axios";
import { WORK_LOAD_REQUEST, WORK_LOAD_SUCCESS, WORK_LOAD_FAIL } from "../constants/workConstants";

export const taskLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async(dispatch) => {
    dispatch({ type: WORK_LOAD_REQUEST })

    try {
        const { data } = await axios.get(`/hin/tasks/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
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