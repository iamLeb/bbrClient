import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_CORS,
    withCredentials: true // Send cookies with cross-origin requests
});

export default api;
