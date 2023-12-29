import axios from 'axios';
const WORK_URL = "/hin";

// All work categories
export const allWorkCategories = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/all/categories?pageNumber=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Error while fetching all work categories");
    }
};

// Query all categories without pagination
export const queryCategories = async () => {
  try {
    const res = await axios.get(`${WORK_URL}/query/all/categories`);
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Error while querying all categories");
  }
};

// Create Work category
export const createNewCategory = async (values) => {
    try {
        return await axios.post(`${WORK_URL}/new/category`, values);
    } catch (error) {
        throw new Error("Error while creating new category");
    }
};

// Update Work category
export const editCategory = async (id, values) => {
    try {
        const res = await axios.put(`${WORK_URL}/edit/category/${id}`, values);
        return res.data;
    } catch (error) {
        throw new Error("Error while updating work category");
    }
};

// Delete Work category
export const deleteCategory = async (id) => {
    try {
        const res = await axios.delete(`${WORK_URL}/delete/category/${id}`);
        return res.data;
    } catch (error) {
        throw new Error("Error while deleting work category");
    }
};