import axios from 'axios';

const BACKEND_SERVER = '/api';

const clientAxios = axios.create({
    baseURL: BACKEND_SERVER
});

export default clientAxios;