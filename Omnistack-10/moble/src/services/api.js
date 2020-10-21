import axios from 'axios';
import { API } from '../utils/constants';

const api = axios.create({
    baseURL: API,
}
);

export default api;