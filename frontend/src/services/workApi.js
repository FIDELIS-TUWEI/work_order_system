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
};

// Get single work order
export const getSingleWorkOrder = async (id) => {
    try {
        return await axios.get(`${WORK_URL}/single/work/${id}`);
    } catch (error) {
        console.log("Error while fetching single work order", error);
    }
}

// Edit work order
export const updateWorkOrder = async (id, values) => {
    try {
        const res = await axios.put(`${WORK_URL}/update/work/${id}`, values);
        return res.data;
    } catch (error) {
        console.log("Error while updating work order", error);
    }
}