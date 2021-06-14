import React from 'react';
import { View, Text} from "react-native";

import StopButton from 'components/recording/stopButton/StopButton.jsx';
import Details from 'components/recording/details/Details.jsx';

import styles from './Recording.style.js';

export default function Recording(){

  return(
      <View style={styles.mainContainer}>
          <View style={styles.cardContainer}>

          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.buttonContainer}>
              <StopButton/>
            </View>
            <View style={styles.detailsContainer}>
              <Details/>
            </View>

          </View>
      </View>

  )
}