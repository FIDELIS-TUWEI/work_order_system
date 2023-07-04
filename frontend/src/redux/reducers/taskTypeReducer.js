import { WORK_TYPE_LOAD_FAIL, WORK_TYPE_LOAD_REQUEST, WORK_TYPE_LOAD_RESET, WORK_TYPE_LOAD_SUCCESS } from "../constants/taskTypeConstants"



export const loadWorkTypeReducer = (state = { TaskType:[] }, action) => {
    switch (action.type) {
        case WORK_TYPE_LOAD_REQUEST:
            return {loading:true}
        
        case WORK_TYPE_LOAD_SUCCESS: 
        return {
            loading: false,
            taskType: action.payload.taskT
        } 
        case WORK_TYPE_LOAD_FAIL: 
        return {
            loading: false,
            error: action.payload
        }
        case WORK_TYPE_LOAD_RESET: 
        return {}
        default:
            return state;
    }
}