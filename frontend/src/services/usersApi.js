import axios from 'axios';
const USERS_URL = "/hin";

// Get all users From Database
export const getAllUsers = async (page) => {
    try {
        const response = await axios.get(`${USERS_URL}/all-users?pageNumber=${page}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error while fetching users", error);
    }
};

// Get user profile by id
export const getUserInfo = async (id) => {
    try {
        const res = await axios.get(`${USERS_URL}/user/${id}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.error("Error while fetching single user", error);
    }
};

// Get user by id and edit
export const editUser = async (id, values) => {
    try {
        const res = await axios.put(`${USERS_URL}/edit/${id}`, values);
        return res.data;
    } catch (error) {
        console.error("Error while Updating user", error);
    }
};

// update user password
export const updateUserPassword = async (id, values) => {
    try {
        const res = await axios.put(`${USERS_URL}/update/password/${id}`, values);
        return res.data;
    } catch (error) {
        console.error("Error while updating user password", error);
    }
}

// API Service to count Total users
export const countAllUsers = async () => {
    try {
        const res = await axios.get(`${USERS_URL}/count/total-users`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error While fetching total number of users", error);
    }
};

// API Service to count active users
export const countActiveUsers = async () => {
    try {
        const res = await axios.get(`${USERS_URL}/count/active-users`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error While fetching total number of active users", error);
    }
};

