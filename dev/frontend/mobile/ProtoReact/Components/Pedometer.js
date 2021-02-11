import React from 'react'
import { View, Text } from 'react-native'
//import Pedometer from "react-native-pedometer";

class PedometerComponent extends React.Component {

    state = {
        isPedometerAvailable: 'checking',
        nbPas: 0,
    }

    componentDidMount() {
        // Pedometer.isSupported().then((result) => {
        //     if (result) {
        //         state.isPedometerAvailable = "Disponible";
       
        //       const myModuleEvt = new NativeEventEmitter(NativeModules.Pedometer);
        //       myModuleEvt.addListener('StepCounter', (data) => {
        //         state.nbPas = data.steps;
        //       });
       
        //       Pedometer.startStepCounter();
        //     } else {
        //         state.isPedometerAvailable = "Indisponible";
        //     }
        // });
    }
    
      render() {
        return (
          <View>
            <Text>Etat du podomètre : {this.state.isPedometerAvailable}</Text>
            <Text>Nombre de pas : {this.state.nbPas}</Text>
          </View>
        );
      }
    }
  


export default PedometerComponent;
