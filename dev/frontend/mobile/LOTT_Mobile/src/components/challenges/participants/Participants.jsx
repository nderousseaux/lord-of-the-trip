import React from 'react';
import { View, Text } from "react-native";
import { Icon } from 'react-native-elements'

import styles from './Participants.style.js'
import colors from 'colors/Colors.style.js'

export default function Participants(props) {
  
  return (
    <View style={styles.container}>
      <Icon
        name='users' 
        type='font-awesome'
        color={colors.secondary}
      />
      <Text
        style={styles.text}  
      >
        { props.numberOfParticipants } 
        {
          props.numberOfParticipants != undefined && props.numberOfParticipants > 1
          ? ' participants'
          : ' participant'
        }

      </Text>
            
    </View>
  );
}