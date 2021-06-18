import api from 'services/General.service.js';

let EventsService = {
    getAllEvents(idChallenge){
        return api.get('/challenges/' + idChallenge+ '/events')

    },

    move(idChallenge, idSegment, typeTransport, dateDebut, dateFin, distance){

        let codeMove;
        switch(typeTransport){
            case 'marche':
                codeMove = 0;
                break;
            case 'velo':
                codeMove = 2;
                break;
            default: //Course
                codeMove = 1;
        } 
        let duree;
        try{
            duree = dateFin.getTime() - dateDebut?.getTime()
        } catch(e){
            console.log(e)
            duree = 0
        }


        return api.post(
            '/challenges/'+ idChallenge + '/segments/' + idSegment + '/events',
            {
                "move_type": codeMove,
                "distance":distance,
                "duration": duree,
                "event_type_id" : 3
            }
        )
    },

    startChallenge(idChallenge, idSegment){
        return api.post(
            '/challenges/'+ idChallenge + '/segments/' + idSegment + '/events',
            {
                "event_type_id" : 1
            }
        )
    },

    choix(idChallenge, idSegment){
        return api.post(
            '/challenges/'+ idChallenge + '/segments/' + idSegment + '/events',
            {
                "event_type_id" : 9
            }
        )
    },

    arrivalCrossingPoint(idChallenge, idSegment){
        return api.post(
            '/challenges/'+ idChallenge + '/segments/' + idSegment + '/events',
            {
                "event_type_id" : 8
            }
        )
    },

    endChallenge(idChallenge, idSegment){
        return api.post(
            '/challenges/'+ idChallenge + '/segments/' + idSegment + '/events',
            {
                "event_type_id" : 2
            }
        )
    },

    arrivalObstacle(idChallenge, idSegment, idObstacle){
        return api.post(
            '/challenges/'+ idChallenge + '/segments/' + idSegment + '/events',
            {
                "event_type_id" : 4,
                "obstacle_id":idObstacle
            }
        )
    },

    eventReponse(idObstacle, reponse){
        return api.post(
            '/obstacles/'+ idObstacle + '/answer',
            {
                "response": reponse
            }
        )
    },
    eventReponsePhoto(idObstacle, reponse){
        var data = new FormData();
        data.append('file',
        {
            uri:reponse,
            name:'a.jpg',
            type:'image/jpeg'
        });

        return api.post(
            '/obstacles/'+ idObstacle + '/answer',data
        )
    }
}

export default EventsService;