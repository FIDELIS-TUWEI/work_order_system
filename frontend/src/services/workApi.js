import axios from 'axios';
const WORK_URL = "/hin";

// create new work
export const createWorkOrder = async (values) => {
    try {
        return await axios.post(`${WORK_URL}/create/work`, values);
    } catch (error) {
        console.log("Error while creating work", error);
        throw new Error("Error while creating work");
    }
}

// Get all work Orders
export const getAllWorkOrders = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/getall/work?pageNumber=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all work orders", error);
        throw new Error("Error while fetching all work orders");
    }
};

// Get all work Query without pagination for line chart frontend
export const getAllWorkQuery = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/query/all/work`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all work query", error);
        throw new Error("Error while fetching all work query");
    }
};

// Get single work order
export const getSingleWorkOrder = async (id) => {
    try {
        const res = await axios.get(`${WORK_URL}/single/work/${id}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching single work order", error);
        throw new Error("Error while fetching single work order");
    }
}

// Edit work order
export const updateWorkOrder = async (id, values) => {
    try {
        const res = await axios.put(`${WORK_URL}/update/work/${id}`, values);
        return res.data;
    } catch (error) {
        console.log("Error while updating work order", error);
        throw new Error("Error while updating work order");
    }
};

// API service to delete work
export const deleteWorkOrder = async (id) => {
    try {
        return await axios.delete(`${WORK_URL}/delete/work/${id}`);
    } catch (error) {
        console.log("Error while deleting work order", error);
        throw new Error("Error while deleting work order");
    }
}

// Get Work Locations
export const getWorkLocations = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/all-locations`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching work locations", error);
        throw new Error("Error while fetching work locations");
    }
}