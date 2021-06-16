import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from 'scenes/challenges/home/Home.jsx';
import SubscribeChallenges from 'scenes/challenges/subscribeChallenges/SubscribeChallenges.jsx';
import ChallengeDescription from 'scenes/challenges/challengeDescription/ChallengeDescription.jsx';
import Recording from 'scenes/run/recording/Recording';
import CrossingPoint from 'scenes/run/crossingPoint/CrossingPoint.jsx';


const Stack = createStackNavigator()

export default function ChallengeStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name='Challenges' component={Home} options={{headerLeft:null}}/>
        <Stack.Screen name='Challenges disponibles' component={SubscribeChallenges} options={{headerLeft:null}}/>
        <Stack.Screen name='Challenge' component={ChallengeDescription} options={{headerBackTitle : "Retour"}}/>
        <Stack.Screen name='Recording' component={Recording} options={{ headerShown: false}}/>
        <Stack.Screen name='Point de passage' component={CrossingPoint}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}