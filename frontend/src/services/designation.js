import axios from 'axios';
const WORK_URL = "/hin";

// Create Designation
export const createNewDesignation = async (values) => {
    try {
        return axios.post(`${WORK_URL}/new/designation`, values);
    } catch (error) {
        console.log("Error while creating new designation", error);
    }
};

// All Designations
export const allDesignations = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/all-designations?pageNumber=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all designations", error);
    }
};

// Delete Designation
export const deleteDesignation = async (id) => {
    try {
        const res = await axios.delete(`${WORK_URL}/delete/designation/${id}`);
        return res.data;
    } catch (error) {
        console.log("Error while deleting designation", error);
        throw new Error("Error while deleting designation");
    }
}