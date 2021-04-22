import React from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { distanceTotale, vitesseMoyenne } from '../utils.js';

class GPS extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      speed: 0,
      distance: 0,
      vitesseMoyenne: 0,
      log : []
    }
  }

  componentDidMount() {
    setInterval(this._getLocation, 10000);
  }  

  _getLocation = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted'){
      this.setState({speed: "Permission refusée"})
    }

    const location = await Location.getCurrentPositionAsync();
    this.locationChanged(location);
  }
  
  locationChanged = (location) => {
    //On enregistre le log
    let log = this.state.log
    log.push(location);
    this.setState({log})

    //On enregistre la vitesse
    this.setState({speed:location.coords.speed})
    
    //on enregistre la distance totale
    this.setState({distance:distanceTotale(this.state.log)})
    
    //On détermine la vitesse moyenne
    this.setState({vitesseMoyenne: vitesseMoyenne(this.state.log)})
  }

  
  render() {
    return (
      <View>
        <Text>Gps :</Text>
        <Text>Speed Actuel : {this.state.speed} m/s</Text>
        <Text>Distance Totale : {Math.round(this.state.distance)} m</Text>
        <Text>Distance Totale : {Math.round(this.state.distance/1000)} km</Text>
        <Text>Vitesse moyenne : {Math.round(this.state.vitesseMoyenne)} m/s</Text>
        <Text>Vitesse moyenne : {Math.round(Math.round(this.state.vitesseMoyenne)*3.6)} km/h</Text>
        <Text>Nb points : {this.state.log.length}</Text>
      </View>
    )
  }
}

export default GPS;