import React from 'react';
import { View, Text } from "react-native";

import Markdown from 'react-native-markdown-display';
import styles from './Description.style.js';

export default function Description(props){


  return(    
    <View style={
      props.type == 'big'
      ? styles.mainContainerBig
      : styles.mainContainer
    }>
        <Markdown 
            style={styles.descriptionText}
        >
            {props.text}
        </Markdown>
    </View>
  );

}