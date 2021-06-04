import axios from 'axios';
import {API_URL} from "@env"

export function setToken(token) {
    currentAuthToken = token;
}

let currentAuthToken = null;

console.log(API_URL)
axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
    const access_token = currentAuthToken
    if (access_token) config.headers.Authorization = `Bearer ${access_token}`;

    return config;
});

export default {
    get: route => axios.get(route),
    post: (route, body) => axios.post(route, body),
    put: (route, body) => axios.put(route, body),
    patch: (route, body) => axios.patch(route, body),
    delete: (route, body) => axios.delete(route, { data: body }),
};