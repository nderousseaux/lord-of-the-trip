import React from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet'

import Button from 'components/basics/button/ButtonComponent.jsx';
import { RunConsumerHook } from 'store/run/Run.store.js';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import { move } from 'helpers/RunHelper.js'

export default function ButtonGo(props){

  const [{ nextAction }] = ChallengesConsumerHook();
  const [{}, dispatchRun] = RunConsumerHook();
  const { showActionSheetWithOptions } = useActionSheet();

  let pressStart = () => {
    console.log("start")
  }

  let pressMove = () => {
    console.log(props)
    move(showActionSheetWithOptions, dispatchRun, props.navigation)
  }

  return(<>
    { nextAction == "start"
      ? <Button 
        onPress={ () => pressStart()}
        title="Démarrer le challenge !"
      />
      : <Button 
        onPress={ () => pressMove()}
        title="Démarrer la scéance!"
      />
    }
  </>)

}