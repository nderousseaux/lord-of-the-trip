import * as React from 'react';
import { Image, View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { useEffect, useState } from 'react';
import Svg, { Circle, Image as SvgImage, Polyline } from 'react-native-svg';
import { Card, Paragraph, Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Map from './ChallengeMap.js'
import api from '../../../api/api';


export default function ChallengeCard(props) {

    const [ challenge, setChallenge ] = useState(props.route.params.challenge);
    const [ distance, setDistance ] = useState("");
    const [ lastEvent, setLastEvent ] = useState("start");
    const [ obstacle, setObstacle ] = useState(null);

    useEffect(() => {
        api.getDistance(challenge["id"])
        .then((response) => setDistance(response.data["distance"]))
        .catch((error) => console.error(error))
    }, []);

    useEffect(() => {
        api.getChallenge(challenge["id"])
        .then((response) => setChallenge(response.data))
        .catch((error) => console.error(error))
    }, []);

    useEffect(() => {
        api.lastEvent(challenge["id"])
        .then((response) => {
            setLastEvent(response.data)
            return (response.data["segment_id"])})
        .then((segmentId) => {
            api.getObstacle(segmentId)
            .then((response) => response.data)
            .then((json) => {
                setObstacle(json["obstacles"][0])
            })
        })
        .catch((error) => {
            console.error(error)})
    }, []);

    return(
        <View style={styles.cardContainer}>
            {challenge === null
                ? <ActivityIndicator size="large" color="#0000ff" />
                : <>
                    <View
                        style={styles.InformationsContainer}
                    >
                        <Card style={styles.TitleCard}>
                            <Card.Title
                                title={challenge.name}
                            />
                        </Card>

                        <Card style={styles.PrimaryCard}>
                            <Card.Title
                                title="Informations"
                            />
                            <Card.Content>
                                <Paragraph>Niveau : {challenge.level}</Paragraph>
                                <Paragraph>Date de fin : {new Date(challenge.end_date).toLocaleDateString()}</Paragraph>
                                { distance != null 
                                    ? <Paragraph>Avancement fait : {distance} mètres</Paragraph>
                                    : <></>
                                }
                            </Card.Content>
                        </Card>
                    </View>

                    <View
                        style={styles.DescriptionContainer}
                    >
                        <Card style={styles.PrimaryCard}>
                            <Card.Title
                                title="Description"
                            />
                            <Card.Content>
                                <ScrollView style={styles.ScrollContainer}>
                                    <Paragraph>{challenge.description}</Paragraph>
                                </ScrollView>
                            </Card.Content>
                        </Card>
                    </View>
                    
                    <Map challenge={challenge}></Map>
                    { lastEvent != null
                        ? lastEvent == "start"
                            ? <Button 
                                title="Démarrer le challenge"
                                style={styles.Button}
                                onPress={() => (console.log("démarrer le challenge"))}
                            /> 
                            : lastEvent["event_type_id"] === 4 || lastEvent["event_type_id"] === 7
                                ? <Button 
                                    title="Répondre à l'obstacle"
                                    style={styles.Button}
                                    onPress={() => props.navigation.navigate("Obstacle", {
                                        obstacle: obstacle})}
                                /> 
                                : <Button 
                                    title="Let's go !"
                                    style={styles.Button}
                                    onPress={() => props.navigation.navigate("Transport", {
                                        challenge: challenge})}
                                />
                        :<></>
                    }
                    
                    
                </>
            }
        </View>
    )
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
        marginHorizontal: 10
    },
    PrimaryCard: {
        margin:10
    },
    Button: {
        marginBottom: 20
    }
});