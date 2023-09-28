import axios from 'axios';
const WORK_URL = "/hin";

// All Locations
export const allLocations = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/all-locations?pageNumber=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all locations", error);
    }
};

// Query to get all locations
export const queryLocations = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/search/location`);
        const data = res.data;
        return data;
    } catch (error) {
        console.log("Error while fetching all locations", error);
    }
}

// Create Location
export const createNewLocation = async (values) => {
    try {
        return axios.post(`${WORK_URL}/create/location`, values);
    } catch (error) {
        console.log("Error while creating new location", error);
    }
}

// Delete Location
export const deleteLocation = async (id) => {
    try {
        return axios.delete(`${WORK_URL}/delete/location/${id}`);
    } catch (error) {
        console.log("Error while deleting location", error);
    }
}