import React from 'react';
import { View, Text } from "react-native";

import styles from './Date.style.js';
import { utcToString } from 'helpers/DateHelper.js'

export default function Date(props) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {
          props == undefined
          ? "Pas de date"
          : utcToString(props.startDate) + ' - ' + utcToString(props.endDate)
        }
      </Text>
    </View>
  );
}