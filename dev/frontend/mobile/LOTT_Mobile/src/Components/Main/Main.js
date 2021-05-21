import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ChallengeCard from './ChallengeCard/ChallengeCard';
import ChallengeList from './ChallengesList';
import Transport from './Transport'
import Recording from './Recording'
import Obstacle from './Obstacle'
import Choix from './Choix'

export default function SelectChallenge(props) {

    const listStack = createStackNavigator();

    return(
        <listStack.Navigator initialRouteName="Challenges">
            <listStack.Screen name="Challenges" component={ChallengeList} options={{ headerLeft:null}} />
            <listStack.Screen name="Infos" component={ChallengeCard} />
            <listStack.Screen name="Transport" component={Transport} />
            <listStack.Screen name="Recording" component={Recording} options={{ headerLeft:null}} />
            <listStack.Screen name="Obstacle" component={Obstacle} options={{ headerLeft:null}}/>
            <listStack.Screen name="Choix" component={Choix} options={{ headerLeft:null}}/>
        </listStack.Navigator>
    )
}

const styles = StyleSheet.create({
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});