import axios from "axios";


const instance = axios.create({
    // baseURL: "http://localhost:4000",
    baseURL: "https://mern-blog-frsf.onrender.com",
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

export default instance;
