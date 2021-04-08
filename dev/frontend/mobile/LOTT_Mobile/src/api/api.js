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
        console.log("requete challenges : " + api.defaults.baseURL + "/challenges");

        return axios.get(api.defaults.baseURL + '/challenges')
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
    },

    addEvent(idChallenge, moveType, dateDepart, distance, duree){
        let codeMove;
        switch(moveType){
            case 'marche':
                codeMove = 0;
                break;
            case 'velo':
                codeMove = 2;
                break;
            default: //Course
                codeMove = 1;
        }

        console.log("requete event : " + api.defaults.baseURL + "/challenges/1/events");

        return axios.post(api.defaults.baseURL + '/challenges/' + idChallenge + '/events', {
            "move_type": codeMove,
            "event_date":dateDepart.toISOString().slice(0,19),
            "distance":distance,
            "duration": duree
        })
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