import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Pedometer } from 'expo-sensors';
import { distanceTotale, vitesseMoyenne } from '../../utilsGPS';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import apiFonctions from '../../api/api';
import ChallengeMap from './ChallengeCard/ChallengeMap'

class Recording extends React.Component {
    state = {
        errorMessage: "",
        nbPas: 0,
        distance:0,
        vitesse: 0,
        vitesseMoyenne: 0,
        segment: null,
        distanceSegment: 0,
        obstacle: null,
        log: [],
        dateDebut: new Date(),
        displayDuree: "00:00",
        uniteDuree: "minute",
        intervalTemps: null,
        intervalGps: null,
    }

    componentDidMount() {

        
        apiFonctions.lastEvent(this.props.route.params.challenge.id)
            .then((response) => response.data)
            .then((json) => {
                apiFonctions.getSegment(this.props.route.params.challenge.id, json["segment_id"])
                .then((response) => response.data)
                .then((json) => {
                    this.setState({segment: json})
                    return json
                })
                .then((segment) => {
                    apiFonctions.getObstacle(segment["id"])
                    .then((response) => response.data)
                    .then((json) => {
                        this.setState({obstacle: json["obstacles"][0]})
                    })
                    apiFonctions.distanceSegment(segment["id"])
                    .then((response) => response.data)
                    .then((json) => {
                        this.setState({distanceSegment: json["distance"]})
                    })
    
    
                })
            })
            .catch((error) => console.error(error))
        

       
        this.setState({intervalTemps:setInterval(this.displayTempsCourse, 1000)})
        if ( this.props.route.params.transport ==  "marche" ){
            this._subscribePedometer();
        }
        else {
            this.setState({intervalGps: setInterval(this._getLocation, 1000)})
        }
    }
    
    componentWillUnmont() {
        clearInterval(this.state.intervalTemps);
        if ( this.props.route.params.transport ==  "marche" ){
            this._unsubscribePedometer();
        }
        else {
            clearInterval(this.state.intervalGps);
        }
    }
    
