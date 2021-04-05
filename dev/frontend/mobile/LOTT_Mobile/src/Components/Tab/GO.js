import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './GO/Start';
import Recording from './GO/Recording';

export default function GO(props) {

    const listStack = createStackNavigator();

    return(
        <listStack.Navigator>
            <listStack.Screen name="Start" component={Start} />
            <listStack.Screen name="Recording" component={Recording} />
        </listStack.Navigator>
    )
}