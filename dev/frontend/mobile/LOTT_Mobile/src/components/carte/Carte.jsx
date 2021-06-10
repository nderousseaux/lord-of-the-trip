import React from 'react';
import { View, Text } from "react-native";

import styles from './Carte.style.js';

export default function Carte(){

  return(    
    <View style={styles.mainContainer}>
        <Text>
            Je suis une carte
        </Text>
    </View>
  );

}