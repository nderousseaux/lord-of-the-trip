import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from "react-native";

import RunService from 'services/run/Run.service.js'
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
import { getNextAction } from 'helpers/RunHelper';
import { RunConsumerHook } from 'store/run/Run.store.js';
import EventsService from 'services/events/Events.service';
import _ from 'lodash';


export default function ChallengeBigCard(props){

  
  const [{ loading, challengeSelected, segment }, dispatchChallenges] = ChallengesConsumerHook();
  const [{distanceSegment}, dispatchRun] = RunConsumerHook();

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

  useEffect(() => {
    console.log("useEffect")
    if(segment.id != null){
      console.log("segement")
      RunService.distanceSegment(segment.id)
      .then((res) => {
        console.log(res.data.distance / segment.length)
        dispatchRun({
        type: 'SET_DISTANCE_SEGMENT',
        distanceSegment: res.data.distance
      })})
      .catch((err)=>{console.log(err.response.data)})
    }
    
  }, [segment]);

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

  let onRefresh = () => {
    getNextAction(challengeSelected.id, dispatchChallenges)
    EventsService.getAllEvents(challengeSelected.id)
    .then((res) => dispatchRun({
          type: 'SET_OBSTACLES_REP',
          obstacles: _.map(
            _.filter(
                res.data.events, 
                function(o){return o.event_type_info.id==4}
            ),
            function(o){return o.obstacle_id}
        )
      })
    )
  }

  return(    
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
        />
      }
    
    
    >

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
            <Details {...props}/>
  
            <Description
              type="big"
              text={challengeSelected.description}
            />
            
            <View style={styles.carteContainer}>
              {(segment.id != null && distanceSegment) && distanceSegment < segment.length
              ?<Carte
                  // Exemple de UserProgress
                  UserProgress={{
                        segment: segment.id,
                        progress: distanceSegment / segment.length
                    }}
                  

                  // UserProgress vide (pas d'avancée enregistrée)
                  /*UserProgress={{
                    segment: 0
                  }}*/

                  //Possibilité de ne pas mettre de UserProgress (géré dans le code)7
                  
                  FocusedSegments={[]}
                  PathSegments={[]}
                  Challenge={challengeSelected}
              />
              : <Carte
            
                  // Exemple de UserProgress
                  // UserProgress={{
                  //     segment: segment.id,
                  //     progress: distanceSegment / segment.length
                  // }}

                  // UserProgress vide (pas d'avancée enregistrée)
                  /*UserProgress={{
                    segment: 0
                  }}*/

                  //Possibilité de ne pas mettre de UserProgress (géré dans le code)7
                  
                  FocusedSegments={[]}
                  PathSegments={[]}
                  Challenge={challengeSelected}
              />
              }
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
    </ScrollView>
    );

}