const axios = require('axios');

const api = axios.create()

const apiFonctions = {

    init(server){
        api.defaults.baseURL = server;
        api.headers = {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
        };
        return api
    },

    getChallenges(){
        return api.get('/challenges')
    }
}

export default apiFonctions;