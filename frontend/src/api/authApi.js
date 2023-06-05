import axios from "axios";

// backend url endpoint
const URL = 'http://localhost:5000/hin'

// Login 
export const loginUser = async(data) => {
    try {
        return await axios.post(`${URL}/login`, data);
    } catch (error) {
        console.log('Error while calling Add User Api', error);
    }
}