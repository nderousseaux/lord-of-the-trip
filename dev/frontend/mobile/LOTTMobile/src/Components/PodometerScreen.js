import * as React from 'react';
import { Button, View } from 'react-native';

export default function PodometerScreen({ count, dispatch, navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
        <Button onPress={() => dispatch({ type: 'TEST' })} title="Increase test value" />
      </View>
    );
}