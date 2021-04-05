const axios = require('axios');
import {API_URL} from "@env"

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
        
        console.log("requete challenges : " + api.defaults.baseURL + "/challenges");

        return axios.get(api.defaults.baseURL + '/challenge')
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });
    }
}

export default apiFonctions;