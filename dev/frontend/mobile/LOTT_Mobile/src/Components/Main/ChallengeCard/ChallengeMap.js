import * as React from 'react';
import { View, StyleSheet, Image, Modal, Text, ActivityIndicator } from 'react-native';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import { useState, useEffect } from 'react';
import Svg, { Circle, Defs, Image as SvgImage, Marker, Path, Polygon, Polyline } from 'react-native-svg';
import api from '../../../api/api.js';
import ChallengeElementModal from '../ChallengeElementModal';

export default function ChallengeMap(props) {

    const [ challenge ] = useState(props.challenge);
    const [ canvasSize, setCanvasSize ] = useState({ x: 1000, y: 1000 });
    const [ basicMapElementSize ] = useState(1000);
    const [ mapElementsSize, setMapElementsSize ] = useState(basicMapElementSize);
    const [ spacingDirectionMarkers ] = useState(0.15);
    const [ mapBackground, setMapBackground ] = useState('');
    const [ openModal, setOpenModal ] = useState(false);
    const [ modalObstacle, setModalObstacle ] = useState(props.challenge.segments?.obstacles?[0]:null);

    useEffect(() => {
        api.getChallengeMap(challenge["id"])
        .then((response) => {

            Image.getSize(`data:image/png;base64,${response.data}`, (width, height) => {
                setCanvasSize({ x: width, y: height});
            });

            setMapBackground(response.data);
        })
        .catch((error) => console.error(error))
    }, []);

    const ResizeMapElements = (event, gestureState, zoomableViewEventObject) => {
        setMapElementsSize(basicMapElementSize * zoomableViewEventObject?.zoomLevel);
    }

    return(
        mapBackground === ''
            ? <ActivityIndicator size="large" color="#0000ff" />
            : <View style={styles.zoomContainer}>
                    <Modal
                        visible={openModal}
                        onRequestClose={() => setOpenModal(false)}
                        animationType="fade"
                        transparent={true}
                    >
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 4, flexDirection: 'row'}}>
                            <View style={{flex: 1}}></View>
                            <View style={styles.mapElementModal}>
                               <ChallengeElementModal obstacle={modalObstacle}/> 
                            </View>
                            <View style={{flex: 1}}></View>
                        </View>
                        <View style={{flex: 1}}></View>
                    </Modal>
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
                            viewBox={"0 0 " + canvasSize.x + " " + canvasSize.y}
                        >
                            <Defs>
                                {/* Flèche indication sens chemin */}
                                <Marker
                                id="m1"
                                viewBox="0 0 10 10"
                                refX="2"
                                refY="3"
                                markerUnits="strokeWidth"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto"
                                >
                                    <Path 
                                    d="M 0 0 L 3 3 L 0 6 L 0 5 L 2 3 L 0 1 L 0 0" 
                                    fill="black" 
                                    />
                                </Marker>

                                {/* Cercle liaison segments */}
                                <Marker
                                id="m2"
                                viewBox="0 0 10 10"
                                refX=""
                                refY=""
                                markerUnits="strokeWidth"
                                markerWidth="5"
                                markerHeight="5"
                                orient="auto"
                                >
                                    <Circle  
                                    r="1" 
                                    fill="context-stroke"
                                    />
                                </Marker>
                            </Defs>

                            <View style={styles.mapBackgroundContainer}>
                                <Image 
                                    href={{uri: `data:image/gif;base64,${mapBackground}`}}
                                />
                            </View>
                            {challenge.segments?.map((segment, i) => {

                                let assembledPolyline = [];
                                let startingPointObject = segment.start_crossing_point;
                                let needsDirectionMarker = false;
                                let progressToNextMarker = 0;
                                let generalProgressOnSegment = 0;
                                let generalProgressOnSegmentPercentage = 0;
                                let segmentLength = 0;
                                let obstaclesOnSegment = [{}];
                                let obstaclesPosition = [];

                                segment.coordinates?.map(coord => {
                                    segmentLength += Math.sqrt(Math.pow(coord.position_x - startingPointObject.position_x, 2) + Math.pow(coord.position_y - startingPointObject.position_y, 2));
                                })

                                segment.obstacles?.map(obstacle => {
                                    obstaclesOnSegment.push({progress: obstacle.progress, id: obstacle.id});
                                });

                                // Génération des coordonnées de chaque ligne composant un segment
                                segment.coordinates?.map(coord => {
                                    let startingPoint = startingPointObject.position_x * canvasSize.x + "," + startingPointObject.position_y * canvasSize.y + " ";
                                    let endPoint = coord.position_x * canvasSize.x + "," + coord.position_y * canvasSize.y + " ";
                                    let middlePoint = (startingPointObject.position_x * canvasSize.x + coord.position_x * canvasSize.x) / 2 + "," + (startingPointObject.position_y * canvasSize.y + coord.position_y * canvasSize.y) / 2 + " ";
                                    
                                    // Calcul de la distance d'avancée  => TODO ne renvoie pas la même valeur qu-'à la ligne 125, trouver pourquoi
                                    let progressOnSegment = Math.sqrt(Math.pow(coord.position_x - startingPointObject.position_x, 2) + Math.pow(coord.position_y - startingPointObject.position_y, 2));
                                    progressToNextMarker += progressOnSegment;

                                    // Déterminaison de si l'on a dépassé les coordonnées d'un obstacle
                                    let passedObstacles = obstaclesOnSegment.filter(obstacle => obstacle.progress <= (generalProgressOnSegmentPercentage + (progressOnSegment / segmentLength)));

                                    // Calcul de la position de chaque obstacle passé
                                    if (passedObstacles.length > 0) {
                                        passedObstacles.map(obstacle => {
                                            // TODO
                                        });
                                    }

                                    // Déterminaison de si un marqueur de direction est nécessaire
                                    if (progressToNextMarker >= spacingDirectionMarkers) {
                                        progressToNextMarker = 0;
                                        needsDirectionMarker = true;
                                    }

                                    assembledPolyline.push({coords: startingPoint + middlePoint + endPoint, marker: needsDirectionMarker});

                                    // Réinitialisation / incrémentation des valeurs
                                    needsDirectionMarker = false;
                                    startingPointObject = coord;
                                    generalProgressOnSegment += progressOnSegment;
                                    generalProgressOnSegmentPercentage = generalProgressOnSegment / segmentLength;
                                });

                                // Génération de la ligne entre la fin du segment et le dernier point intermédiaire ou le début (si pas  de point intermédiaire)
                                let startingPoint = startingPointObject.position_x * canvasSize.x + "," + startingPointObject.position_y * canvasSize.y + " ";
                                let endPoint = segment.end_crossing_point?.position_x * canvasSize.x + "," + segment.end_crossing_point?.position_y * canvasSize.y + " ";
                                let middlePoint = (startingPointObject.position_x * canvasSize.x + segment.end_crossing_point?.position_x * canvasSize.x) / 2 + "," + (startingPointObject.position_y * canvasSize.y + segment.end_crossing_point?.position_y * canvasSize.y) / 2 + " ";

                                // Calcul de la distance d'avancée
                                progressToNextMarker += Math.sqrt(Math.pow(segment.end_crossing_point.position_x - startingPointObject.position_x, 2) + Math.pow(segment.end_crossing_point.position_y - startingPointObject.position_y, 2));

                                // Déterminaison de si un marqueur de direction est nécessaire
                                if (progressToNextMarker >= spacingDirectionMarkers) {
                                    progressToNextMarker = 0;
                                    needsDirectionMarker = true;
                                }

                                assembledPolyline.push({coords: startingPoint + middlePoint + endPoint, marker: needsDirectionMarker});

                                return(
                                    <View key={"containSegment" + i}>
                                        {assembledPolyline.map((element, j) => {
                                            return (<Polyline
                                                points={element.coords}
                                                fill="none"
                                                stroke="#505050"
                                                strokeWidth={30 * (1000 / mapElementsSize)}
                                                key={"containSeg" + i + "trait" + j}
                                                markerMid={element.marker ? "url(#m1)" : ""}
                                                markerEnd="url(#m2)"
                                            />)
                                        })}
                                        {segment.obstacles?.map((obstacle, j) => {
                                            return (
                                                <Path
                                                    key={obstacle.label}
                                                    cx={500}
                                                    cy={500}
                                                    fill="red" 
                                                    stroke="black" 
                                                    stroke-width="10" 
                                                    d="M 0 9 L 10 9 L 13 0 L 16 9 L 26 9 L 18 14 L 21 23 L 13 17 L 5 23 L 8 14 Z"
                                                    onPress={() => {
                                                        setModalObstacle(obstacle);
                                                        setOpenModal(true);
                                                    }}
                                                    scale={5}
                                                />)
                                        })}
                                        <Circle 
                                            cx={segment.start_crossing_point?.position_x * canvasSize.x} 
                                            cy={segment.start_crossing_point?.position_y * canvasSize.y} 
                                            r={40 * (1000 / mapElementsSize)}
                                            stroke="black" 
                                            strokeWidth={13 * (1000 / mapElementsSize)}
                                            fill="blue" 
                                            key={"start-cir-" + i + "-" + segment.start_crossing_point.id}
                                        />
                                        <Circle 
                                            cx={segment.end_crossing_point?.position_x * canvasSize.x} 
                                            cy={segment.end_crossing_point?.position_y * canvasSize.y} 
                                            r={(40 * (1000 / mapElementsSize))}
                                            stroke="black" 
                                            strokeWidth={13 * (1000 / mapElementsSize)}
                                            fill="blue" 
                                            key={"end-cir-" + i + "-" + segment.end_crossing_point.id}
                                        />
                                    </View>
                                );
                            })}
                            <Circle 
                                cx={challenge.start_crossing_point?.position_x * canvasSize.x} 
                                cy={challenge.start_crossing_point?.position_y * canvasSize.y} 
                                r={40 * (1000 / mapElementsSize)}
                                stroke="black" 
                                strokeWidth={13 * (1000 / mapElementsSize)}
                                fill="green" 
                                key={"start-chall-cir"}
                            />
                            <Circle 
                                cx={challenge.end_crossing_point?.position_x * canvasSize.x} 
                                cy={challenge.end_crossing_point?.position_y * canvasSize.y} 
                                r={40 * (1000 / mapElementsSize)}
                                stroke="black" 
                                strokeWidth={13 * (1000 / mapElementsSize)}
                                fill="red" 
                                key={"end-chall-cir"}
                            />
                        </Svg>
                    </ReactNativeZoomableView>
                </View>
    )
    }

const styles = StyleSheet.create({
    zoomContainer: {
        flex:3,
        overflow: 'hidden',
    },
    map: {
        
    },
    mapBackgroundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomableView: {
      backgroundColor: 'transparent',
    },
    mapElementModal: {
        
        //alignSelf: 'center',
        flex: 4,

        backgroundColor: 'white',
        borderRadius: 7,
        borderWidth: 2,
        borderColor: 'lightgrey',

        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

        elevation: 600,
    }
});