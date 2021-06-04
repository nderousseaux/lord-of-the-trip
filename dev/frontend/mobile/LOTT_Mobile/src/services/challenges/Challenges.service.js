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
    }
}

export default challengesService;