import axios from 'axios';
const WORK_URL = "/hin";

// create new work
export const createWorkOrder = async (values) => {
    try {
        const res = await axios.post(`${WORK_URL}/create/work`, values);
        console.log(res);
    } catch (error) {
        console.log("Error while creating work", error);
    }
}

// Get all work Orders
export const getAllWorkOrders = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/getall/work`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all work orders", error);
    }
}