import React, {useEffect} from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet'

import Button from 'components/basics/button/ButtonComponent.jsx';
import { RunConsumerHook } from 'store/run/Run.store.js';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import { move } from 'helpers/RunHelper.js'
import { getNextAction } from 'helpers/RunHelper';

export default function ButtonGo(props){

  const [{ nextAction, challengeSelected, segment }] = ChallengesConsumerHook();
  const [{}, dispatchRun] = RunConsumerHook();
  const { showActionSheetWithOptions } = useActionSheet();
  
  let pressStart = () => {
    props.navigation.navigate("Point de passage", {
      crossingPoint: challengeSelected.start_crossing_point})   
  }
  let pressChoix = () => {
    
    props.navigation.navigate("Point de passage", {
      crossingPoint: segment.end_crossing_point})   
  }

  let pressMove = () => {
    move(showActionSheetWithOptions, dispatchRun, props.navigation, challengeSelected, segment)
  }

  return(<>
    { nextAction == "start"
      ? <Button 
        onPress={ () => pressStart()}
        title="Démarrer le challenge !"
      />
      : nextAction == "choose_segment" 
        ? <Button 
          onPress={ () => pressChoix()}
          title="Choisir son chemin"
        />        
        : nextAction == "arrival"
          ? <Button
              disabled
              type='outline'
              title='challenge terminé'
            />
          : <Button 
              onPress={ () => pressMove()}
              title="Démarrer la scéance!"
            />
    }
  </>)

}