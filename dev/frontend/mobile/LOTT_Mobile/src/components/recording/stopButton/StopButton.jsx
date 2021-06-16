import React, {useState} from 'react';
import { View, Alert} from "react-native";

import { Button } from 'react-native-elements';
import styles from './StopButton.style.js';

import { distanceFormat } from 'helpers/ChallengesHelper.js';
import { RunConsumerHook } from 'store/run/Run.store.js';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import {sendMove} from 'helpers/EventsHelper.js'


export default function stopButton(props){

  const [{distance, transport, dateDebut, distanceChallenge}, dispatchRun] = RunConsumerHook();
  const [{ challengeSelected, segment}] = ChallengesConsumerHook();
  const [ loading, setLoading ] = useState(false);


  let functionThen = () => {
    let res = distanceFormat(distance)
    Alert.alert(
      "Bravo !",
      "Vous avez courru " + res.distance + " " + res.unitee,
      [
          { text: "OK" }
      ]
      );

    dispatchRun({
      type: 'STOP_SUBSCRIBTIONS',
    });
  }

  let functionFinally = () => {
    setLoading(false)
    props.navigation.navigate("Challenges", {
      challenge: challengeSelected.id})
  }

  let pressStop = () => {
    setLoading(true)
    sendMove(
      challengeSelected.id,
      segment,
      transport,
      dateDebut,
      new Date(),
      distanceChallenge,
      () => functionThen(),
      () => functionFinally()
    )
  }

  return(
      <View style={styles.mainContainer}>
          <Button 
            title='Stop'
            buttonStyle={styles.button}
            titleStyle={{
              fontSize: 30,
            }}
            onPress={() => pressStop()}
            loading={loading}
          />
      </View>

  )
}