import React, {useEffect} from 'react';

import {Button} from 'react-native';

import { RunConsumerHook } from 'store/run/Run.store.js';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';


export default function Distance(props){

  const [{distanceSegment, distance}] = RunConsumerHook();
  const [{segment}] = ChallengesConsumerHook();
  
  useEffect(() => {
    //On calcule la distance avant le prochain crossing point
    let distanceEtape = segment.length - (distanceSegment + distance)
    console.log("Prochaine étape : " + distanceEtape + " métres")
    if (distanceEtape <= 0){
      console.log("Crossing point atteint !")  
    }
  }, [segment, distanceSegment, distance])

  return (<></>)
}