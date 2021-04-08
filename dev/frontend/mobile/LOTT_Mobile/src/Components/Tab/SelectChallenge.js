import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ChallengeCard from './Challenges/ChallengeCard';
import ChallengeList from './Challenges/ChallengeList';

export default function SelectChallenge(props) {

    const listStack = createStackNavigator();

    return(
        <listStack.Navigator initialRouteName="List">
            <listStack.Screen name="List" component={ChallengeList} />
            <listStack.Screen name="Card" component={ChallengeCard} />
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