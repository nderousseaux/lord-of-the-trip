import React from 'react'
import { View, Text } from 'react-native'
import { Pedometer } from 'expo-sensors';

class PedometerComponent extends React.Component {

    state = {
        isPedometerAvailable: 'checking',
        nbPas: 0,
    }

    componentDidMount() {
        this._subscribe();
    }
    
    componentWillUnmount() {
        this._unsubscribe();
    }
    
    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                nbPas: result.steps,
            });
        });
    
        Pedometer.isAvailableAsync().then(
          result => {
            this.setState({
              isPedometerAvailable: String(result),
            });
          },
          error => {
            this.setState({
              isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
            });
          }
        );
    }

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };
    
    
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
