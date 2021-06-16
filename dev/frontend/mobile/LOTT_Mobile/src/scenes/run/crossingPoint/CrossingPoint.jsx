import React from 'react';
import { View } from "react-native";

import StopButton from 'components/recording/stopButton/StopButton.jsx';
import Details from 'components/recording/details/Details.jsx';
import Carte from 'components/carte/Carte.jsx'
import Distance from 'components/recording/distance/Distance.jsx'

import styles from './Recording.style.js';

export default function Recording(props){

  return(
      <View style={styles.mainContainer}>
          <View style={styles.cardContainer}>
            <Carte/>
          </View>
          <Distance/>
          <View style={styles.bottomContainer}>
            <View style={styles.buttonContainer}>
              <StopButton {...props}/>
            </View>
            <View style={styles.detailsContainer}>
              <Details/>
            </View>

          </View>
      </View>

  )
}