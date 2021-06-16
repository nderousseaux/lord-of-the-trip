import React, {useState, useEffect} from 'react';
import { View, ScrollView, Button, ActivityIndicator, Pressable, Text } from "react-native";
import { HeaderBackButton } from 'react-navigation-stack';
import { useIsFocused } from '@react-navigation/native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import _ from 'lodash';

import {sendStart, sendChoix} from 'helpers/EventsHelper.js'
import { AlertHelper } from "helpers/AlertHelper.js";
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import Carte from 'components/carte/Carte.jsx'
import styles from './CrossingPoint';
import { getNextAction } from 'helpers/RunHelper';
import { getChallenges } from 'helpers/ChallengesHelper.js';
import { move } from 'helpers/RunHelper.js'
import { RunConsumerHook } from 'store/run/Run.store.js';
import RunService from 'services/run/Run.service.js'

export default function CrossingPoint(props){

  const [{challengeSelected, segment}, dispatchChallenges] = ChallengesConsumerHook();
  const [{}, dispatchRun] = RunConsumerHook();
  const { showActionSheetWithOptions } = useActionSheet();
  const [crossingPoint, setCrossingPoint] = useState(props.route.params.crossingPoint)
  const [segmentSelected, setSegmentSelected] = useState({})
  let [loading, setLoading] = useState(false)
  let [segments, setSegments] = useState([])
  const isFocused = useIsFocused()

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: (crossingPoint.name == null 
        ? "Point de passage" + crossingPoint.id 
        : crossingPoint.name),
      
      headerLeft:(props) => (   
        <HeaderBackButton
          {...props}
          label='Retour'
          onPress={() => goBack()}
        />),
      headerRight:(props) => (   
        <Button
          {...props}
          title="Valider"
          onPress={() => valid()}
        />)
    });
  }, [props.navigation, segmentSelected, isFocused, segment]);


  useEffect(() => {
    setCrossingPoint(props.route.params.crossingPoint)
    
    setLoading(true)
    console.log(crossingPoint.id)
    RunService.allSegments(crossingPoint.id)
    .then((response) => response.data)
    .then((json) => {
      console.log(segments)
      setSegments(json.segments)})
    .catch(() => AlertHelper.show("error", "Erreur !", "Une erreur inconue c'est produite")    )
    .finally(() => setLoading(false));
  }, []);


  let goBack = () => {
    getNextAction(challengeSelected.id, dispatchChallenges)
    getChallenges(dispatchChallenges, challengeSelected.id)
    props.navigation.navigate('Challenge')
  }

  let valid = (s) => {
    //On vérifie que le segment est set
    if (segmentSelected.id == undefined){
      AlertHelper.show("warn", "Attention !", "Veuilliez choisir votre chemin avant de continuer")
    }
    else{
      //Si oui on envoit l'event et on continue
      if (props.route.params.crossingPoint.id == challengeSelected.start_crossing_point.id){
        sendStart(
          challengeSelected, 
          segmentSelected,
          dispatchChallenges,
          () => {
            move(showActionSheetWithOptions, dispatchRun, props.navigation, challengeSelected, segmentSelected)
          }  
        )
      }
      else{
        sendChoix(
          challengeSelected, 
          segmentSelected,
          dispatchChallenges,
          () => {
            move(showActionSheetWithOptions, dispatchRun, props.navigation, challengeSelected, segmentSelected)
          }  
        )
      }
    }
  }

  let pressSegment = (s) =>{
    setSegmentSelected(s)
  }

  return(
      <View style={styles.mainContainer}>
          <View style={styles.cardContainer}>
            <Carte/>
          </View>
          <View style={styles.bottomContainer}>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{flex:1}}
              showsHorizontalScrollIndicator={false}
            >
              { loading ? <ActivityIndicator/> : 
                <View style={styles.containerButtons}>
                  { segments.map((segmentCurrent) => 
                    
                    <Pressable key={segmentCurrent.id} 

                      style={segmentCurrent.id == segmentSelected.id ? styles.buttonContainerSelect : styles.buttonContainer}
                      onPress={() => {pressSegment(segmentCurrent)}}>
                        <Text style={styles.buttonText}>
                          {segmentCurrent.name == undefined 
                          ? "Segment n°" + (_.findIndex(segments, function(o) { return o.id == segmentCurrent.id; }) + 1)
                          : segmentCurrent.name
                          }            
                        </Text>
                    </Pressable>
                  )}
                  
                </View>
              }
            </ScrollView>
          </View>
      </View>

  )
}