import RunService from 'services/run/Run.service.js'
import { AlertHelper } from 'helpers/AlertHelper.js'
import EventsService from 'services/events/Events.service.js'

export function sendMove(idChallenge, segment, typeTransport, dateDebut, dateFin, distance, functionThen, functionFinally) {

    EventsService.move(
        idChallenge,
        segment.id,
        typeTransport,
        dateDebut,
        dateFin,
        distance
        )
    .then(() => functionThen())
    .catch((err) => {
        console.log(err)
        let msg;

        if (err.response != undefined){
            console.log(err.response)
            switch(err.response.status){
            default:
                msg = "Une erreur inconnue c'est produite."
            }
        }
        else{
            console.log(err)
            msg = "Le réseau est indisponible."
        }
        AlertHelper.show("error", "Erreur !", msg)
    })
    .finally(() => functionFinally())
}