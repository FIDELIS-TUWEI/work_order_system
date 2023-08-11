import axios from 'axios';
const USERS_URL = "/hin";

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${USERS_URL}/all-users`)
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error while fetching users", error);
    }
}

