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