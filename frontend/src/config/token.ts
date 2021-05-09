import clienteAxios from './axios';

const tokenAuth = (token : string) => {
    if(token) {
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;