import * as React from 'react';
import { Button } from 'react-native-elements';

import styles from './Button.style.js';
import stylesClear from './ButtonClear.style.js';
import stylesOutline from './ButtonOutline.style.js';

export default function ButtonComponent(props){

  let typeStyle = () => {
    let res = styles;

    if (props.type !== undefined) {
      switch(props.type.toUpperCase()){
        case 'CLEAR':
          res = stylesClear;
          break;
        case 'OUTLINE':
          res = stylesOutline;
          break;
        default:
          res = styles;
      }  
    }
    
    return res
  }

  return(
    <Button
        titleStyle={typeStyle().title}
        buttonStyle={typeStyle().container}
        disabledStyle={typeStyle().disabledContainer}
        loadingStyle={typeStyle().loading}
        {...props}
    />
  );
}