import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import { useState } from 'react';
import Svg, { Circle, Defs, Image as SvgImage, Marker, Path, Polyline } from 'react-native-svg';

export default function ChallengeMap(props) {

    const [ challenge ] = useState(props.challenge);
    const [ zoomMap, setZoomMap ] = useState(1);

    const ResizeMapElements = (event, gestureState, zoomableViewEventObject) => {
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
                onZoomEnd={ResizeMapElements}
            >
                <Svg 
                    style={styles.map}
                    viewBox="0 0 100 100"
                >
                    <Defs>
                        {/* Flèche */}
                        <Marker
                        id="m1"
                        viewBox="0 0 10 10"
                        refX="1"
                        refY="3"
                        markerUnits="strokeWidth"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                        >
                            <Path 
                            d="M 0 0 L 3 3 L 0 6 L 0 5 L 2 3 L 0 1 L 0 0" 
                            fill="context-stroke" 
                            />
                        </Marker>

                        {/* Cercle */}
                        <Marker
                        id="m2"
                        viewBox="0 0 10 10"
                        refX=""
                        refY=""
                        markerUnits="strokeWidth"
                        markerWidth="8"
                        markerHeight="8"
                        orient="auto"
                        >
                            <Circle  
                            r="1" 
                            fill="context-stroke" 
                            />
                        </Marker>
                    </Defs>

                    <View style={styles.mapBackgroundContainer}>
                        <SvgImage 
                            href="https://i.etsystatic.com/8226264/r/il/f96ec9/1661412249/il_570xN.1661412249_jebg.jpg"
                            width='100%'
                            height='100%'
                            preserveAspectRatio="xMidYMid"
                        />
                    </View>
                    
                    {challenge.segments?.map((segment, index) => {

                        let assembledPolyline = [];
                        let startingPointObject = segment.start_crossing_point;

                        // Génération des coordonnées de chaque ligne composant un segment
                        segment.coordinates?.map(coord => {
                            let startingPoint = startingPointObject.position_x * 100 + "," + startingPointObject.position_y * 100 + " ";
                            let endPoint = coord.position_x * 100 + "," + coord.position_y * 100 + " ";
                            let middlePoint = (startingPointObject.position_x * 100 + coord.position_x * 100) / 2 + "," + (startingPointObject.position_y * 100 + coord.position_y * 100) / 2 + " ";
                        
                            assembledPolyline.push(startingPoint + middlePoint + endPoint);

                            startingPointObject = coord;
                        });

                        // Génération de la ligne entre la fin du segment et le dernier point intermédiaire ou le début (si pas  de point intermédiaire)
                        let startingPoint = startingPointObject.position_x * 100 + "," + startingPointObject.position_y * 100 + " ";
                        let endPoint = segment.end_crossing_point?.position_x * 100 + "," + segment.end_crossing_point?.position_y * 100 + " ";
                        let middlePoint = (startingPointObject.position_x * 100 + segment.end_crossing_point?.position_x * 100) / 2 + "," + (startingPointObject.position_y * 100 + segment.end_crossing_point?.position_y * 100) / 2 + " ";

                        assembledPolyline.push(startingPoint + middlePoint + endPoint);

                        return(
                            <View key={"containSegment" + index}>
                                {assembledPolyline.map((element, index2) => {
                                    return (<Polyline
                                        points={element}
                                        fill="none"
                                        stroke="black"
                                        strokeWidth={3 / zoomMap}
                                        key={"containSeg" + index + "trait" + index2}
                                        markerMid="url(#m1)"
                                        markerEnd="url(#m2)"
                                    />)
                                })}
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
                            </View>
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
                        key={"end-chall-cir"}
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