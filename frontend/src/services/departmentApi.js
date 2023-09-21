import axios from 'axios';
const WORK_URL = "/hin";

// Create Department
export const createNewDepartment = async (values) => {
    try {
        return axios.post(`${WORK_URL}/new/department`, values);
    } catch (error) {
        console.log("Error while creating new department", error);
    }
};

// All Departments
export const allDepartments = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/all-departments?pageNumber=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all departments", error);
    }
};

// Delete Department
export const deleteDepartment = async (id) => {
    try {
        const res = await axios.delete(`${WORK_URL}/delete/department/${id}`);
        return res.data;
    } catch (error) {
        console.log("Error while deleting department", error);
        throw new Error("Error while deleting department");
    }
}