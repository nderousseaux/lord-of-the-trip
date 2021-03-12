import React from 'react';
import { View, StyleSheet } from 'react-native';
import Podometre from './Components/Pedometer.js';
import Gps from './Components/Gps.js';

export default function App() {
  return (
      <View style={styles.container}>
            <Podometre/>
            <Gps/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
