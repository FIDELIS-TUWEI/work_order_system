import axios from 'axios';
const WORK_URL = "/hin";

// All work categories
export const allWorkCategories = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/all/categories?pageNumber=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all work categories", error);
    }
};

// Create Work category
export const createNewCategory = async (values) => {
    try {
        return axios.post(`${WORK_URL}/new/category`, values);
    } catch (error) {
        console.log("Error while creating new category");
    }
}