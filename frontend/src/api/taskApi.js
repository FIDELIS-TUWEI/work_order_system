import axios from "axios";

// backend url endpoint
const URL = 'http://localhost:5000'

export const addTask = async (data) => {
    try {
        return await axios.post(`${URL}/add`, data)
    } catch (error) {
        console.log('Error while calling Add Task Api', error)
    }
}