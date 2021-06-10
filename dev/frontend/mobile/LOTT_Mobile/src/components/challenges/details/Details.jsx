import React from 'react';
import { View, Text } from "react-native";

import styles from './Details.style.js';

export default function Description(props){


  return(    
    <View style={styles.mainContainer}>
        <Text>
            Je suis un détail
        </Text>
    </View>
  );

}