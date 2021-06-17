import React from 'react';
import { View } from "react-native";

import StopButton from 'components/recording/stopButton/StopButton.jsx';
import Details from 'components/recording/details/Details.jsx';
import Carte from 'components/carte/Carte.jsx'
import Distance from 'components/recording/distance/Distance.jsx'
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import { RunConsumerHook } from 'store/run/Run.store.js';

import styles from './Recording.style.js';

export default function Recording(props){

  const [{ challengeSelected, segment }] = ChallengesConsumerHook();
  const [{distanceSegment, distance}, dispatchRun] = RunConsumerHook();


  return(
      <View style={styles.mainContainer}>
          <View style={styles.cardContainer}>
            {distanceSegment+distance < segment.length
            ?<Carte
              UserProgress={{
                segment: 99,
                progress: ((distanceSegment  + distance)/ segment.length)
            }}
          
              FocusedSegments={[]}
              PathSegments={[]}
              Challenge={challengeSelected}
            />
            :<></>}
          </View>
          <Distance {...props}/>
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