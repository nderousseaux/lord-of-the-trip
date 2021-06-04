import React from 'react';
import { FlatList, View } from "react-native";

import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import { getChallenges } from 'helpers/ChallengesHelper.js';
import ChallengeCard from 'components/challenges/challengeCard/ChallengeCard.jsx';
import Button from 'components/basics/button/ButtonComponent.jsx';
import styles from './ChallengesList.style';

export default function ChallengesList(props){

  const [{challengesSubscribed, challengesNoSubscribed, loading}, dispatchChallenge] = ChallengesConsumerHook();

  let onRefresh = () => {
    getChallenges(dispatchChallenge)
  }

  return(    
    <View style={styles.mainContainer}>
      
      <FlatList
        data={ props.type == 'subscribing'
          ? challengesNoSubscribed
          : challengesSubscribed
        }
        
        renderItem={({ item }) => <ChallengeCard item={item} type={props.type} {...props}/>}
        refreshing={loading}
        keyExtractor={(item) => item.id.toString() }
        onRefresh={() => {onRefresh()}}
        ListFooterComponent={
          <View style={styles.footerView}>
            { props.type == 'subscribing'
              ? <Button 
                title="Voir mes challenges"
                type='CLEAR'
                onPress={() => {props.navigation.navigate('Challenges');}}
              />
              : <Button
                title="S'inscrire à un nouveau challenge"
                type='CLEAR'
                onPress={() => {props.navigation.navigate('Challenges disponibles');}}
              />
            }
            
          </View>
        }
      />      
    </View>
  );

}