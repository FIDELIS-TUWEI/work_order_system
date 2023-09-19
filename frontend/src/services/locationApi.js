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
}

// Create Location
export const createNewLocation = async (values) => {
    try {
        return axios.post(`${WORK_URL}/new/location`, values);
    } catch (error) {
        console.log("Error while creating new location", error);
    }
}