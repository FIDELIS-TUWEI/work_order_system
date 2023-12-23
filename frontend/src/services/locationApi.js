import axios from 'axios';
const WORK_URL = "/hin";

// All Locations
export const allLocations = async (page) => {
    try {
        const res = await axios.get(`${WORK_URL}/all-locations?pageNumber=${page}`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Error while fetching all locations");
    }
};

// Query to get all locations
export const queryLocations = async () => {
    try {
        const res = await axios.get(`${WORK_URL}/search/location`);
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error("Error while fetching all locations");
    }
}

// Create Location
export const createNewLocation = async (values) => {
    try {
        return await axios.post(`${WORK_URL}/create/location`, values);
    } catch (error) {
        throw new Error("Error while creating new location");
    }
}

// Delete Location
export const deleteLocation = async (id) => {
    try {
        return await axios.delete(`${WORK_URL}/delete/location/${id}`);
    } catch (error) {
        console.log("Error while deleting location", error);
        throw new Error("Error while deleting location");
    }
}