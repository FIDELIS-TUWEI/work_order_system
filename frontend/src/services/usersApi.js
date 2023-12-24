import axios from 'axios';
const USERS_URL = "/hin";

// Get all users From Database
export const getAllUsers = async (page) => {
    try {
        const response = await axios.get(`${USERS_URL}/all-users?pageNumber=${page}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
};

// Get user profile by id
export const getUserInfo = async (id) => {
    try {
        const res = await axios.get(`${USERS_URL}/single/user/${id}`);
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch user details");
    }
};

// Get user by id and edit
export const editUser = async (id, values) => {
    try {
        const res = await axios.put(`${USERS_URL}/edit/${id}`, values);
        return res.data;
    } catch (error) {
        throw new Error("Failed to update user");
    }
};

// API Service to delete user by id
export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${USERS_URL}/admin/user/delete/${id}`);
    } catch (error) {
        console.error("Error while deleting user", error);
        throw new Error("Failed to delete user");
    }
}

// update user password
export const updateUserPassword = async (id, values) => {
    try {
        const res = await axios.put(`${USERS_URL}/update/password/${id}`, values);
        return res.data;
    } catch (error) {
        console.error("Error while updating user password", error);
        throw new Error("Failed to update user password");
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
        throw new Error("Failed to fetch total number of users");
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
        throw new Error("Failed to fetch total number of active users");
    }
};

