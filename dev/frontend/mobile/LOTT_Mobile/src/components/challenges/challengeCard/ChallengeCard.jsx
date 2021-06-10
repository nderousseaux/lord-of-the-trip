import React from 'react';
import { View, Text } from "react-native";

import styles from './ChallengeCard.style.js';
import Date from 'components/challenges/date/Date.jsx'
import Button from 'components/basics/button/ButtonComponent.jsx'
import Participants from 'components/challenges/participants/Participants.jsx';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import Description from 'components/challenges/description/Description.jsx';
import { getNextAction } from 'helpers/RunHelper';

export default function ChallengeCard({item, type, navigation}) {
  
  const [{}, dispatchChallenges] = ChallengesConsumerHook();

  let difficulty;

  switch(item.level){
    case "1":
      difficulty = "Facile";
      break;
    case "2":
      difficulty = "Moyenne";
      break;
    case "3":
      difficulty = "Difficile";
      break;
    default:
      difficulty = "Inconnue";
  }

  let pressDetails = () => {

    dispatchChallenges({
      type: 'SET_CHALLENGE_SELECTED',
      idChallengeSelected: item.id
    });
    getNextAction(item.id, dispatchChallenges)
    navigation.navigate('Challenge', {type: type})
    
  }
  
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          {item.name}
        </Text>
        <Text style={styles.subtitle}>
          Difficulté : {difficulty}
        </Text>

        <View style={styles.middleView}>
          <Date
            startDate={item.start_date}
            endDate={item.end_date}
          />
        </View>

      </View>

      <View style={styles.main}>
        <Description
          numberOfLines={10}
          text={item.description}
        />
        <View style={styles.buttonView}>
          { type == 'subscribing'
            ? <Button 
              title="Voir les détails de ce challenge"
              type='OUTLINE'
              onPress={() => {pressDetails()}}
            />
            : <Button
              title="Voir les détails du challenge"
              onPress={() => {pressDetails()}}
            />
          }

        </View>

        <View style={styles.detailsView }>
          <Participants
            numberOfParticipants={item.nb_subscribers}
          />
        </View>

      </View>
    </View>
  );
}