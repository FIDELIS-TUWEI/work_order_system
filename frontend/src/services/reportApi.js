import axios from 'axios';
const WORK_URL = "/hin";

// API Service to count pending work orders by status
export const countPendingWork = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/count/pending-status`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all work orders by pending status", error);
    }
}

// API Service to count In_Progress work orders by status
export const countInProgressWork = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/count/in-progress-status`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all work orders by in progress status", error);
    }
}

// API Service to count completed work orders by status
export const countCompletedWork = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/count/completed-status`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error While fetching all work orders by completed status", error);
    }
}

// API Service to count Reviewed work orders by status
export const countReviewedWork = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/count/reviewed-status`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error While fetching all work orders by reviewed status", error);
    }
}