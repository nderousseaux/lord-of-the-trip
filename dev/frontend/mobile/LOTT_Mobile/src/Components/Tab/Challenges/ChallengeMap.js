import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import { useState } from 'react';
import Svg, { Circle, Image as SvgImage, Polyline } from 'react-native-svg';

export default function ChallengeMap(props) {

    const [ challenge ] = useState(props.challenge);
    const [ zoomMap, setZoomMap ] = useState(1);

    const ResizeMapDots = (event, gestureState, zoomableViewEventObject) => {
        console.log(zoomableViewEventObject);
        setZoomMap(zoomableViewEventObject?.zoomLevel);
    }

    return(
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

                        return(
                            <>
                                <Polyline
                                    points={coordinatesValue}
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="3"
                                    key={"poly-" + index + "-" + segment.id}
                                    onPress={() => {alert("segment " + segment.id + " touché!")}}
                                />
                                <Circle 
                                    cx={segment.start_crossing_point?.position_x * 100} 
                                    cy={segment.start_crossing_point?.position_y * 100} 
                                    r={4 / zoomMap}
                                    stroke="black" 
                                    fill="blue" 
                                    key={"start-cir-" + index + "-" + segment.start_crossing_point.id}
                                    onPress={() => {alert(zoomMap)}}
                                />
                                <Circle 
                                    cx={segment.end_crossing_point?.position_x * 100} 
                                    cy={segment.end_crossing_point?.position_y * 100} 
                                    r={4 / zoomMap}
                                    stroke="black" 
                                    fill="blue" 
                                    key={"end-cir-" + index + "-" + segment.end_crossing_point.id}
                                    onPress={() => {alert(zoomMap)}}
                                />
                            </>
                        );
                    })}
                    <Circle 
                        cx={challenge.start_crossing_point?.position_x * 100} 
                        cy={challenge.start_crossing_point?.position_y * 100} 
                        r={4 / zoomMap}
                        stroke="black" 
                        fill="green" 
                        key={"start-chall-cir"}
                        onPress={() => {alert(zoomMap)}}
                    />
                    <Circle 
                        cx={challenge.end_crossing_point?.position_x * 100} 
                        cy={challenge.end_crossing_point?.position_y * 100} 
                        r={4 / zoomMap}
                        stroke="black" 
                        fill="red" 
                        key={"start-chall-cir"}
                        onPress={() => {alert(zoomMap)}}
                    />
                </Svg>
            </ReactNativeZoomableView>
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