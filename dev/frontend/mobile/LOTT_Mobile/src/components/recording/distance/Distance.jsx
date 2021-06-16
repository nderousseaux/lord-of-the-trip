import React, {useEffect} from 'react';
import { Alert} from "react-native";


import { RunConsumerHook } from 'store/run/Run.store.js';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import {sendMove} from 'helpers/EventsHelper.js'
import { distanceFormat } from 'helpers/ChallengesHelper.js';
import { getNextAction } from 'helpers/RunHelper';

import EventsService from 'services/events/Events.service.js'

export default function Distance(props){

  const [{distanceSegment, distance, transport, dateDebut, distanceChallenge}, dispatchRun] = RunConsumerHook();
  const [{challengeSelected, segment}] = ChallengesConsumerHook();
  

  let functionThen = () => {
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

  let stop = () => {
    sendMove(
      challengeSelected.id,
      segment,
      transport,
      dateDebut,
      new Date(),
      distanceChallenge,
      () => functionThen(),
      () => {}
    )
  }


  useEffect(() => {
    //On calcule la distance avant le prochain crossing point
    let distanceEtape = segment.length - (distanceSegment + distance)
    console.log("Prochaine étape : " + distanceEtape + " métres")
    if (distanceEtape <= 0){
      stop()
    }
  }, [segment, distanceSegment, distance])

  return (<></>)
}