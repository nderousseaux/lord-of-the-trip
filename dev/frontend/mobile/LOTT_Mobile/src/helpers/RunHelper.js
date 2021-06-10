import RunService from 'services/run/Run.service.js'
import AlertHelper from 'helpers/AlertHelper.js'


const typeEtat = {
	START: "start",
    MOVE: "move",
    CHOOSE_SEGMENT: "choose_segment",
    OBSTACLE_REP: "obstacle_rep",
    OBSTACLE_REP_OK: "obstacle_rep_ok",
    OBSTACLE_REP_KO: "obstacle_rep_ko",
    OBSTACLE_WAITING: "obstacle_waiting",
	ARRIVAL: "arrival",
}

export function getNextAction(idChallenge, dispatchChallenges) {
    
    dispatchChallenges({
        type: 'START_LOADING'
    }) 

    let nextEvent;
    RunService.getLastEvent(idChallenge)
    .then((res) => {
        let lastEvent = res.data.event_type_info.code

        switch (lastEvent) {
            case null: //Si il n'y en a pas -> on démarre le challenge
                nextEvent = typeEtat.START;
                break;
            case "START": //Si il à commencé un challenge -> Il peut courrir
                nextEvent = typeEtat.MOVE;
                break;
            case "ARRIVAL": //Si on est arrivé, il n'y a pas de prochain événement
                nextEvent = typeEtat.ARRIVAL;
                break;
            case "MOVE": //Si on à bougé, on peut toujours bouger
                nextEvent = typeEtat.MOVE;
                break;
            case "OBSTACLE_ARR": //Si on est arrivé sur un obstacle -> On doit répondre
                nextEvent = typeEtat.OBSTACLE_REP;
                break;
            case "OBSTACLE_REP": //Si on a répondu à un obstacle -> On doit attendre la réponse
                nextEvent = typeEtat.OBSTACLE_WAITING;
                break;
            case "OBSTACLE_REP_OK": //Si on a bien répondu à un obstacle -> On peut bouger
                nextEvent = typeEtat.OBSTACLE_REP_OK;
                break;
            case "OBSTACLE_REP_KO": //Si on a mal répondu à un obstacle -> On doit répondre
                nextEvent = typeEtat.OBSTACLE_REP_KO;
                break;
            case "CROSSING_POINT_ARRIVAL": //Si on vient d'arriver à un obstacle -> On doit choisir sa route
                nextEvent = typeEtat.CHOOSE_SEGMENT;
                break;
            case "CHOOSE_SEGEMENT": //Si on vient de choisir son segment -> On doit bouger
                nextEvent = typeEtat.MOVE
                break;
            default:
                break;
    
        }
    })
    .catch((err) => {
        console.log(err)
        let msg;

        if (err.response != undefined){
          switch(err.response.status){
            case 404:
                nextEvent = typeEtat.START
              break;
            default:
              msg = "Une erreur inconne c'est produite."
          }
        }
        else{
          msg = "Le réseau est indisponible."
        }
        if (msg != undefined){
            AlertHelper.show("error", "Erreur !", msg)
        }
    })
    .finally(() => {
        dispatchChallenges({
            type: 'UPDATE_NEXT_ACTION',
            nextAction: nextEvent
        });
        dispatchChallenges({
            type: 'STOP_LOADING'
        }) 

    })
}