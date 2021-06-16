import api from 'services/General.service.js';

let EventsService = {
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

        let duree = dateFin.getTime() - dateDebut.getTime()

        return api.post(
            '/challenges/'+ idChallenge + '/segments/' + idSegment + '/events',
            {
                "move_type": codeMove,
                "distance":distance,
                "duration": duree,
                "event_type_id" : 3
            }
        )
    }
}

export default EventsService;