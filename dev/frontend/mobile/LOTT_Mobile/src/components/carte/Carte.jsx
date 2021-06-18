import * as React from 'react';
import { View, ScrollView, StyleSheet, Image, ImageBackground, Modal, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import { useState, useEffect } from 'react';
import MapService from 'services/map/Map.service.js';
import Svg, { Circle, Defs, Image as SvgImage, Marker, Path, Polygon, Polyline } from 'react-native-svg';
import { Icon, Button } from 'react-native-elements';
import { showAlert, closeAlert } from "react-native-customisable-alert";
import ElementModal from './elementModal/ElementModal.jsx';
import { Dimensions } from 'react-native';

import colors from 'colors/Colors.style.js';
import styles from './Carte.style.js';

function CarteContent(props) {

    const distanceFormat = (distance) =>{

        let distanceFormat, unitee;
    
        if (Math.round(distance).toString().length > 3 ){
            distanceFormat = +(Math.round((distance / 1000) + "e+3")  + "e-3")
            unitee = 'km'
          }
          else {
            distanceFormat = +(Math.round(distance + "e+2")  + "e-2")
            unitee = 'm'
          }
    
        return {distance: distanceFormat, unitee}
    }

    // Distance entre 2 points en pixels
    const pixelsLengthBetweenTwoPoints = (startPoint, endPoint) => {

        let dx = endPoint.position_x - startPoint.position_x;
        let dy = endPoint.position_y - startPoint.position_y;

        return Math.sqrt((dx * dx) + (dy * dy));
    }

    // Longueurs du segment en pixels
    const pixelsLengthSegment = (segment) => {

        let returnObject = { lines: [] };
        let startPointCoordinates = { position_x: segment.start_crossing_point.position_x, position_y: segment.start_crossing_point.position_y };
        let endPointCoordinates = { position_x: segment.end_crossing_point.position_x, position_y: segment.end_crossing_point.position_y };

        if (startPointCoordinates === null || endPointCoordinates === null)
            return null;

        let points = [startPointCoordinates, ...segment.coordinates, endPointCoordinates];
        let totalLength = 0;

        for (let i = 0; i < points.length - 1; i++) {

            let startPoint = points[i];
            let endPoint = points[i + 1];
            let lineLength = pixelsLengthBetweenTwoPoints(startPoint, endPoint);

            returnObject = { ...returnObject, lines: [...returnObject.lines, { startPoint: startPoint, endPoint: endPoint, length: lineLength }] };

            totalLength += lineLength;
        }

        returnObject = { ...returnObject, totalLength: totalLength };

        return returnObject;
    };

    const getObjectPosition = (segmentId, percentage) => {

        let segment = props.Challenge.segments?.find(segment => segment.id === segmentId);

        if (segment === null || segment === undefined)
            return null;

        let segmentLenghts = pixelsLengthSegment(segment);

        if (segmentLenghts === null || segment === undefined)
            return null;

        // Distance de l'obstacle sur le segment
        let lengthObstaclePosition = segmentLenghts.totalLength * percentage;

        // Obtention du morceau de segment sur lequel se trouve l'obstacle
        let lineWithObstacle;
        for (let i = 0; i < segmentLenghts.lines.length; i++) {

            let line = segmentLenghts.lines[i];

            // Distance jusqu'à l'obstacle positive, l'obstacle se trouve sur une prochaine ligne, soustraction de la distance de la ligne a la distance de l'obstacle
            if (lengthObstaclePosition - line.length >= 0) {
                lengthObstaclePosition -= line.length;
            }
            else {
                lineWithObstacle = line;
                break;
            }
        }

        // Pourcentage de l'obstacle sur le morceau de segment
        let percentageOnLine = lengthObstaclePosition / lineWithObstacle.length;
        let obstaclePositionX = lineWithObstacle.startPoint.position_x + ((lineWithObstacle.endPoint.position_x - lineWithObstacle.startPoint.position_x) * percentageOnLine);
        let obstaclePositionY = lineWithObstacle.startPoint.position_y + ((lineWithObstacle.endPoint.position_y - lineWithObstacle.startPoint.position_y) * percentageOnLine);

        return { position_x: obstaclePositionX, position_y: obstaclePositionY, lineWithObstacle };
    }

    let userMarker = props.UserProgress
        ? props.UserProgress.segment !== 0
            ? {
                segment: props.UserProgress.segment,
                position: getObjectPosition(props.UserProgress.segment, props.UserProgress.progress)
            }
            : {
                segment: 0
            }
        : {
            segment: 0
        }
        ;

    const CalculateElementRotation = (starting_point_x, starting_point_y, ending_point_x, ending_point_y) => {

        let x = ending_point_x - starting_point_x;
        let y = starting_point_y - ending_point_y;

        return Math.atan2(y, x) * 180 / Math.PI;
    }

    const GenerateLineComposingSegment = (coord, startingPointObject, needsDirectionMarker, assembledPolyline, progressToNextMarker, segment, segmentIndex) => {

        let startingPoint = startingPointObject.position_x * props.CanvasSize.x + "," + startingPointObject.position_y * props.CanvasSize.y + " ";
        let endPoint = coord.position_x * props.CanvasSize.x + "," + coord.position_y * props.CanvasSize.y + " ";
        let middlePoint = (startingPointObject.position_x * props.CanvasSize.x + coord.position_x * props.CanvasSize.x) / 2 + "," + (startingPointObject.position_y * props.CanvasSize.y + coord.position_y * props.CanvasSize.y) / 2 + " ";

        // Calcul de la distance d'avancée
        let progress = Math.sqrt(Math.pow(coord.position_x - startingPointObject.position_x, 2) + Math.pow(coord.position_y - startingPointObject.position_y, 2));

        progressToNextMarker += progress;

        // Déterminaison de si un marqueur de direction est nécessaire
        if (progressToNextMarker >= props.SpacingDirectionMarkers) {
            progressToNextMarker = 0;
            needsDirectionMarker = true;
        }

        assembledPolyline.push({
            coords: startingPoint + middlePoint + endPoint,
            marker: needsDirectionMarker,
            color: DefineSegmentColor(segment.id),
            obstaclesNbr: segment.obstacles.length,
            segmentIndex: segmentIndex,
            segmentName: segment.name,
            segmentLength: distanceFormat(segment.length)
        });

        let returnValue = {
            assembledPolyline: assembledPolyline,
            progressToNextMarker: progressToNextMarker,
        };

        return returnValue;
    }

    const DefineSegmentColor = (segmentId) => {

        let color = "black"

        if (props.FocusedSegments) {
            color = props.FocusedSegments.some(focusId => focusId === segmentId)
                ? colors.focusedSegment
                : "black"
        }
        if (props.PathSegments && color === "black") {
            color = props.PathSegments.some(focusId => focusId === segmentId)
                ? colors.pathDoneSegment
                : "black"
        }
        // if (props.UserProgress && color === "black") {
        //     color = segmentId === props.UserProgress.segment
        //         ? colors.pathDoneSegment
        //         : "black"
        // }

        return color;
    }

    return (
        <ImageBackground
            style={styles.image}
            source={{ uri: `data:image/png;base64,${props.MapBackground}` }}
            resizeMode='contain'
        >
            <Svg
                style={styles.map}
                viewBox={"0 0 " + props.CanvasSize.x + " " + props.CanvasSize.y}
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

                    {/* Curseur du user */}
                    <Marker
                        id="m3"
                        viewBox="0 0 20 20"
                        refX="0"
                        refY="0"
                        markerUnits="strokeWidth"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto"
                    >
                        <Path
                            d="M 7 1 L -8 5 C -9 5 -9 4 -8 2 L -7 0 L -8 -2 C -9 -4 -9 -5 -8 -5 L 7 -1 C 10 0 10 0 7 1"
                            fill="white"
                            stroke="black"
                            strokeWidth="2"
                        />
                    </Marker>
                </Defs>

                {props.Challenge.segments?.map((segment, i) => {

                    let assembledPolyline = [];
                    let startingPointObject = segment.start_crossing_point;
                    let needsDirectionMarker = false;
                    let progressToNextMarker = 0;

                    // Génération des coordonnées de chaque ligne composant un segment
                    segment.coordinates?.map(coord => {

                        let calculatedData = GenerateLineComposingSegment(coord, startingPointObject, needsDirectionMarker, assembledPolyline, progressToNextMarker, segment, i);

                        assembledPolyline = calculatedData.assembledPolyline;
                        progressToNextMarker = calculatedData.progressToNextMarker;

                        // Réinitialisation / incrémentation des valeurs
                        startingPointObject = coord;
                    });

                    // Génération de la ligne entre la fin du segment et le dernier point intermédiaire ou le début (si pas  de point intermédiaire)
                    let calculatedData = GenerateLineComposingSegment(segment.end_crossing_point, startingPointObject, needsDirectionMarker, assembledPolyline, progressToNextMarker, segment, i);

                    assembledPolyline = calculatedData.assembledPolyline;
                    progressToNextMarker = calculatedData.progressToNextMarker;

                    // Calcul des obstacles ainsi que leur position
                    let obstaclesOnMap = [];
                    segment.obstacles?.forEach((obstacle) => {

                        let progress = obstacle.progress > 1 ? obstacle.progress / 100 : obstacle.progress; // NB : Met entre 0 et 1 si c'est entre 0 et 100 (provisoire, il faut que en DB ce soit entre 0 et 1)
                        let position = getObjectPosition(obstacle.segment.id, progress);

                        if (position !== null) {
                            obstaclesOnMap.push({
                                id: obstacle.id,
                                position_x: position.position_x,
                                position_y: position.position_y,
                                label: obstacle.label,
                                progress: progress,
                                description: obstacle.description,
                                question_type: obstacle.question_type,
                                nb_points: obstacle.nb_points,
                                result: obstacle.result,
                                segmentId: obstacle.segment.id
                            });
                        }
                    });

                    return (
                        <View key={"containSegment" + i}>
                            {assembledPolyline.map((element, j) => {
                                return props.Zoomed
                                    ? <Polyline
                                        points={element.coords}
                                        fill="none"
                                        stroke={element.color}
                                        strokeWidth={15 * (1000 / props.MapElementsSize)}
                                        key={"containSeg" + i + "trait" + j}
                                        markerMid={element.marker ? "url(#m1)" : ""}
                                        markerEnd="url(#m2)"
                                        onPress={() => {
                                            showAlert({
                                                alertType: 'custom',
                                                title: 'test',
                                                customAlert: 
                                                    <ElementModal 
                                                        Title={element.segmentName 
                                                            ? element.segmentName 
                                                            : "Segment numéro " + (element.segmentIndex + 1)}
                                                        ObstaclesNumber={element.obstaclesNbr}
                                                        Length={`${element.segmentLength.distance} ${element.segmentLength.unitee}`}
                                                    />
                                            });
                                        }}
                                    />
                                    : <Polyline
                                        points={element.coords}
                                        fill="none"
                                        stroke={element.color}
                                        strokeWidth={15 * (1000 / props.MapElementsSize)}
                                        key={"containSeg" + i + "trait" + j}
                                        markerMid={element.marker ? "url(#m1)" : ""}
                                        markerEnd="url(#m2)"
                                    />
                            })}
                            {obstaclesOnMap?.map((obstacle, j) => {

                                return <Path
                                    key={"obstacle" + j}
                                    x={obstacle.position_x * props.CanvasSize.x} //TODO: remettre
                                    y={obstacle.position_y * props.CanvasSize.y}
                                    fill={colors.mapObstacle}
                                    stroke="black"
                                    strokeWidth={1.9 * (1000 / props.MapElementsSize)}
                                    d="M -13 -3 L -3 -3 L 0 -12 L 3 -3 L 13 -3 L 5 2 L 8 11 L 0 5 L -8 11 L -5 2 Z"
                                    scale={2.2 * (1000 / props.MapElementsSize)}
                                />
                            })}
                            {props.Zoomed
                                ? <Circle
                                    cx={segment.start_crossing_point?.position_x * props.CanvasSize.x}
                                    cy={segment.start_crossing_point?.position_y * props.CanvasSize.y}
                                    r={20 * (1000 / props.MapElementsSize)}
                                    stroke="black"
                                    strokeWidth={6 * (1000 / props.MapElementsSize)}
                                    fill={colors.mapStepPoint}
                                    key={"start-cir-" + i + "-" + segment.start_crossing_point?.id}
                                    onPress={() => {
                                        showAlert({
                                            alertType: 'custom',
                                            title: 'test',
                                            customAlert: (
                                                <ElementModal 
                                                    Title={segment.start_crossing_point?.name 
                                                        ? segment.start_crossing_point?.name 
                                                        : "Point de passage du segment  " + (props.Challenge.segments.map(e => e.id).indexOf(segment.id))}
                                                />
                                            )
                                        });
                                    }}
                                />
                                : <Circle
                                    cx={segment.start_crossing_point?.position_x * props.CanvasSize.x}
                                    cy={segment.start_crossing_point?.position_y * props.CanvasSize.y}
                                    r={20 * (1000 / props.MapElementsSize)}
                                    stroke="black"
                                    strokeWidth={6 * (1000 / props.MapElementsSize)}
                                    fill={colors.mapStepPoint}
                                    key={"start-cir-" + i + "-" + segment.start_crossing_point?.id}
                                />}
                            {props.Zoomed
                                ? <Circle
                                    cx={segment.end_crossing_point?.position_x * props.CanvasSize.x}
                                    cy={segment.end_crossing_point?.position_y * props.CanvasSize.y}
                                    r={(20 * (1000 / props.MapElementsSize))}
                                    stroke="black"
                                    strokeWidth={6 * (1000 / props.MapElementsSize)}
                                    fill={colors.mapStepPoint}
                                    key={"end-cir-" + i + "-" + segment.end_crossing_point?.id}
                                    onPress={() => {
                                        showAlert({
                                            alertType: 'custom',
                                            title: 'test',
                                            customAlert: (
                                                <ElementModal 
                                                    Title={segment.end_crossing_point?.name 
                                                        ? segment.end_crossing_point?.name 
                                                        : "Point de passage du segment  " + (props.Challenge.segments.map(e => e.id).indexOf(segment.id) + 1)}
                                                />
                                            )
                                        });
                                    }}
                                />
                                : <Circle
                                    cx={segment.end_crossing_point?.position_x * props.CanvasSize.x}
                                    cy={segment.end_crossing_point?.position_y * props.CanvasSize.y}
                                    r={(20 * (1000 / props.MapElementsSize))}
                                    stroke="black"
                                    strokeWidth={6 * (1000 / props.MapElementsSize)}
                                    fill={colors.mapStepPoint}
                                    key={"end-cir-" + i + "-" + segment.end_crossing_point?.id}
                                />}
                        </View>
                    );
                })}
                
                {props.Zoomed
                    ? <>
                        <Circle
                            cx={props.Challenge.start_crossing_point?.position_x * props.CanvasSize.x}
                            cy={props.Challenge.start_crossing_point?.position_y * props.CanvasSize.y}
                            r={20 * (1000 / props.MapElementsSize)}
                            stroke="black"
                            strokeWidth={6 * (1000 / props.MapElementsSize)}
                            fill={colors.mapBeginningPoint}
                            key={"start-chall-cir"}
                            onPress={() => {
                                showAlert({
                                    alertType: 'custom',
                                    title: 'test',
                                    customAlert: (
                                        <ElementModal 
                                            Title={props.Challenge.start_crossing_point?.name 
                                                    ? props.Challenge.start_crossing_point?.name
                                                    : "Début du parcours"}
                                        />
                                    )
                                });
                            }}
                        />
                        <Circle
                            cx={props.Challenge.end_crossing_point?.position_x * props.CanvasSize.x}
                            cy={props.Challenge.end_crossing_point?.position_y * props.CanvasSize.y}
                            r={20 * (1000 / props.MapElementsSize)}
                            stroke="black"
                            strokeWidth={6 * (1000 / props.MapElementsSize)}
                            fill={colors.mapEndingPoint}
                            key={"end-chall-cir"}
                            onPress={() => {
                                showAlert({
                                    alertType: 'custom',
                                    title: 'test',
                                    customAlert: (
                                        <ElementModal 
                                            Title={props.Challenge.end_crossing_point?.name 
                                                    ? props.Challenge.end_crossing_point?.name
                                                    : "Fin du parcours"}
                                        />
                                    )
                                });
                            }}
                        />
                    </>
                    : <>
                        <Circle
                            cx={props.Challenge.start_crossing_point?.position_x * props.CanvasSize.x}
                            cy={props.Challenge.start_crossing_point?.position_y * props.CanvasSize.y}
                            r={20 * (1000 / props.MapElementsSize)}
                            stroke="black"
                            strokeWidth={6 * (1000 / props.MapElementsSize)}
                            fill={colors.mapBeginningPoint}
                            key={"start-chall-cir"}
                        />
                        <Circle
                            cx={props.Challenge.end_crossing_point?.position_x * props.CanvasSize.x}
                            cy={props.Challenge.end_crossing_point?.position_y * props.CanvasSize.y}
                            r={20 * (1000 / props.MapElementsSize)}
                            stroke="black"
                            strokeWidth={6 * (1000 / props.MapElementsSize)}
                            fill={colors.mapEndingPoint}
                            key={"end-chall-cir"}
                        />
                    </>}
                    <Path
                        key={"userCursor"}
                        x={userMarker.segment !== 0
                            ? userMarker.position.position_x * props.CanvasSize.x
                            : props.Challenge.start_crossing_point?.position_x * props.CanvasSize.x}
                        y={userMarker.segment !== 0
                            ? userMarker.position.position_y * props.CanvasSize.y
                            : props.Challenge.start_crossing_point?.position_y * props.CanvasSize.y}
                        fill={"white"}
                        stroke="black"
                        strokeWidth={1.9 * (1000 / props.MapElementsSize)}
                        d="M 7 1 L -8 5 C -9 5 -9 4 -8 2 L -7 0 L -8 -2 C -9 -4 -9 -5 -8 -5 L 7 -1 C 10 0 10 0 7 1"
                        scale={3 * (1000 / props.MapElementsSize)}
                        rotation={userMarker.segment !== 0
                            ? -CalculateElementRotation(userMarker.position.lineWithObstacle.startPoint.position_x,
                                userMarker.position.lineWithObstacle.startPoint.position_y,
                                userMarker.position.lineWithObstacle.endPoint.position_x,
                                userMarker.position.lineWithObstacle.endPoint.position_y)
                            : 0}
                    />
            </Svg>
        </ImageBackground>
    );
}

export function Carte(props) {

    const [challenge] = useState(props.Challenge);
    const [basicMapElementSize] = useState(850);
    const [mapElementsSize, setMapElementsSize] = useState(basicMapElementSize);
    const [spacingDirectionMarkers] = useState(0.12);

    const ResizeMapElements = (event, gestureState, zoomableViewEventObject) => {
        setMapElementsSize(basicMapElementSize * zoomableViewEventObject?.zoomLevel);
    }

    return (
        <View
            style={{
                height: props.CanvasSize.y / props.CanvasSize.x * 350,
            }}
        >
            {props.Zoomed
                ? <View 
                    style={styles.zoomedMap}
                    style={
                        props.CanvasSize.x > props.CanvasSize.y 
                            ? {
                                transform: [{ rotate: '90deg'}],
                                width:Dimensions.get('window').height - 150, 
                                height:Dimensions.get('window').width - 30,
                            }
                            : {
                                width:Dimensions.get('window').width - 30, 
                                height:Dimensions.get('window').height - 150,
                            }
                    }
                >
                    <CarteContent
                        {...props}
                        SpacingDirectionMarkers={spacingDirectionMarkers}
                        MapElementsSize={mapElementsSize}
                        Challenge={challenge}
                    />
                </View>
                /*<ReactNativeZoomableView
                    zoomEnabled={true}
                    maxZoom={1.5}
                    minZoom={0.95}
                    zoomStep={0.25}
                    initialZoom={1}
                    bindToBorders={true}
                    style={{
                        height: props.CanvasSize.y / props.CanvasSize.x * 350,
                        width: props.CanvasSize.x / props.CanvasSize.y * 350,
                    }}
                    onZoomEnd={ResizeMapElements}
                    captureEvent={true}
                ></ReactNativeZoomableView>*/
                : <CarteContent
                    {...props}
                    SpacingDirectionMarkers={spacingDirectionMarkers}
                    MapElementsSize={mapElementsSize}
                    Challenge={challenge}
                />
                }
        </View>
    )
}

export default function CarteContainer(props) {

    const [openContainerModal, setOpenContainerModal] = useState(false);
    const [mapBackground, setMapBackground] = useState('');
    const [canvasSize, setCanvasSize] = useState({ x: 1000, y: 1000 });

    useEffect(() => {

        let mounted = true;

        MapService.getMapBackgroundImage(props.Challenge.id)
            .then((response) => {

                    if (mounted) {
                    Image.getSize(`data:image/png;base64,${response.data}`, (width, height) => {
                        setCanvasSize({ x: width, y: height });
                    });

                    setMapBackground(response.data);
                }
            })
            .catch((error) => {
                console.log({ error });
            });

        return function cleanup() {
            mounted = false;
        }
    }, []);

    return (
        mapBackground === ''
            ? <ActivityIndicator size="large" color="#0000ff" />
            : <>
                <Modal
                    visible={openContainerModal}
                    onRequestClose={() => setOpenContainerModal(false)}
                    animationType="fade"
                    transparent={true}
                >
                    <View style={styles.containerModalContent}>
                        <Button
                            containerStyle={styles.modalCloseButton}
                            type="clear"
                            icon={
                                <Icon
                                    name="cancel"
                                    size={60}
                                    color="white"
                                />
                            }
                            onPress={() => setOpenContainerModal(false)}
                        />
                        <View
                            style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Carte
                                {...props}
                                Zoomed={true}
                                MapBackground={mapBackground}
                                CanvasSize={canvasSize}
                            />
                        </View>
                    </View>
                </Modal>
                <View
                    pointerEvents={openContainerModal ? "none" : "auto"}
                >
                    <TouchableOpacity
                        style={styles.staticMap}
                        onPress={() => {
                            setOpenContainerModal(true);
                        }}
                    >
                        <Carte
                            {...props}
                            Zoomed={false}
                            MapBackground={mapBackground}
                            CanvasSize={canvasSize}
                        />
                    </TouchableOpacity>
                </View>
            </>
    );
}
