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