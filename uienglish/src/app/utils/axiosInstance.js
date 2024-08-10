const { default: axios } = require("axios");

const axiosInstance = axios.create({
    header: {'Content-Type':'application/json'},
    baseURL: ' https://bacninh-api.ngn.vn/',
});


axiosInstance.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);

export default axiosInstance;