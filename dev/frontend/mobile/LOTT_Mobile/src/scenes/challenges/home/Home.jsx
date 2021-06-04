import React from 'react';
import { View } from "react-native";

import ChallengesList from 'components/challenges/challengesList/ChallengesList.jsx'
import styles from './Home.style.js';

export default function Home(props){

  return(    
    <View style={styles.mainContainer}>
      <ChallengesList
        navigation={props.navigation}
      />
    </View>
  );

}