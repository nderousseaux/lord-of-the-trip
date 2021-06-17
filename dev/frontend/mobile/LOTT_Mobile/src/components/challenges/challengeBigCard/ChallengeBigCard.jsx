import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from "react-native";

import Date from 'components/challenges/date/Date.jsx';
import Button from 'components/basics/button/ButtonComponent.jsx';
import styles from './ChallengeBigCard.style.js';
import ChallengesService from 'services/challenges/Challenges.service.js'
import { getChallenges } from 'helpers/ChallengesHelper.js';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import Description from 'components/challenges/description/Description.jsx';
import Details from 'components/challenges/details/Details.jsx';
import Carte from 'components/carte/Carte.jsx'
import UnsubscribeButton from 'components/challenges/unsubscribeButton/UnsubscribeButton.jsx';
import ButtonGo from 'components/challenges/buttonGo/ButtonGo.jsx';

export default function ChallengeBigCard(props){

  
  const [{ loading, challengeSelected }, dispatchChallenges] = ChallengesConsumerHook();

  const [ type, setType ] = useState(props.route.params.type)

  let getDifficulty = () => {
    let res;
    switch(challengeSelected.level){
      case 1:
        res = "Facile";
        break;
      case 2:
        res = "Moyenne";
        break;
      case 3:
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
      getChallenges(dispatchChallenges, challengeSelected.id)
    })
    .then(() => {
      setType('subscribe')
    })
  }

  return(    
    <View style={styles.mainContainer}>
      { loading || challengeSelected == undefined  
      ? <ActivityIndicator size="large" />
      : <>
        <View style={styles.header}>
          <Text style={styles.title}>
            {challengeSelected.name}
          </Text>
          <Text style={styles.subtitle}>
            Difficulté : {getDifficulty()}
          </Text>
          { type == 'subscribing'
            ? <Button 
              onPress={ () => {inscriptionPress()}}
              title="S'inscrire au challenge"
            />
            : <ButtonGo {...props}/>

          }
          
          <View style={styles.middleView}>
            <Date
              startDate={challengeSelected.start_date}
              endDate={challengeSelected.end_date}
            />
          </View>
        </View>

        <View style={styles.main}>
          <Details/>

          <Description
            type="big"
            text={challengeSelected.description}
          />
          
          <View style={styles.carteContainer}>
            <Carte/>
          </View>

          { type != 'subscribing'
            ? <UnsubscribeButton
                challenge={challengeSelected}
                navigation={props.navigation}
              />
            : <></>
          }
          
          
        </View>
      </>
      }
    </View>
  );

}