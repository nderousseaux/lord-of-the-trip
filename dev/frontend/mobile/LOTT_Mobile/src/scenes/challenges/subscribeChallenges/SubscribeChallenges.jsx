import React from 'react';
import { View } from "react-native";

import ChallengesList from 'components/challenges/challengesList/ChallengesList.jsx'
import styles from './SubscribeChallenges.style.js';

export default function SubscribeChallenges(props){

  return(    
    <View style={styles.mainContainer}>
      <ChallengesList
        type='subscribing'
        navigation={props.navigation}
      />
    </View>
  );

}