import api from 'services/General.service.js';

let runService = {
    getLastEvent(id){
        return api.get('/challenges/'+ id +'/events/last')
    },

    distanceSegment(id){ //Distance déjà parcourue sur le segment
        return api.get('/segments/' + id+ "/events/distance")
    },

    allSegments(idCrossingPoint){ //Tout les segments devant un crossing point
        return api.get('/crossing-points/'+ idCrossingPoint + '/segments')
    },

    getObstacle(idObstacle){
        return api.get('/obstacles/' + idObstacle)
    }
    
}

export default runService;