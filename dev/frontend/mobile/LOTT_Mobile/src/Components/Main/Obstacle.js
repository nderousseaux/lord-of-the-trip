import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import {  useState, useEffect } from 'react';
import { Text, Button} from 'react-native-elements';
import api from '../../api/api';

export default function Obstacle(props) {
    
    const [ obstacle, setObstacle ] = useState(props.route.params.obstacle);
    const [ reponseState, setReponseState ] = useState("")
    const [ response, setResponse ] = useState("");
    
    let sendResponse = () => {
        api.sendResponse(obstacle["segment"]["challenge"]["id"], obstacle["segment_id"], obstacle["id"], response)
        .then((res) => res.data)
        .then((data) => {setReponseState(data["event_type_id"])
        })
    }

    let go = () => {
        props.navigation.navigate("Transport", {
            challenge: obstacle["segment"]["challenge"]})
    }

    return (
        <>
            <View style={styles.cardContainer}>
                <View
                    style={styles.InformationsContainer}
                >
                    <Card style={styles.TitleCard}>
                        <Text style={styles.Title}>
                            {obstacle.label}
                        </Text>
                    </Card>

                    <Card style={styles.PrimaryCard}>
                        <Text>
                            Votre réponse :
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setResponse}
                            value={response}
                        />

                        {reponseState == '7'
                            ? <Text> Mauvaise réponse !</Text>
                            : reponseState == '6'
                            ? <Text>Bonne réponse !</Text>
                            : <></>
                        }
                        
                        {reponseState == '6'
                            ? <Button
                                style={styles.Button}
                                title="Continuer à courrir"
                                type="solid"
                                onPress={go}>
                            </Button>
                            :
                            <Button
                                style={styles.Button}
                                title="Valider"
                                type="outline"
                                onPress={sendResponse}>
                            </Button>

                        }

                            <Button
                                style={styles.Button}
                                title="Arrêter la course"
                                type=""
                                onPress={() => props.navigation.navigate("Challenges", {
                                    challenge: obstacle["segment"]["challenge"]})}
                                >
                            </Button>
                        
                    </Card>
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
        paddingVertical: 10 
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
    },
    Button:{
        marginBottom:20
    },

});