import axios from 'axios';
const WORK_URL = "/hin";

// Create Designation
export const createNewDesignation = async (values) => {
    try {
        return await axios.post(`${WORK_URL}/new/designation`, values);
    } catch (error) {
        throw new Error("Error while creating new designation");
    }
};

// All Designations
export const allDesignations = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/all-designations?pageNumber=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Error while fetching all designations");
    }
};

// Query all designations
export const queryAllDesignations = async () => {
  try {
    const res = await axios.get(`${WORK_URL}/query/all-designations`);
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Error while querying all designations");
  }
};

// Delete Designation
export const deleteDesignation = async (id) => {
    try {
        const res = await axios.delete(`${WORK_URL}/delete/designation/${id}`);
        return res.data;
    } catch (error) {
        throw new Error("Error while deleting designation");
    }
}