import axios from 'axios';

const API_BASE_URL = 'http://192.168.18.233:8080'; // Replace with your actual API base URL

export const fetchData = async (api_header)=> {
    try {
        const response = await axios.get(`${API_BASE_URL}${api_header}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const sendData = async(data, api_header)=> {
    try {
        const response = await axios.post(`${API_BASE_URL}${api_header}`, data);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}