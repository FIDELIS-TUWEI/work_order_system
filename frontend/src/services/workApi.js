import axios from 'axios';
const USERS_URL = "/hin";

// create new work
export const createWorkOrder = async (values) => {
    try {
        const res = await axios.post(`${USERS_URL}/new/work`, values);
        console.log(res);
    } catch (error) {
        console.log("Error while creating work", error);
    }
}