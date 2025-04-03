import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5215/api',
});

export default axiosInstance;
