import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true // Send cookies with cross-origin requests
});

export default api;
