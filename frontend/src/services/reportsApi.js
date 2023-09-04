import axios from 'axios';
const WORK_URL = "/hin";

// Filter work by status query
export const filterWorkStatus = async (status) => {
    try {
        const res = await axios.get(`${WORK_URL}/work/status=${status}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all work orders", error);
    }
}

// Get pending work Orders
export const pendingWorkOrders = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/pending/work`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all pending work orders", error);
    }
};

// Get in progress work Orders
export const inProgressWorkOrders = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/inprogress/work?page=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all in progress work orders", error);
    }
}

// Get completed work Orders
export const completedWorkOrders = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/work/complete?page=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all completed work orders", error);
    }
};

// Get reviewed work Orders
export const reviewedWorkOrders = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/work/review?page=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all reviewed work orders", error);
    }
}