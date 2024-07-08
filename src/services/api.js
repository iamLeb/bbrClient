import axios from 'axios';

const api = axios.create({
    baseURL: "https://bbrapi.onrender.com",
    withCredentials: true // Send cookies with cross-origin requests
});

export default api;
