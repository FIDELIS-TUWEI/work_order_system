import axios from 'axios';
const WORK_URL = "/hin";

// Create Department
export const createNewDepartment = async (values) => {
    try {
        return await axios.post(`${WORK_URL}/new/department`, values);
    } catch (error) {
        throw new Error("Error while creating new department");
    }
};

// All Departments
export const allDepartments = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/all-departments?pageNumber=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Error while fetching all departments");
    }
};

// Query All departments
export const queryAllDepartments = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/query/all/departments`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Error while querying all departments");
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