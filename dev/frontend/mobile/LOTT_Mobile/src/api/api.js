const axios = require('axios');

const api = axios.create()

const config = {
    headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwb3R0ZXJAaG90bWFpbC5jb20iLCJpYXQiOjE2MjE1Mjc2OTEsImV4cCI6MTYyMTUzMTI5MX0.NJkBYd0xkIqadAxIhdAPafMjgJ-E4rH8UyZwrk-oIwyO6DyrxG0WXD1ZiUYqwu5JruIbE6j6Qi8S8L6vGSqu_A` }
};

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
        
        console.log("requete challenges : " + api.defaults.baseURL + "/challenges?draft=false");

        return axios.get(api.defaults.baseURL + '/challenges?draft=false', config)
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

    getDistance(idChallenge){
        
        return axios.get(api.defaults.baseURL + '/challenges/' + idChallenge + '/events/distance', config)
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

    getChallenge(id){
        
        console.log("requete challenges : " + api.defaults.baseURL + "/challenges/" + id);

        return axios.get(api.defaults.baseURL + '/challenges/' + id, config)
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

    addEvent(idChallenge, idSegment, moveType, dateDepart, distance, duree, idEvent){
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

        console.log("requete event : " + api.defaults.baseURL + "/challenges/" + idChallenge + "/segments/" + idSegment + "/events");
        console.log(idEvent)

        return axios.post(api.defaults.baseURL + '/challenges/' + idChallenge + "/segments/" + idSegment + "/events", {
            "move_type": codeMove,
            "distance":distance,
            "duration": duree,
            "event_type_id" : idEvent
        }, config)
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

    lastEvent(id){
        
        console.log("requete challenges : " + api.defaults.baseURL + "/challenges/" + id + '/events/last');

        return axios.get(api.defaults.baseURL + '/challenges/' + id + '/events/last', config)
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

    getObstacle(segmentId){
        
        console.log("requete challenges : " + api.defaults.baseURL + "/segments/" +  segmentId + "/obstacles");

        return axios.get(api.defaults.baseURL + '/segments/' + segmentId + "/obstacles", config)
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

    sendResponse(idChallenge, idSegment, idObstacle, reponse){
        
        console.log("requete event : " + api.defaults.baseURL + "/challenges/" + idChallenge + "/segments/" + idSegment + "/events/checkresponse");

        console.log(new Date().toISOString().replace("T", " ").substring(0,19));

        return axios.post(api.defaults.baseURL + '/challenges/' + idChallenge + "/segments/" + idSegment + "/events/checkresponse", {
            event_type_id: 5,
            obstacle_id: idObstacle,
            response: reponse 
        }, config)
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

    distanceSegment(idSegment){
        return axios.get(api.defaults.baseURL + '/segments/' + idSegment + "/events/distance", config)
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
    getSegment(idChallenge, idSegment){
        return axios.get(api.defaults.baseURL + '/challenges/' + idChallenge + "/segments/" + idSegment, config)
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