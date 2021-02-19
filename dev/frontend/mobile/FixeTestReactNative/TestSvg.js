import React, { useState } from 'react';
import {StyleSheet, ReactNative, View} from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import randomColor from 'randomcolor';

const SvgComponent = (props) => {

  const [definedBackColor, setDefinedBackColor] = useState("transparent");

  const styles = StyleSheet.create({
    coloredArea: {
      backgroundColor: definedBackColor
    },
    greyArea: {
      backgroundColor: "grey"
    }
  });

  return (
    <>
      <Svg height="40%" width="100%" viewBox="0 0 100 150" {...props} style={styles.greyArea}>
        <Circle 
          cx="50" 
          cy="75" 
          r="45" 
          stroke="blue" 
          strokeWidth="2.5" 
          fill="green" 
          onPress={() => alert("Cercle")}
        />
        <Rect 
          x="15" 
          y="40" 
          width="70" 
          height="70" 
          stroke="red" 
          strokeWidth="2" 
          fill="yellow"
          onPress={() => alert("Rectangle")}
        />
      </Svg>
      <Svg height="20%" width="100%">
        <Path
          d="M10 40
            L100 100"
          stroke="black"
          strokeWidth="10"
          onPress={() => alert("trait noir")}
        />
        <Path
          d="M100 100
            L300 5"
          stroke="blue"
          strokeWidth="10"
          onPress={() => alert("trait bleu")}
        />
        <Path
          d="M300 5
            C340 20, 390 135, 350 150"
          stroke="green"
          strokeWidth="10"
          onPress={() => alert("trait vert")}
        />
      </Svg>
      <Svg height="40%" width="100%" style={styles.coloredArea}>
        <Path 
          d="M100,100
            L150,100
            a50,25 0 0,0 150,100
            q50,-50 70,-170
            Z"
          stroke="black"
          strokeWidth="5"
          onPress={() => { 
            setDefinedBackColor(randomColor());
            alert("témoin de deuxième action lors du clic sur le trait");
          }}
        />
      </Svg>
    </>
  );
}

export default SvgComponent;