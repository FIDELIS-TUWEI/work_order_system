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
        return await axios.get(`${URL}/gettasks`)
    } catch (error) {
        console.log('Error while calling get Tasks Api', error);
    }
}

// get a single Task with unique Id
export const getTask = async (id) => {
    try {
        return await axios.get(`${URL}/${id}`)
    } catch (error) {
        console.log('Error while calling get single Task Api', error);
    }
}

// Edit task with unique Id
export const editTask = async (task, id) => {
    try {
        return await axios.put(`${URL}/${id}`, task);
    } catch (error) {
        console.log('Error while calling edit Task Api', error);
    }
}