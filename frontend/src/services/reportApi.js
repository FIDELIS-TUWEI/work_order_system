import axios from 'axios';
const WORK_URL = "/hin";

// Filter work orders by date created
export const filterWorkByDate = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/work/date-created`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Failed to fetch all work orders by date created");
    }
}

// API Service to count pending work orders by status
export const countPendingWork = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/count/pending-status`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Failed to fetch all pending work count");
    }
};

// API Service to count In_Progress work orders by status
export const countInProgressWork = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/count/in-progress-status`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Failed to fetch all in progress work count");
    }
};

// API Service to count completed work orders by status
export const countCompletedWork = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/count/completed-status`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Failed to fetch all completed work count");
    }
};

// API Service to count Reviewed work orders by status
export const countReviewedWork = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/count/reviewed-status`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Failed to fetch all reviewed work count");
    }
};

// API Service to count total work orders
export const countTotalWork = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/count/total-work`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error While fetching total work count", error);
        throw new Error("Failed to fetch total work count");
    }
};