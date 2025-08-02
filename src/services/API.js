
const API_URL = 'http://192.168.18.233:8080'

import axios from 'axios'

export const fetchData = async (api_header) => {
    try {
        const response = await axios.get(API_URL + api_header);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

export const sendData = async (data) => {
    try {
        const response = await axios.post(`${API_URL + api_header}`, data);
        console.log('Response:', response.data);
    } catch (error){
        console.error('Error sending data:', error);
        throw error;
    }
}
