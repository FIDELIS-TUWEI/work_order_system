import { ADD_TASK_FAIL, ADD_TASK_REQUEST, ADD_TASK_RESET, ADD_TASK_SUCCESS, WORK_LOAD_FAIL, WORK_LOAD_REQUEST, WORK_LOAD_RESET, WORK_LOAD_SUCCESS } from "../constants/workConstants"


export const loadWorkReducer = (state = { data:  []}, action) => {
    switch (action.type) {
        case WORK_LOAD_REQUEST:
            return {loading:true}
        
        case WORK_LOAD_SUCCESS: 
        return {
            loading: false,
            success: action.payload.success,
            page: action.payload.page,
            pages: action.payload.pages,
            count: action.payload.count,
            data: action.payload
        } 
        case WORK_LOAD_FAIL: 
        return {
            loading: false,
            error: action.payload
        }
        case WORK_LOAD_RESET: 
        return {}
        default:
            return state;
    }
}

{/*export const addTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TASK_REQUEST:
            return { loading: true }
        case ADD_TASK_SUCCESS:
            return {
                loading: false,
                task: action.payload
            }
        case ADD_TASK_FAIL:
            return{ loading: false, error: action.payload }
        case ADD_TASK_RESET:
            return {}

        default:
            return state;
    }
}*/}