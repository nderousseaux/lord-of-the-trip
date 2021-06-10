import React from 'react';
import { View, Text } from "react-native";

import styles from './Description.style.js';

export default function Description(props){


  return(    
    <View style={styles.mainContainer}>
        <Text 
            style={styles.descriptionText}
            numberOfLines={props.numberOfLines}
        >
            {props.text}
        </Text>
    </View>
  );

}