    _subscribePedometer = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                nbPas: result.steps,
                distance: result.steps * 0.8
            });
        });
    
        Pedometer.isAvailableAsync().then(
          result => {
            this.setState({
              errorMessage: String(result),
            });
          },
          error => {
            this.setState({
              errorMessage: 'Could not get isPedometerAvailable: ' + error,
            });
          }
        );
    }

    _unsubscribePedometer = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    _getLocation = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
    
        if (status !== 'granted'){
          this.setState({vitesse: "Permission refusée"})
        }
        else {
            const location = await Location.getCurrentPositionAsync();
            this.locationChanged(location);
        }
    
    }

    locationChanged = (location) => {
        //On enregistre le log
        let log = this.state.log
        log.push(location);
        this.setState({log})
    
        //On enregistre la vitesse
        this.setState({vitesse:location.coords.speed})
        
        let multi = 1
        if ( this.props.route.params.transport == "velo" ) {
            multi = 2
        }
        //on enregistre la distance totale  
        this.setState({distance:distanceTotale(this.state.log) * multi }) 
        
        //On détermine la vitesse moyenne
        this.setState({vitesseMoyenne: vitesseMoyenne(this.state.log)})

        if (this.distanceAvantObstacle(this.state.distanceSegment) > 0){
            console.log("Distance avant obstacle", this.distanceAvantObstacle(this.state.distanceSegment + this.state.distance))
            if (this.distanceAvantObstacle(this.state.distanceSegment + this.state.distance) <= 0){
                this.stopObstacle()
                this.props.navigation.navigate("Obstacle", {
                    obstacle: this.state.obstacle});
            }
        }
      }

    stopObstacle = () => {
        clearInterval(this.state.intervalTemps);

        if ( this.props.route.params.transport !=  "marche" ){
            clearInterval(this.state.intervalGps);
        }

        let dateFin = new Date()

        let duree = dateFin.getTime() - this.state.dateDebut.getTime()
        
        apiFonctions.addEvent(    
            this.props.route.params.challenge["id"], 
            this.state.segment["id"],
            this.props.route.params.transport, 
            this.state.dateDebut, 
            this.state.distance, 
            duree,
            3).then(() => {
                apiFonctions.addEvent(    
                    this.props.route.params.challenge["id"], 
                    this.state.segment["id"],
                    this.props.route.params.transport, 
                    this.state.dateDebut, 
                    0,
                    duree,
                    4)
            })
    
        this.createTwoButtonAlert(4);
    }


    stop = (idEvent) => {
        clearInterval(this.state.intervalTemps);

        if ( this.props.route.params.transport !=  "marche" ){
            clearInterval(this.state.intervalGps);
        }

        let dateFin = new Date()

        let duree = dateFin.getTime() - this.state.dateDebut.getTime()
        
        apiFonctions.addEvent(    
            this.props.route.params.challenge["id"], 
            this.state.segment["id"],
            this.props.route.params.transport, 
            this.state.dateDebut, 
            this.state.distance, 
            duree,
            3)
    
        this.createTwoButtonAlert(idEvent);
    }

    createTwoButtonAlert = (idEvent) => {
        let msg;

        switch (idEvent) {
        case 3:
            msg = "Vous avez courru " + Math.round(this.state.distance) + "m !"
            break;
        case 4:
            msg = "Vous avez courru " + Math.round(this.state.distance) + "m ! Pour continuer votre progression, vous devez passer l'obstacle."
            break;
        case 8:
            msg = "Vous avez courru " + Math.round(this.state.distance) + "m ! Pour continuer votre progression, vous devez choisir votre chemin."
        case 2:
            msg = "Vous avez courru " + Math.round(this.state.distance) + "m ! Vous avez fini le challenge !"
            break;
        default:
            msg = "Erreur"
        }
    
        Alert.alert(
        "Bravo !",
        msg,
        [
            { text: "OK" }
        ]
        );
    }

    displayTempsCourse = async () => {
        let dateFin = new Date()

        let duree = Math.round((dateFin.getTime() - this.state.dateDebut.getTime())/1000)
        
        let uniteDuree = "minute"

        let heure = "00";
        let minute = "00";
        let seconde = "00";
        seconde = duree%60 > 9 ? duree%60 : "0"+duree%60;
        minute = Math.trunc(duree/60) > 9 ? Math.trunc(duree/60) : "0"+ Math.trunc(duree/60);
        heure = Math.trunc(duree/3600) > 9 ? Math.trunc(duree/3600) : "0"+ Math.trunc(duree/3600);
        //Heures
        if (duree >= 3600) {
            uniteDuree = duree > 7199 ? "heures": "heure"
            
            this.setState({
                displayDuree: heure + ":" + minute,
                uniteDuree
            })            
        }
        //minutes
        else {
            uniteDuree = duree > 119 ? "minutes": "minute"
            
            this.setState({
                displayDuree: minute + ":" + seconde,
                uniteDuree
            })

        }
    }

    distanceAvantObstacle = (distanceSegment) => {
        let positionObstacle = this.state.segment["length"] * this.state.obstacle["progress"]
        return positionObstacle - distanceSegment 
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.map}>
                    <ChallengeMap challenge={ this.props.route.params.challenge }/>
                </View>
                <View style={styles.foot}>
                    <View style={styles.left}>
                        <Button 
                                title="Stop"
                                titleStyle={{
                                    fontSize: 30,
                                }}
                                onPress={() => {
                                    this.stop(3);
                                    this.props.navigation.navigate("Infos", {
                                        challenge: this.props.route.params.challenge})}}
                                buttonStyle={styles.stop}
                            />
                    </View>
                    <View style={styles.right}>
                        <View style={styles.div}>
                            <View style={styles.divTop}>
                                <Text style={styles.textTop}>TEMPS</Text>
                            </View>
                            <View style={styles.divMid}>
                                <Text style={styles.textMid}>{ this.state.displayDuree }</Text>
                            </View>
                            <View style={styles.divBottom}>
                                <Text style={styles.textTop}>{ this.state.uniteDuree }</Text>
                            </View>
                        </View>
                        { this.props.route.params.transport == "marche" ? 
                            <>
                                <View style={styles.div}>
                                    <View style={styles.divTop}>
                                        <Text style={styles.textTop}>MARCHE</Text>
                                    </View>
                                    <View style={styles.divMid}>
                                        <Text style={styles.textMid}>{ this.state.nbPas }</Text>
                                    </View>
                                    <View style={styles.divBottom}>
                                        <Text style={styles.textTop}>pas</Text>
                                    </View>
                                </View>
                            </>:
                            <>
                                <View style={styles.div}>
                                    <View style={styles.divTop}>
                                        <Text style={styles.textTop}>VITESSE</Text>
                                    </View>
                                    <View style={styles.divMid}>
                                        <Text style={styles.textMid}>{ Math.round(Math.round(this.state.vitesse)*3.6) }</Text>
                                    </View>
                                    <View style={styles.divBottom}>
                                        <Text style={styles.textTop}>km/h</Text>
                                    </View>
                                </View>
                            </> }
                        <View style={styles.div}>
                            <View style={styles.divTop}>
                                <Text style={styles.textTop}>PARCOURU</Text>
                            </View>
                            { Math.round(this.state.distance).toString().length > 2 ? 
                                <>
                                    <View style={styles.divMid}>
                                        <Text style={styles.textMid}>{ Math.round(Math.round(this.state.distance)/100)/10 }</Text>
                                    </View>
                                    <View style={styles.divBottom}>
                                        <Text style={styles.textTop}>km</Text>
                                    </View>
                                </> :
                                <>
                                    <View style={styles.divMid}>
                                        <Text style={styles.textMid}>{ Math.round(this.state.distance) }</Text>
                                    </View>
                                    <View style={styles.divBottom}>
                                        <Text style={styles.textTop}>m</Text>
                                    </View>
                                </>
                            }
                            
                        </View>                 
                    </View>
                </View>
            </View>
        )
    }
}
export default Recording;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map:{
        flex:7,
    },
    foot:{
        flex:1,
        backgroundColor:'#F9F9F9',
        flexDirection:'row'
    },
    left:{
        flex:2,
        padding: '2%',
    },
    right:{
        flex:6,
        flexDirection:'row'
    },
    stop:{
        backgroundColor:'red',
        borderRadius:20,
        height:'100%',
        fontSize:200
    },
    div:{
        flex:1,
        padding: 4,
        borderColor:'black',
        alignItems:'center'

    },
    textTop:{
        textAlign:'center',
        fontSize:14,
        color:'#121212'
    },
    textMid:{
        textAlign:'center',
        fontSize:30,
        color:'#121212'
    },
    divTop:{
        flex:1,
    },
    divMid:{
        flex:2,
    },
    divBottom:{
        flex:1,
    }
});