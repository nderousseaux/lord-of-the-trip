import ChallengesService from "services/challenges/Challenges.service.js";
import { AlertHelper } from "helpers/AlertHelper.js";
import { getNextAction } from 'helpers/RunHelper';

export function getChallenges(dispatchChallenges, idChallengeSelected) {
    dispatchChallenges({
        type: 'START_LOADING'
    }) 
    Promise.all(
        [ChallengesService.getChallengesSubscribed(), ChallengesService.getChallengesNoSubscribed() ]
    )
    .then((res) => {
        dispatchChallenges({
            type: 'GET_CHALLENGES_SUBSCRIBED',
            challengesSubscribed: res[0].data.challenges == undefined ? [] :  res[0].data.challenges
        });
        dispatchChallenges({
            type: 'GET_CHALLENGES_NO_SUBSCRIBED',
            challengesNoSubscribed: res[1].data.challenges == undefined ? [] :  res[1].data.challenges
        });
        dispatchChallenges({
            type: 'UPDATE_CHALLENGE_SELECTED',
        });

        //Si un challenge est sélectionné, on update son prochain état
        if (idChallengeSelected != undefined){
            getNextAction(idChallengeSelected, dispatchChallenges)
        }

    })
    .catch((err) => {
        console.log(err)
        let msg;

        if (err.response != undefined){
            switch(err.response.status){
                case 401:
                    msg = "Vous n'avez pas l'autorisation d'afficher les challenges"
                    break;
                default:
                    msg = "Une erreur inconne s'est produite.";
            }
        }
        else{
            msg = "Le réseau est indisponible.";
        }

        if (msg != undefined) {
            AlertHelper.show("error", "Erreur !", msg)
        }
    })
    .finally(() => {
        dispatchChallenges({
            type: 'STOP_LOADING'
        })
    })    
}

export function distanceFormat(distance){

    let distanceFormat, unitee;

    if (Math.round(distance).toString().length > 2 ){
        distanceFormat = Math.round(Math.round(distance)/100)/10
        unitee = 'km'
      }
      else {
        distanceFormat = Math.round(distance)
        unitee = 'm'
      }

    return {distance: distanceFormat, unitee}
}