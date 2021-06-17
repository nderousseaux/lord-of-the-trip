import React, {useEffect, useState} from 'react';
import { View, Text, Button, ActivityIndicator, Image} from "react-native";
import { HeaderBackButton } from 'react-navigation-stack';
import { Button as ButtonElement } from 'react-native-elements'
import { useActionSheet } from '@expo/react-native-action-sheet'
import * as ImagePicker from 'expo-image-picker';

import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import { getNextAction } from 'helpers/RunHelper';
import { getChallenges } from 'helpers/ChallengesHelper.js';
import Input from "components/basics/input/InputComponent.jsx";
import RunService from 'services/run/Run.service.js'
import { AlertHelper } from "helpers/AlertHelper.js";
import { Icon } from 'react-native-elements'
import colors  from 'colors/Colors.style.js'
import { RunConsumerHook } from 'store/run/Run.store.js';
import { move } from 'helpers/RunHelper.js';


import styles from './Obstacle.style.js';
import EventsService from 'services/events/Events.service.js';

export default function Obstacle(props){

  const [{challengeSelected, obstacleId, segment}, dispatchChallenges] = ChallengesConsumerHook();
  const [obstacle, setObstacle] = useState(null);
  const [{}, dispatchRun] = RunConsumerHook();
  const [loading, setLoading] = useState(true);
  const [reponse, setReponse] = useState('');
  const { showActionSheetWithOptions } = useActionSheet();
  const [etatReponse, setEtatReponse] = useState(null);
  const [image, setImage] = useState(null);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: 'Obstacle',
      headerLeft:(props) => (   
        <HeaderBackButton
          {...props}
          label='Retour'
          onPress={() => goBack()}
        />),
      
      headerRight:(props) => (   
        <Button
          {...props}
          title= {
            etatReponse == 'OBSTACLE_REP_OK' 
            ? 'Continuer à courir' 
            : 'Valider '
          } 
          disabled={isDisabled()}
          onPress= {etatReponse == 'OBSTACLE_REP_OK' ? () => run() : () => valid()} 
        />)
    });
  }, [props.navigation, obstacle, reponse, etatReponse, image, loading]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          AlertHelper.show("error", "Erreur !", "Sorry, we need camera roll permissions to make this work!")
        }
      }
    })();
  }, []);

  const isDisabled = () => {
    if (loading){
      return true
    }
    if (obstacle == null){
      return false
    }
    if (obstacle.question_type == 0){
      return !reponse
    }
    else {
      if (image == null){
        return true
      }
      else{
        return false
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    setLoading(true)
    RunService.getObstacle(obstacleId)
    .then((res) => setObstacle(res.data))
    .catch((err) => {
      console.log(err.response)
      AlertHelper.show("error", "Erreur !", "Une erreur inconue c'est produite")
      goBack()
    })
    .finally(() => setLoading(false))
  }, [obstacleId]);

  let goBack = () => {
    getNextAction(challengeSelected.id, dispatchChallenges)
    getChallenges(dispatchChallenges, challengeSelected.id)
    props.navigation.navigate('Challenge')
  }

  let valid = () => {
    if (obstacle == null){
      AlertHelper.show("warn", "Erreur !", "Veuillez attendre la fin du chargement (Vous avez peut-être une mauvaise connection ?)")
    }
    else if (obstacle.question_type == 0){
      validText()
    }
    else{
      validPhoto()
    }
  }

  let validText = () => {
    EventsService.eventReponse(obstacle.id, reponse)
    .then((res) => {
      setEtatReponse(res.data.event_type_info.code)
    })
    .catch((err) => {
      AlertHelper.show("error", "Erreur !", "Une erreur inconnue c'est produite")
    })

  }

  let validPhoto = () => {
    setLoading(true)
    EventsService.eventReponsePhoto(obstacle.id, image)
    .then((res) => {
      goBack()
    })
    .catch((err) => {
      console.log(err.response.status)
      if(err.response.status){
        AlertHelper.show("error", "Erreur !", "L'image est trop grosse !")  
      }
      else{
        AlertHelper.show("error", "Erreur !", "Une erreur inconnue c'est produite")  
      }
      
    })
    .finally(() => {
      setLoading(false)
    })


  }

  let run = () => {
    move(showActionSheetWithOptions, dispatchRun, props.navigation, challengeSelected, segment)
  }

  return(
      <View style={styles.mainContainer}>
        { loading || obstacle == null
            ? <ActivityIndicator size="large"/>
            : <View style={styles.obstacleContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>
                    {obstacle.label}
                  </Text>
                </View>
                { obstacle.description != null
                    ? <View style={styles.descriptionContainer}>
                        <Text style={{fontSize:22, fontWeight:'bold'}}> 
                          Description : 
                        </Text>
                        <Text style={styles.description}>
                          {obstacle.description}
                        </Text>
                      </View>
                    : <></>
                }
                { obstacle.question_type == 0
                  ? <View style={styles.reponseContainer}>
                    
                    <Input
                      label='Réponse'
                      placeholder='43 évidemment !'
                      value={reponse}
                      onChangeText={value => setReponse(value)}
                    ></Input>

                    { etatReponse == 'OBSTACLE_REP_OK'
                    ? <><Icon
                      name='check-circle' 
                      type='font-awesome'
                      color={colors.secondary}
                      />
                      <Text>Bonne réponse !</Text></>
                    : etatReponse == 'OBSTACLE_REP_KO'
                    ? <><Icon
                      name='times-circle' 
                      type='font-awesome'
                      color={colors.secondary}
                      />
                      <Text>Mauvaise réponse !</Text></>
                    :<></>

                    }    
                  </View>
                  : <View style={styles.reponseContainer}>
                    <ButtonElement title="Uploader une photo" onPress={pickImage} 
                      buttonStyle={{backgroundColor: colors.primary, marginBottom:20}}
                      icon={ <Icon
                        name="folder-open"
                        color="white"
                      />}
                    />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    
                  </View>
                }
                

              
              </View>
        }
      </View>
  )
}