import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import { useState } from 'react';
import Svg, { Circle, Defs, Image as SvgImage, Marker, Path, Polyline } from 'react-native-svg';

export default function ChallengeMap(props) {

    const [ challenge ] = useState(props.challenge);
    const [ canvasSize, setCanvasSize ] = useState(10000);
    const [ basicMapElementSize ] = useState(1000);
    const [ mapElementsSize, setMapElementsSize ] = useState(basicMapElementSize);
    const [ spacingDirectionMarkers ] = useState(0.1);

    const ResizeMapElements = (event, gestureState, zoomableViewEventObject) => {
        setMapElementsSize(basicMapElementSize * zoomableViewEventObject?.zoomLevel);
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
                    viewBox={"0 0 " + canvasSize + " " + canvasSize}
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
                        markerWidth="6"
                        markerHeight="6"
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
                        let needsDirectionMarker = false;
                        let progressToNextMarker = 0;

                        // Génération des coordonnées de chaque ligne composant un segment
                        segment.coordinates?.map(coord => {
                            let startingPoint = startingPointObject.position_x * canvasSize + "," + startingPointObject.position_y * canvasSize + " ";
                            let endPoint = coord.position_x * canvasSize + "," + coord.position_y * canvasSize + " ";
                            let middlePoint = (startingPointObject.position_x * canvasSize + coord.position_x * canvasSize) / 2 + "," + (startingPointObject.position_y * canvasSize + coord.position_y * canvasSize) / 2 + " ";
                            
                            // Calcul de la distance d'avancée
                            progressToNextMarker += Math.sqrt(Math.pow(coord.position_x - startingPointObject.position_x, 2) + Math.pow(coord.position_y - startingPointObject.position_y, 2));

                            // Déterminaison de si un marqueur de direction est nécessaire
                            if (progressToNextMarker >= spacingDirectionMarkers) {
                                progressToNextMarker = 0;
                                needsDirectionMarker = true;
                            }

                            assembledPolyline.push({coords: startingPoint + middlePoint + endPoint, marker: needsDirectionMarker});

                            // Réinitialisation / incrémentation des valeurs
                            needsDirectionMarker = false;
                            startingPointObject = coord;
                        });

                        // Génération de la ligne entre la fin du segment et le dernier point intermédiaire ou le début (si pas  de point intermédiaire)
                        let startingPoint = startingPointObject.position_x * canvasSize + "," + startingPointObject.position_y * canvasSize + " ";
                        let endPoint = segment.end_crossing_point?.position_x * canvasSize + "," + segment.end_crossing_point?.position_y * canvasSize + " ";
                        let middlePoint = (startingPointObject.position_x * canvasSize + segment.end_crossing_point?.position_x * canvasSize) / 2 + "," + (startingPointObject.position_y * canvasSize + segment.end_crossing_point?.position_y * canvasSize) / 2 + " ";

                        // Calcul de la distance d'avancée
                        progressToNextMarker += Math.sqrt(Math.pow(segment.end_crossing_point.position_x - startingPointObject.position_x, 2) + Math.pow(segment.end_crossing_point.position_y - startingPointObject.position_y, 2));

                        // Déterminaison de si un marqueur de direction est nécessaire
                        if (progressToNextMarker >= spacingDirectionMarkers) {
                            progressToNextMarker = 0;
                            needsDirectionMarker = true;
                        }

                        assembledPolyline.push({coords: startingPoint + middlePoint + endPoint, marker: needsDirectionMarker});

                        return(
                            <View key={"containSegment" + index}>
                                {assembledPolyline.map((element, index2) => {
                                    return (<Polyline
                                        points={element.coords}
                                        fill="none"
                                        stroke="#505050"
                                        strokeWidth={30 * (canvasSize / mapElementsSize)}
                                        key={"containSeg" + index + "trait" + index2}
                                        markerMid={element.marker ? "url(#m1)" : ""}
                                        markerEnd="url(#m2)"
                                    />)
                                })}
                                <Circle 
                                    cx={segment.start_crossing_point?.position_x * canvasSize} 
                                    cy={segment.start_crossing_point?.position_y * canvasSize} 
                                    r={40 * (canvasSize / mapElementsSize)}
                                    stroke="black" 
                                    strokeWidth={13 * (canvasSize / mapElementsSize)}
                                    fill="blue" 
                                    key={"start-cir-" + index + "-" + segment.start_crossing_point.id}
                                />
                                <Circle 
                                    cx={segment.end_crossing_point?.position_x * canvasSize} 
                                    cy={segment.end_crossing_point?.position_y * canvasSize} 
                                    r={(40 * (canvasSize / mapElementsSize))}
                                    stroke="black" 
                                    strokeWidth={13 * (canvasSize / mapElementsSize)}
                                    fill="blue" 
                                    key={"end-cir-" + index + "-" + segment.end_crossing_point.id}
                                />
                            </View>
                        );
                    })}
                    <Circle 
                        cx={challenge.start_crossing_point?.position_x * canvasSize} 
                        cy={challenge.start_crossing_point?.position_y * canvasSize} 
                        r={40 * (canvasSize / mapElementsSize)}
                        stroke="black" 
                        strokeWidth={13 * (canvasSize / mapElementsSize)}
                        fill="green" 
                        key={"start-chall-cir"}
                    />
                    <Circle 
                        cx={challenge.end_crossing_point?.position_x * canvasSize} 
                        cy={challenge.end_crossing_point?.position_y * canvasSize} 
                        r={40 * (canvasSize / mapElementsSize)}
                        stroke="black" 
                        strokeWidth={13 * (canvasSize / mapElementsSize)}
                        fill="red" 
                        key={"end-chall-cir"}
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