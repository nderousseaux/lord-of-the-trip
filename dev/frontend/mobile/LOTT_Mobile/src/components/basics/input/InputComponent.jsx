import * as React from 'react';
import { Input } from "react-native-elements";

import styles from "./Input.style.js";


export default function InputComponent(props){
  return(
    <Input
        labelStyle={styles.label}
        inputStyle={styles.input}
        {...props}
    />
  );
}