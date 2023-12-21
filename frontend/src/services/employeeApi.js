import axios from 'axios';
const WORK_URL = "/hin";

// New Employee
export const createNewEmployee = async (values) => {
    try {
        return await axios.post(`${WORK_URL}/new/employee`, values);
    } catch (error) {
        throw new Error("Error while creating new employee");
    }
}

// Get all employees from the DB
export const getAllEmployees = async (page) => {
  try {
    const res = await axios.get(`${WORK_URL}/all/employees?pageNumber=${page}`);
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Error while fetching all employees");
  }
};

// Get single employee
export const getSingleEmployee = async (id) => {
  try {
    const res = await axios.get(`${WORK_URL}/single/employee/${id}`);
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Error while fetching single employee");
  }
};

// Get employee data
export const getEmployeeData = async (id) => {
  try {
    const res = await axios.get(`${WORK_URL}/employee/data/${id}`);
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("Error while fetching employee data");
  }
};

// Query to get all employees
export const queryAllEmployees = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/query/all/employees`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Error while fetching all employees query");
    }
}

// Count work assigned to an employee
export const employeeTotalWorkCount = async (id) => {
  try {
    const res = await axios.get(`${WORK_URL}/employee/work/count?id=${id}`);
    const data = res.data;
    return data;
  } catch (error) {
    console.error('Error counting work assigned:', error);
    throw new Error("Error while counting work assigned");
  }
};

// Count all employees
export const countAllEmployees = async () => {
  try {
    const res = await axios.get(`${WORK_URL}/count/employees`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error while counting all employees", error);
    throw new Error("Error while counting all employees");
  }
};

// Edit employee
export const editEmployee = async (id, values) => {
  try {
    const res =  await axios.put(`${WORK_URL}/edit/employee/${id}`, values);
    return res.data;
  } catch (error) {
    console.log("Error while editing employee", error);
    throw new Error("Error while editing employee");
  }
}

// Delete Employee
export const deleteEmployee = async (id) => {
  try {
    return await axios.delete(`${WORK_URL}/delete/employee/${id}`);
  } catch (error) {
    console.log("Error while deleting employee", error);
    throw new Error("Error while deleting employee");
  }
}