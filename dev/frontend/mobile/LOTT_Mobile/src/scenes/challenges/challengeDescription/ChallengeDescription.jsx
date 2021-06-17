import React from 'react';

import ChallengeBigCard from 'components/challenges/challengeBigCard/ChallengeBigCard.jsx';
import { ScrollView } from 'react-native';

export default function ChallengeDescription(props){

  return(
    <>
      <ChallengeBigCard {...props}/>
    </>
  );

}