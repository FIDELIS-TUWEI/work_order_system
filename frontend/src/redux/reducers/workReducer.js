import { WORK_LOAD_FAIL, WORK_LOAD_REQUEST, WORK_LOAD_RESET, WORK_LOAD_SUCCESS } from "../constants/workConstants"


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

export const registerWorkReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_JOB_REQUEST:
            return { loading: true }
        case REGISTER_JOB_SUCCESS:
            return {
                loading: false,
                task: action.payload
            }
        case REGISTER_JOB_FAIL:
            return{ loading: false, error: action.payload }
        case REGISTER_JOB_RESET:
            return {}

        default:
            return state;
    }
}