import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from "react-native";

import Date from 'components/challenges/date/Date.jsx';
import Button from 'components/basics/button/ButtonComponent.jsx';
import styles from './ChallengeDescription.style.js';
import ChallengesService from 'services/challenges/Challenges.service.js'
import { getChallenges } from 'helpers/ChallengesHelper.js';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';

export default function ChallengeDescription(props){

  
  const [{ loading, challengeSelected }, dispatchChallenge] = ChallengesConsumerHook();

  const [ type, setType ] = useState(props.route.params.type)

  let getDifficulty = () => {
    let res;
    switch(challengeSelected.level){
      case "1":
        res = "Facile";
        break;
      case "2":
        res = "Moyenne";
        break;
      case "3":
        res = "Difficile";
        break;
      default:
        res = "Inconnue";
    }

    return res

  }

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: challengeSelected.name
    });
  }, [props.navigation]);


  let inscriptionPress = () => {
    ChallengesService.subscribeChallenge(challengeSelected.id)
    .then(() => {
      getChallenges(dispatchChallenge)
    })
    .then(() => {
      setType('subscribe')
    })
  }

  let getReadableTopButton = () => {
    return type == 'subscribing' ? "S'inscrire au challenge" : "GO !"
  }

  return(    
    <View style={styles.mainContainer}>
      { loading || challengeSelected == undefined  
      ? <ActivityIndicator size="large" />
      : <View style={styles.header}>
          <Text style={styles.title}>
            {challengeSelected.name}
          </Text>
          <Text style={styles.subtitle}>
            Difficulté : {getDifficulty()}
          </Text>
          <Button 
            onPress={ () => {inscriptionPress()}}
            title= { getReadableTopButton() }
          />
          <View style={styles.middleView}>
            <Date
              startDate={challengeSelected.start_date}
              endDate={challengeSelected.end_date}
            />
          </View>
          <View>
            
          </View>
        </View>

      }
    </View>
  );

}