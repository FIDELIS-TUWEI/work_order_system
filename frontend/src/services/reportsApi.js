import axios from 'axios';
const WORK_URL = "/hin";

// Endpoint to fetch all work orders report by status
export const getWorkOrdersReport = async (filterStatus) => {
    try {
        const res = await axios.get(`${WORK_URL}/work?status=${filterStatus}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all work orders by status query", error);   
    }
}

// Enpoint to fetch daily work orders report
export const getDailyReport = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/daily/work/report`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching daily work orders report", error);
    }
};

// Enpoint to fetch weekly work orders report
export const getWeeklyReport = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/weekly/work/report`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching weekly work orders report", error);
    }
};