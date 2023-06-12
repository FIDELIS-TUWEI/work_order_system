import axios from "axios";

// backend url endpoint
const URL = 'http://localhost:5000/hin'

// Register
export const registerUser = async (data) => {
    try {
        return await axios.post(`${URL}/signup`, data)
    } catch (error) {
        console.log('Error while calling Add User Api', error)
    }
}
// Login 
export const loginUser = async(data) => {
    try {
        const log = await axios.post(`${URL}/signin`, data);
        localStorage.setItem("token", JSON.stringify(data));
        return log;

    } catch (error) {
        console.log('Error while calling Add User Api', error);
    }
}