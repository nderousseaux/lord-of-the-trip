import React from 'react';

import { getChallenges } from 'helpers/ChallengesHelper.js';
import ChallengesService from 'services/challenges/Challenges.service.js'
import Button from 'components/basics/button/ButtonComponent.jsx'
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';

export default function UnsubscribeButton(props){

  const [{}, dispatchChallenges] = ChallengesConsumerHook();

  let pressUnsubscribe = (id) => {
    ChallengesService.unSubscribeChallenge(id)
    .then(() => {
      getChallenges(dispatchChallenges, id)
    })
    .then(() => {
      props.navigation.navigate('Challenges');
    })

  }

  return(    
    <Button
      title="Se désinscrire"
      type="clear"
      onPress={() => {pressUnsubscribe(props.challenge.id)}}
    />
  );

}