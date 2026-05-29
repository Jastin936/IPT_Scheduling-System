// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

api.interceptors.request.use((config) => {
    // Check if the current request is for registering or obtaining a token
    const isAuthRoute = config.url.includes('/register/') || config.url.includes('/token/');
    
    const token = localStorage.getItem('access_token');
    
    // Only attach the Bearer token if it exists AND we aren't trying to register/log in
    if (token && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;