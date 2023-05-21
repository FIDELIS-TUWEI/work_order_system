import axios from "axios";

// backend url endpoint
const URL = 'http://localhost:5000'

export const addTask = async (data) => {
    try {
        return await axios.post(`${URL}/addtask`, data)
    } catch (error) {
        console.log('Error while calling Add Task Api', error);
    }
}

// get Tasks
export const getTasks = async () => {
    try {
        return await axios.get(`${URL}/tasks`)
    } catch (error) {
        console.log('Error while calling get Task Api', error);
    }
}