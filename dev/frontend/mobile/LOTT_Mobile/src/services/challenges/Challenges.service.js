import api from 'services/General.service.js';

let challengesService = {
    getChallengesSubscribed(){
        return api.get('user/challenges?subscribed=true');
    },

    getChallengesNoSubscribed(){
        return api.get('user/challenges?subscribed=false')
    },

    subscribeChallenge(id){
        return api.post('/challenges/'+ id +'/subscribe')
    },

    unSubscribeChallenge(id){
        return api.post('/challenges/'+ id +'/unsubscribe')
    },

    getStatistiques(id){
        return api.get('/user/challenges/' + id + '/statistics')
    }
}

export default challengesService;