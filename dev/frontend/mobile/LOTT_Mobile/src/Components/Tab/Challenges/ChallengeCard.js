import * as React from 'react';
import { Image, View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { useEffect, useState } from 'react';
import Svg, { Circle, Image as SvgImage, Polyline } from 'react-native-svg';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import { Card, Paragraph, Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';


export default function ChallengeCard(props) {

    const [ challenge ] = useState(props.route.params.challenge);
    const [ zoomMap, setZoomMap ] = useState(1);

    const ResizeMapDots = (event, gestureState, zoomableViewEventObject) => {
        console.log(zoomableViewEventObject);
        setZoomMap(zoomableViewEventObject?.zoomLevel);
    }

    return(
        <View style={styles.cardContainer}>
            {challenge === null
                ? <ActivityIndicator size="large" color="#0000ff" />
                : <>
                    {console.log(challenge)}
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
                    
                    <View style={styles.zoomContainer}>
                        <ReactNativeZoomableView
                            zoomEnabled={true}
                            maxZoom={1.5}
                            minZoom={0.95}
                            zoomStep={0.25}
                            initialZoom={1}
                            bindToBorders={true}
                            style={styles.zoomableView}
                            onZoomEnd={ResizeMapDots}
                        >
                            <Svg 
                                style={styles.map}
                                viewBox="0 0 100 100"
                            >
                                <View style={styles.mapBackgroundContainer}>
                                    <SvgImage 
                                        href="https://i.etsystatic.com/8226264/r/il/f96ec9/1661412249/il_570xN.1661412249_jebg.jpg"
                                        width='100%'
                                        height='100%'
                                        preserveAspectRatio="xMidYMid"
                                    />
                                </View>
                                {challenge.segments?.map((segment, index) => {

                                    let coordinatesValue = segment.start_crossing_point?.position_x * 100 + "," + segment.start_crossing_point?.position_y * 100 + " ";
                                    

                                    segment.coordinates?.map(coord => {
                                        coordinatesValue += coord.position_x * 100 + "," + coord.position_y * 100 + " "
                                    });

                                    coordinatesValue += segment.end_crossing_point?.position_x * 100 + "," + segment.end_crossing_point?.position_y * 100;

                                    console.log(index + ": " + coordinatesValue);

                                    return(
                                        <>
                                            <Polyline
                                                points={coordinatesValue}
                                                fill="none"
                                                stroke="black"
                                                strokeWidth="3"
                                                key={"poly" + index}
                                                onPress={() => {alert("segment " + segment.id + " touché!")}}
                                            />
                                            <Circle 
                                                cx={segment.start_crossing_point?.position_x * 100} 
                                                cy={segment.start_crossing_point?.position_y * 100} 
                                                r={4 / zoomMap}
                                                stroke="black" 
                                                fill="red" 
                                                key={"start-cir" + index}
                                                onPress={() => {alert(zoomMap)}}
                                            />
                                            <Circle 
                                                cx={segment.end_crossing_point?.position_x * 100} 
                                                cy={segment.end_crossing_point?.position_y * 100} 
                                                r={4 / zoomMap}
                                                stroke="black" 
                                                fill="green" 
                                                key={"end-cir" + index}
                                                onPress={() => {alert(zoomMap)}}
                                            />
                                        </>
                                    );
                                })}
                            </Svg>
                        </ReactNativeZoomableView>
                    </View>
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
        flex: 3,
        overflow: 'hidden'
    },
    DescriptionContainer: {
        flex: 3,
        overflow: 'hidden',
        justifyContent: 'flex-end'
    },
    ScrollContainer: {
        height: '80%'
    },
    zoomContainer: {
        flex: 3,
        overflow: 'hidden',
        margin: 3
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
        marginTop: 10
    }
});