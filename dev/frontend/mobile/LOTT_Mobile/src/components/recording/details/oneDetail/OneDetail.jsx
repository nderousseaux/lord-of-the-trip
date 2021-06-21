import React from 'react';
import { View, Text } from "react-native";

import styles from './OneDetail.style.js';
import { RunConsumerHook } from 'store/run/Run.store.js';
import { distanceFormat } from 'helpers/ChallengesHelper.js';

export default function OneDetail(props){

  const [{nbPas, distance, duration, vitesse}] = RunConsumerHook();
  
  let getText = () => {
    switch (props.type){
      case "pas":
        return getPas();
      case "distance":
        return getDistance();
      case "time":
        return getTime()
      case "vitesse":
        return getVitesse()
      default:
        return {
          title: "FOO",
          main: "FOO",
          footer: "FOO"
        };
    }
  }

  let getPas = () => {
    return {
      title: 'MARCHE',
      main: nbPas,
      footer: "pas"
    }
  }

  let getDistance = () => {

    let res = distanceFormat(distance)

    return {
      title: 'PARCOURU',
      main: res.distance,
      footer: res.unitee
    }
  }

  let getTime = () => {
    return {
      title: 'TEMPS',
      main: duration.duree,
      footer: duration.unitee
    }
  }

  let getVitesse = () => {
    return {
      title: 'VITESSE',
      main: Math.round(Math.round(vitesse)*3.6),
      footer: 'km/h'
    }
  }

  return(
      <View style={styles.mainContainer}>
        <View style={styles.divTop}>
            <Text style={styles.text}>{getText().title}</Text>
        </View>
        <View style={styles.divMid}>
            <Text style={styles.textMid}>{getText().main}</Text>
        </View>
        <View style={styles.divBottom}>
            <Text style={styles.text}>{getText().footer}</Text>
        </View>
      </View>

  )
}