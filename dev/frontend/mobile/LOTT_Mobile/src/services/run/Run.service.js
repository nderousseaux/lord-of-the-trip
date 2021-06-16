import api from 'services/General.service.js';

let runService = {
    getLastEvent(id){
        return api.get('/challenges/'+ id +'/events/last')
    },

    distanceSegment(id){ //Distance déjà parcourue sur le segment
        return api.get('/segments/' + id+ "/events/distance")
    }
}

export default runService;