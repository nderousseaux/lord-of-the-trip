import React, {useEffect} from 'react';
import { Alert} from "react-native";


import { RunConsumerHook } from 'store/run/Run.store.js';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import {sendMove} from 'helpers/EventsHelper.js'
import { distanceFormat } from 'helpers/ChallengesHelper.js';
import _ from 'lodash';


import EventsService from 'services/events/Events.service.js'

export default function Distance(props){

  const [{distanceSegment, distance, transport, dateDebut, distanceChallenge, obstacles_rep}, dispatchRun] = RunConsumerHook();
  const [{challengeSelected, segment}, dispatchChallenges] = ChallengesConsumerHook();
  

  let functionCrossingPoint = () => {
    if (segment.end_crossing_point.id == challengeSelected.end_crossing_point.id){
      Alert.alert(
        "Bravo !!!!!!",
        "Vous avez fini le challenge !",
        [
            { text: "OK" }
        ]
        );

      dispatchRun({
        type: 'RESET_DISTANCE',
      });
      dispatchRun({
        type: 'STOP_SUBSCRIBTIONS',
      });
    
      EventsService.endChallenge(challengeSelected.id, segment.id)
      props.navigation.navigate('Challenges')
    }
    else{
      EventsService.arrivalCrossingPoint(challengeSelected.id, segment.id)
      .then(() => {
        let res = distanceFormat(distance)
        Alert.alert(
          "Bravo !",
          "Vous avez courru " + res.distance + " " + res.unitee,
          [
              { text: "OK" }
          ]
          );

        dispatchRun({
          type: 'RESET_DISTANCE',
        });
        dispatchRun({
          type: 'STOP_SUBSCRIBTIONS',
        });
      

        props.navigation.navigate("Point de passage", {
          crossingPoint: segment.end_crossing_point})   
      })
    }
  }

  let functionObstacle = (idObstacle) => {
    EventsService.arrivalObstacle(challengeSelected.id, segment.id, idObstacle)
      .then(() => {
        let res = distanceFormat(distance)
        Alert.alert(
          "Bravo !",
          "Vous avez courru " + res.distance + " " + res.unitee + ". Mais un obstacle se dresse devant vous !",
          [
              { text: "OK" }
          ]
          );

        dispatchRun({
          type: 'RESET_DISTANCE',
        });
        dispatchRun({
          type: 'STOP_SUBSCRIBTIONS',
        });
      

        props.navigation.navigate("Obstacle")
      })
      .catch(err => {console.log(err.response)})
  }

  let stop = (functionThen) => {
    sendMove(
      challengeSelected.id,
      segment,
      transport,
      dateDebut,
      new Date(),
      distanceChallenge,
      functionThen,
      () => {}
    )
  }


  useEffect(() => {
    //On calcule la distance avant le prochain crossing point
    let distanceEtape = segment.length - (distanceSegment + distance)
    console.log("Prochaine étape : " + distanceEtape + " métres")
    if (distanceEtape <= 0){
      stop(functionCrossingPoint)
    }
  

    let distanceDesObstacles = _.map(
      _.filter(
        segment.obstacles, 
        function(o){return (!(obstacles_rep.includes(o.id)))}
      ),
      function(o){return (
          {
            id: o.id,
            distance: o.progress*segment.length - (distanceSegment + distance)
          }
        )}
    )
    distanceDesObstacles.forEach(obstacle => {
      console.log("Distance avant l'obstacle d'id n°" + obstacle.id + " : " + obstacle.distance + " m") 
      if (obstacle.distance < 0){
        //On l'id de l'obstacle dans la distance est la plus faible

        //On récupère la distance la plus faible :
        let distanceMin = Math.min(..._.map(distanceDesObstacles, function(o){return o.distance}))
        let obstacleId = _.find(distanceDesObstacles, function(o){return o.distance == distanceMin}).id
        
        console.log("arrivée sur l'obstacle d'id " + obstacleId)
        dispatchChallenges({
          type: 'SET_OBSTACLE',
          obstacle: obstacleId,
        });
        stop(() => {functionObstacle(obstacleId)})
        
      }
    })
          
  }, [segment, distanceSegment, distance])

  return (<></>)
}