import axios from "axios";

// backend url endpoint
const URL = 'http://localhost:5000'

export const addUser = async (data) => {
    try {
        return await axios.post(`${URL}/add`, data)
    } catch (error) {
        console.log('Error while calling Add User Api', error)
    }
}

// get users request
export const getUsers = async () => {
    try {
        return await axios.get(`${URL}/all`)
    } catch (error) {
        console.log('Error while calling getUsers Api', error);
    }
}

// get single user with id
export const getUser = async (id) => {
    try {
        return await axios.get(`${URL}/getuser/${id}`)
    } catch (error) {
        console.log('Error while calling getUser Api', error);
    }
}

// Edit user with unique Id
export const editUser = async (user, id) => {
    try {
        return await axios.put(`${URL}/edituser/${id}`, user);
    } catch (error) {
        console.log('Error while calling editUser Api', error);
    }
}

// Delete user with unique Id
export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${URL}/${id}`);
    } catch (error) {
        console.log('Error while calling deleteUser Api', error);
        
    }
}