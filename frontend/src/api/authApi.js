import axios from "axios";

// backend url endpoint
const URL = 'http://localhost:5000/hin'

// Register
export const registerUser = async (data) => {
    try {
        return await axios.post(`${URL}/register`, data)
    } catch (error) {
        console.log('Error while calling Add User Api', error)
    }
}
// Login 
export const loginUser = async(data) => {
    try {
        return await axios.post(`${URL}/login`, data);
    } catch (error) {
        console.log('Error while calling Add User Api', error);
    }
}