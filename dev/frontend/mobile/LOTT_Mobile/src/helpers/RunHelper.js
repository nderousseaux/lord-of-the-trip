import RunService from 'services/run/Run.service.js'
import { AlertHelper } from 'helpers/AlertHelper.js'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import EventsService from 'services/events/Events.service';
import _ from 'lodash';

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

        dispatchChallenges({
            type: 'SET_SEGMENT',
            segment: res.data.segment_id,
            idChallenge: idChallenge
        });
        dispatchChallenges({
            type: 'SET_OBSTACLE',
            obstacle: res.data.obstacle_id,
        });
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
            case "CROSS_PT_ARRIVAL": //Si on vient d'arriver à un obstacle -> On doit choisir sa route
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
              msg = "Une erreur inconne s'est produite."
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

export function move(showActionSheetWithOptions, dispatchRun, navigation, challenge, segment) { 
    const options = ['En courant', 'À vélo', 'À pied', 'Annuler'];
    const cancelButtonIndex = 3;
    const destructiveButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        showSeparators: true,
        textStyle: { color: 'rgb(51, 126,246)'},
        useModal:true,
        title: 'Choisir un moyen de transport'

      },
      async buttonIndex => {
        if(buttonIndex != 3){
            navigation.navigate('Recording');
    
            let transport;
            switch (buttonIndex){
                case 0:
                    transport = 'course'
                    await startGPS(dispatchRun, navigation)
                    break;
                case 1:
                    transport = 'velo'
                    await startGPS(dispatchRun, navigation)
                    break;
                case 2:
                    transport = 'marche'
                    startPedometer(dispatchRun, challenge)
                    break;
                default:
                    transport = 'course'
            }
            Promise.all([
                RunService.distanceSegment(segment.id),
                EventsService.getAllEvents(challenge.id)
            ])
            .then(([resDistance, resEvent]) => {
               
                dispatchRun({
                    type: 'SET_OBSTACLES_REP',
                    obstacles: _.map(
                                    _.filter(
                                        resEvent.data.events, 
                                        function(o){return o.event_type_info.id==4}
                                    ),
                                    function(o){return o.obstacle_id}
                                )
                })
    
                dispatchRun({
                    type: 'SET_SEGMENT',
                    segment: segment.id,
                });
                dispatchRun({
                    type: 'SET_TRANSPORT',
                    transport: transport
                });
                dispatchRun({
                    type: 'SET_DISTANCE_SEGMENT',
                    distanceSegment: resDistance.data.distance
                })
                //On met à jour le chrono toutes les secondes
                let updateTime = () => {
                    dispatchRun({
                        type: 'SET_DURATION',
                        action: ""
                    });
                }
                dispatchRun({
                    type: 'SUBSCRIBE_TIME',
                    functionTime: updateTime
                })
            })
            .catch(([res, res2]) => {
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
        }
        else{
            navigation.navigate('Challenge')
        }
        
      }
    );
}

export function startPedometer(dispatchRun, challenge){
    //Fonction à chaque update du podomètre
    let updateStep = (result) => {
        dispatchRun({
            type: 'SET_NBPAS',
            nbPas: result.steps,
            distancePas: challenge.step_length
          });
    }


    //On démarre le podomètre
    dispatchRun({
        type: 'SUBSCRIBE_PEDOMETER',
        functionStep: updateStep
    })
}

export async function startGPS(dispatchRun, navigation){
    
    let updateGPS = async () => {
        const location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
        locationChanged(dispatchRun, location);
    }  
    //Fonction à chaque update du gps
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    
    if (status !== 'granted'){
        AlertHelper.show("error", "Erreur !", "Vous devez activer le gps dans les paramètres du téléphone !")
        navigation.goBack()
    }
    else {
        dispatchRun({
            type: 'SUBSCRIBE_GPS',
            functionGPS: updateGPS,
        })
    }
}

export function locationChanged(dispatchRun, location){
    dispatchRun({
        type: 'ADD_LOG',
        log: location
    })
}