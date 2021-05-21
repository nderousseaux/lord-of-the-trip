import * as SecureStore from 'expo-secure-store';

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

    async getChallenges(){
        
        const token = await SecureStore.getItemAsync('secure-token');

        console.log("requete challenges : " + api.defaults.baseURL + "/user/challenges?subscribed=true");

        return axios.get(api.defaults.baseURL + '/user/challenges?subscribed=true', {
            headers: {
                'Authorization' : `Bearer ${token}`
                }
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
    },

    async getDistance(idChallenge){
        
        const token = await SecureStore.getItemAsync('secure-token');

        return axios.get(api.defaults.baseURL + '/challenges/' + idChallenge + '/events/distance',  {
            headers: {
                'Authorization' : `Bearer ${token}`
                }
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
    },

    async getChallenge(id){
        
        const token = await SecureStore.getItemAsync('secure-token');

        console.log("requete challenges : " + api.defaults.baseURL + "/challenges/" + id);

        return axios.get(api.defaults.baseURL + '/challenges/' + id, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
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
    },

    async getChallengeMap(id) {
        
        const token = await SecureStore.getItemAsync('secure-token');

        console.log("requete challenges : " + api.defaults.baseURL + "/challenges/" + id + "/image-mobile");

        return axios.get(api.defaults.baseURL + "/challenges/" + id + "/image-mobile", {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
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
    },

    async addEvent(idChallenge, idSegment, moveType, dateDepart, distance, duree, idEvent){
        
        const token = await SecureStore.getItemAsync('secure-token');
        
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
        }, 
        {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
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
    },

    async lastEvent(id){

        const token = await SecureStore.getItemAsync('secure-token');
        
        console.log("requete challenges : " + api.defaults.baseURL + "/challenges/" + id + '/events/last');

        return axios.get(api.defaults.baseURL + '/challenges/' + id + '/events/last', {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
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
    },

    async getObstacle(segmentId){

        const token = await SecureStore.getItemAsync('secure-token');
        
        console.log("requete challenges : " + api.defaults.baseURL + "/segments/" +  segmentId + "/obstacles");

        return axios.get(api.defaults.baseURL + '/segments/' + segmentId + "/obstacles",  {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
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
    },

    async sendResponse(idChallenge, idSegment, idObstacle, reponse){

        const token = await SecureStore.getItemAsync('secure-token');
        
        console.log("requete event : " + api.defaults.baseURL + "/challenges/" + idChallenge + "/segments/" + idSegment + "/events/checkresponse");

        console.log(new Date().toISOString().replace("T", " ").substring(0,19));

        return axios.post(api.defaults.baseURL + '/challenges/' + idChallenge + "/segments/" + idSegment + "/events/checkresponse", {
            event_type_id: 5,
            obstacle_id: idObstacle,
            response: reponse 
        }, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
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
    },

    async distanceSegment(idSegment){

        const token = await SecureStore.getItemAsync('secure-token');
        
        return axios.get(api.defaults.baseURL + '/segments/' + idSegment + "/events/distance", {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
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

    },
    async getSegment(idChallenge, idSegment){

        const token = await SecureStore.getItemAsync('secure-token');
        
        return axios.get(api.defaults.baseURL + '/challenges/' + idChallenge + "/segments/" + idSegment, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
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

    },
    
    async getChoix(idChallenge, idCrossingPoint){

        const token = await SecureStore.getItemAsync('secure-token');
        
        return axios.get(api.defaults.baseURL + '/challenges/' + idChallenge + "/crossing-points/" + idCrossingPoint + "/find-segments", {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
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