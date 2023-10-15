import axios from 'axios';
const WORK_URL = "/hin";

// New Employee
export const createNewEmployee = async (values) => {
    try {
        return axios.post(`${WORK_URL}/new/employee`, values);
    } catch (error) {
        console.log("Error while creating new employee", error);
    }
}

// Get all employees from the DB
export const getAllEmployees = async (page) => {
  try {
    const res = await axios.get(`${WORK_URL}/all/employees?pageNumber=${page}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.error('Error getting all employees from API:', error);
    throw error;
  }
};

// Get single employee
export const getSingleEmployee = async (id) => {
  try {
    const res = await axios.get(`${WORK_URL}/single/employee/${id}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.error('Error getting single employee from API:', error);
    throw error;
  }
};

// Edit employee
export const editEmployee = async (id, values) => {
  try {
    const res =  await axios.put(`${WORK_URL}/edit/employee/${id}`, values);
    return res.data;
  } catch (error) {
    console.log("Error while editing employee", error);
  }
}

// Delete Employee
export const deleteEmployee = async (id) => {
  try {
    return await axios.delete(`${WORK_URL}/delete/employee/${id}`);
  } catch (error) {
    console.log("Error while deleting employee", error);
  }
}