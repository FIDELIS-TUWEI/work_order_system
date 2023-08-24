import axios from 'axios';
const WORK_URL = "/hin";

// Get pending work Orders
export const pendingWorkOrders = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/pending/work?page=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all pending work orders", error);
    }
};

// Get completed work Orders
export const completedWorkOrders = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/completed/work?page=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all completed work orders", error);
    }
};