import React from 'react';
import { View } from "react-native";

import { Button } from 'react-native-elements';
import styles from './StopButton.style.js';


export default function stopButton(){

  return(
      <View style={styles.mainContainer}>
          <Button 
            title='Oui'
            style={styles.button}
          />
      </View>

  )
}