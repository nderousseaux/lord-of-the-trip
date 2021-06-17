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

export function sendStart(challenge, segment, dispatchChallenge, functionThen ) {
    EventsService.startChallenge(challenge.id, segment.id)
    .then(() => {
        dispatchChallenge({
            type: 'SET_SEGMENT',
            segment: segment.id,
        });
        functionThen()
    })
    .catch((err) => {
        console.log(err)
        let msg;

        if (err.response != undefined){
            console.log(err)
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
}

export function sendChoix(challenge, segment, dispatchChallenge, functionThen) {
    EventsService.choix(challenge.id, segment.id)
    .then(() => {
        dispatchChallenge({
            type: 'SET_SEGMENT',
            segment: segment.id,
        });
        functionThen()
    })
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
}
