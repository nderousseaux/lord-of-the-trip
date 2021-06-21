import React from 'react';
import { View } from "react-native";

import styles from './Details.style.js';
import OneDetail from 'components/recording/details/oneDetail/OneDetail.jsx'
import { RunConsumerHook } from 'store/run/Run.store.js';

export default function Details(){

  const [{transport}] = RunConsumerHook();


  return(
      <View style={styles.mainContainer}>
        <OneDetail type="time"/>
        {
          transport == 'marche' 
            ? <OneDetail type="pas"/>
            : <OneDetail type="vitesse"/>
        }
        <OneDetail type="distance"/>
      </View>

  )
}