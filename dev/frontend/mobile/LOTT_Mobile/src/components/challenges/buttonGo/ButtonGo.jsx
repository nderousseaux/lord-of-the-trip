import React from 'react';

import Button from 'components/basics/button/ButtonComponent.jsx';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';

export default function ButtonGo(props){

  const [{ nextAction }] = ChallengesConsumerHook();

  return(<>
    { nextAction == "start"
      ? <Button 
        onPress={ () => {}}
        title="Démarrer le challenge !"
      />
      : <Button 
        onPress={ () => {}}
        title="Courrir !"
      />



    }
  </>)

}