import axios from 'axios';
// config
import Config from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: Config.API_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
