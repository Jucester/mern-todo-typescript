import axios from 'axios';

// If you're using production then don't need to set an env var
// just configure the nginx server to reverse proxy to the node server using the '/api' string in location

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_URL || '/api';

const clientAxios = axios.create({
    baseURL: BACKEND_SERVER
});

export default clientAxios;