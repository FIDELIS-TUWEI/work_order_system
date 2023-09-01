import axios from 'axios';
const WORK_URL = "/hin";

// All work categories
export const allWorkCategories = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/all/categories`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all work categories", error);
    }
}