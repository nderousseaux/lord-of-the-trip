const axios = require('axios');

const api = axios.create()

const apiFonctions = {

    init(server){
        api.defaults.baseURL = server;
        return api
    },

    getChallenges(){
        return api.get('/challenges')
    }
}

export default apiFonctions;