import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import {  useState, useEffect } from 'react';
import { Text, Button} from 'react-native-elements';
import api from '../../api/api';

export default function Choix(props) {

    const [ segments, setSegments ] = useState(props.route.params.segments);

    let selectSegment = (segment) => {
        let idEvent = 9

        if( props.route.params.start) {
            idEvent = 1
        }

        api.addEvent(props.route.params.segments[0].challenge.id, segment.id, undefined, undefined, undefined, undefined, idEvent)
        .then(() => {
            props.navigation.navigate("Transport", {
                challenge: segment["challenge"]})
        })
        
    }
    return (
        <>
            <View style={styles.cardContainer}>
                <View
                    style={styles.InformationsContainer}
                >
                    <Card style={styles.TitleCard}>
                        <Text style={styles.Title}>
                            Quel chemin allez-vous emprunter ?
                        </Text>
                    </Card>
                    {props.route.params.segments.map((segment) => {
                        return <Card style={styles.PrimaryCard}>
                            <Text>{segment["name"]}</Text>
                            <Text>Distance : {parseInt(segment["length"])} m </Text>
                            {segment["obstacles"].length > 0
                                ? <Text>Un obstacle sur la route !</Text>
                                : <></>
                            }
                            <Button
                                title="Choisir ce chemin"
                                type=""
                                onPress={() => selectSegment(segment)}
                                >
                            </Button>
                            
                        </Card>
                    })}
                    <Button
                        style={styles.Button}
                        title="Arrêter la course"
                        type=""
                        onPress={() => props.navigation.navigate("Challenges")}
                        >
                    </Button>
                </View>
            </View>  
        </>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: '#e7e7e7',
    },
    InformationsContainer: {
        flex: 4,
        overflow: 'hidden'
    },
    DescriptionContainer: {
        flex: 3,
        overflow: 'hidden',
        justifyContent: 'flex-end'
    },
    ScrollContainer: {
        height: '75%',
    },
    zoomContainer: {
        flex: 3,
        overflow: 'hidden',
        margin: 10,
    },
    mapBackgroundContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    zoomableView: {
      backgroundColor: 'transparent',
    },
    map: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent'
    },
    TitleCard: {
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems:'center'
    },
    PrimaryCard: {
        marginTop: 10,
        padding: 10 
    },
    Button: {
        marginBottom: 20
    },
    Title:{
        fontSize:30,
        textAlign:'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    }

});