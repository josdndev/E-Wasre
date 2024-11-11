import axios from 'axios';

const API_KEY = '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'; // Replace with your actual API key
const BASE_URL = 'https://api.groqcloud.com'; // Replace with the actual base URL of the GroqCloud API

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from GroqCloud:', error);
        throw error; // Rethrow the error for further handling
    }
};
