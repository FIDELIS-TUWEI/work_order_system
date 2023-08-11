import axios from 'axios';
const USERS_URL = "/hin";

// Get all users From Database
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${USERS_URL}/all-users`)
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error while fetching users", error);
    }
};

// Get user profile by id
export const getUserInfo = async (id) => {
    try {
        return await axios.get(`${USERS_URL}/user/${id}`)
    } catch (error) {
        console.error("Error while fetching single user", error);
    }
}

// Get user by id and edit
export const editUser = async (id, user) => {
    try {
        return await axios.put(`${USERS_URL}/edit/${id}`, user);
    } catch (error) {
        console.error("Error while Updating user", error);
    }
}

