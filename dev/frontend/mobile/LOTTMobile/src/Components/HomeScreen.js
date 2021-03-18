import * as React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen({ route }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>The Lord of the Trips</Text>
        <Text>Valeur de test : {route.params.count}</Text>
      </View>
    );
}