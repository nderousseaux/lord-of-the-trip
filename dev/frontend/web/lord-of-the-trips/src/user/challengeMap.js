import { useState, useEffect } from "react";
import { Stage, Layer, Image, Circle, Arrow, Star } from 'react-konva';
import { useQuery, useMutation } from 'react-query';
import apiChallenge from '../api/challenge';
import apiCrossingPoints from '../api/crossingPoints';
import apiSegments from '../api/segments';
import apiObstacles from '../api/obstacles';
import { percentToPixels, coordinatesEndSegment, pixelsLengthBetweenTwoPoints, realLengthBetweenTwoPoints } from "../utils/utils";
import ModalCrossingPoint from './modalCrossingPoint';
import ModalSegment from './modalSegment';
import ModalObstacle from './modalObstacle';
import * as css from '../CustomCSS';

const ChallengeMap = ({ challenge, isAdmin }) => {
  const [errorDownload, setErrorDownload] = useState(null);
  const [successDownload, setSuccessDownload] = useState(false);
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [crossingPoints, setCrossingPoints] = useState([]);
  // +1 when there is a change in the crossing points, to set again the start and the end of the challenge
  const [crossingPointsLoaded, setCrossingPointsLoaded] = useState(0);
  const [segments, setSegments] = useState([]);
  // +1 when there is a change in the segments, to set obstacles
  const [segmentsLoaded, setSegmentsLoaded] = useState(0);
  const [obstacles, setObstacles] = useState([]);

  // Modals
  const [dataForModal, setDataForModal] = useState(null);
  const [openCrossingPointModal, setOpenCrossingPointModal] = useState(false);
  const [openSegmentModal, setOpenSegmentModal] = useState(false);
  const [openObstacleModal, setOpenObstacleModal] = useState(false);

  let id = challenge.id;
  const { isError: isErrorCrossingPoints, data: crossingPointsRequest } = useQuery(['crossingPoints', id], () => apiCrossingPoints.getAllCrossingPoints(id));
  const { isError: isErrorSegments, data: segmentsRequest } = useQuery(['segments', id], () => apiSegments.getAllSegments(id));
  const { isError: isErrorObstacles, data: obstaclesRequest } = useQuery(['obstacles', id], () => apiObstacles.getAllObstacles(id));

  // Load the start point and the end point of the challenge
  useEffect(() => {
    if(challenge && crossingPointsLoaded !== 0) {
      if(challenge.start_crossing_point) {
        setCrossingPoints(current => current.map(cr => cr.id !== challenge.start_crossing_point.id ? { ...cr, isStartChallenge: false } : { ...cr, isStartChallenge: true }));
      }
      if(challenge.end_crossing_point) {
        setCrossingPoints(current => current.map(cr => cr.id !== challenge.end_crossing_point.id ? { ...cr, isEndChallenge: false } : { ...cr, isEndChallenge: true }));
      }
    }
  }, [challenge, crossingPointsLoaded]);

  // Load crossing points
  useEffect(() => {
    if(isErrorCrossingPoints) {
      setCrossingPoints([]);
    }
    else if(crossingPointsRequest && successDownload) {
      let cr = [];
      crossingPointsRequest.crossing_points.forEach((crossingPoint) => {
        cr = [...cr, { id: crossingPoint.id, position_x: percentToPixels(crossingPoint.position_x, width), position_y: percentToPixels(crossingPoint.position_y, height),
              name: crossingPoint.name, isDragging: false, isStartChallenge: false, isEndChallenge: false, onMouseOver: false }];
      });
      setCrossingPoints(cr);
      setCrossingPointsLoaded(current => current + 1);
    }
  }, [isErrorCrossingPoints, crossingPointsRequest, successDownload]);

  // Load segments
  useEffect(() => {
    if(isErrorSegments) {
      setSegments([]);
    }
    else if(segmentsRequest && crossingPointsLoaded !== 0 && successDownload) {
      let seg = [];
      segmentsRequest.segments.forEach((segment) => {
        let coord = [];
        segment.coordinates.forEach((coordinate) => {
          coord = [...coord, { positionInSegment: coord.length, position_x: percentToPixels(coordinate.position_x, width), position_y: percentToPixels(coordinate.position_y, height), isDragging: false }];
        });
        seg = [...seg, { id: segment.id, start_crossing_point_id: segment.start_crossing_point.id, end_crossing_point_id: segment.end_crossing_point.id, name: segment.name, coordinates: coord, onMouseOver: false }];
      });
      setSegments(seg);
      setSegmentsLoaded(current => current + 1);
    }
  }, [isErrorSegments, segmentsRequest, crossingPointsLoaded, successDownload]);

  // Load obstacles
  useEffect(() => {
    if(isErrorObstacles) {
      setObstacles([]);
    }
    else if(obstaclesRequest && crossingPointsLoaded !== 0 && segmentsLoaded !== 0) {
      let obs = [];
      obstaclesRequest.obstacles.forEach((obstacle) => {
        let progress = obstacle.progress > 1 ? obstacle.progress / 100 : obstacle.progress; // NB : Met entre 0 et 1 si c'est entre 0 et 100 (provisoire, il faut que en DB ce soit entre 0 et 1)
        let position = getObstaclePosition(obstacle.segment.id, progress);
        if(position !== null) { // Avoid crash when user delete a crossing point or a segment that leads to obstacle deletion
          obs = [...obs, { id: obstacle.id, position_x: position.position_x, position_y: position.position_y, label: obstacle.label, progress: progress, description: obstacle.description,
                 question_type: obstacle.question_type, nb_points: obstacle.nb_points, result: obstacle.result, segmentId: obstacle.segment.id }];
        }
      });
      setObstacles(obs);
    }
  }, [isErrorObstacles, obstaclesRequest, crossingPointsLoaded, segmentsLoaded]);

  const downloadMap = useMutation( () => apiChallenge.downloadMap(id), {
    onError: (error) => {
      setErrorDownload(error);
    },
    onSuccess: (data) => {
      let img = new window.Image();
      img.src = window.URL.createObjectURL(data);
      img.onload = function() {
        setImage(img);
        setWidth(img.width);
        setHeight(img.height);
        setSuccessDownload(true);
      };
    },
  });

  useEffect(() => {
    downloadMap.mutate();
  }, []);

  const openCrossingPointModalFunction = (crossingPoint) => {
    setDataForModal(crossingPoint);
    setOpenCrossingPointModal(true);
  };

  const openSegmentModalFunction = (segment) => {
    let segmentLenghts = realLengthSegment(segment);
    let totalLength = Math.ceil(segmentLenghts.totalLength);
    setDataForModal({ ...segment, totalLength: totalLength });
    setOpenSegmentModal(true);
  };

  const openObstacleModalFunction = (obstacle) => {
    if(isAdmin) {
      let segment = getSegmentById(obstacle.segmentId);
      setDataForModal({ ...obstacle, segment: segment });
      setOpenObstacleModal(true);
    }
  };

  const getCoordinatesFromCrossingPoint = (idCrossingPoint) => {
    let returnCoordinates = null;
    crossingPoints.forEach((crossingPoint) => {
      if(crossingPoint.id === idCrossingPoint) {
        returnCoordinates = { position_x: crossingPoint.position_x, position_y: crossingPoint.position_y };
      }
    });
    return returnCoordinates;
  };

  const getSegmentById = (segmentId) => {
    let returnSegment = null;
    segments.forEach((segment) => {
      if(segment.id === segmentId) {
        returnSegment = segment;
      }
    });
    return returnSegment;
  };

  const formatSegmentPoints = (segment) => {
    let returnCoordinates = [];
    let lastCoordinates = null; // Last coordinates before the coordinates of the ending crossing points
    let coordinatesStart = getCoordinatesFromCrossingPoint(segment.start_crossing_point_id);
    if(coordinatesStart !== null) {
      returnCoordinates.push(coordinatesStart.position_x);
      returnCoordinates.push(coordinatesStart.position_y);
      lastCoordinates = coordinatesStart;
    }
    segment.coordinates.forEach((coordinate) => {
      returnCoordinates.push(coordinate.position_x);
      returnCoordinates.push(coordinate.position_y);
      lastCoordinates = coordinate;
    });
    let coordinatesEnd = getCoordinatesFromCrossingPoint(segment.end_crossing_point_id);
    if(coordinatesEnd !== null && lastCoordinates !== null) {
      let newCoordinatesEnd = coordinatesEndSegment(lastCoordinates.position_x, lastCoordinates.position_y, coordinatesEnd.position_x, coordinatesEnd.position_y, 16);
      returnCoordinates.push(newCoordinatesEnd.x);
      returnCoordinates.push(newCoordinatesEnd.y);
    }
    return returnCoordinates;
  };

  // Donne la position (x, y) en pixels d'un obstacle avec comme données l'id du segment et le pourcentage d'avancement sur le segment
  const getObstaclePosition = (segmentId, percentage) => {
    let segment = getSegmentById(segmentId);
    if(segment === null) return null;
    let segmentLenghts = pixelsLengthSegment(segment);
    if(segmentLenghts === null) return null;
    // La distance de l'obstacle sur le segment
    let lengthObstaclePosition = segmentLenghts.totalLength * percentage;
    // Obtient le morceau de segment sur lequel se trouve l'obstacle
    let lineWithObstacle;
    for(let i = 0; i < segmentLenghts.lines.length; i++) {
      let line = segmentLenghts.lines[i];
      // La distance de l'obstacle est positive, l'obstacle se trouve sur une prochaine ligne, je soustrait la distance de la ligne a la distance de l'obstacle
      if(lengthObstaclePosition - line.length >= 0) {
        lengthObstaclePosition -= line.length;
      }
      // La distance de l'obstacle devient négative, l'obstacle est sur la ligne actuelle
      else {
        lineWithObstacle = line;
        break;
      }
    }
    // Pourcentage de l'obstacle sur le morceau de segment
    let percentageOnLine = lengthObstaclePosition / lineWithObstacle.length;
    let dx = (lineWithObstacle.endPoint.position_x - lineWithObstacle.startPoint.position_x) * percentageOnLine;
    let dy = (lineWithObstacle.endPoint.position_y - lineWithObstacle.startPoint.position_y) * percentageOnLine;
    let obstaclePositionX = lineWithObstacle.startPoint.position_x + dx;
    let obstaclePositionY = lineWithObstacle.startPoint.position_y + dy;
    return { position_x: obstaclePositionX, position_y: obstaclePositionY };
  }

  // Longueurs du segment en pixels
  const pixelsLengthSegment = (segment) => {
    let returnObject = { lines: [] };
    let startPointCoordinates = getCoordinatesFromCrossingPoint(segment.start_crossing_point_id);
    let endPointCoordinates = getCoordinatesFromCrossingPoint(segment.end_crossing_point_id);
    if(startPointCoordinates === null || endPointCoordinates === null) return null;
    let points = [startPointCoordinates, ...segment.coordinates, endPointCoordinates];
    let totalLength = 0;
    for(let i = 0; i < points.length-1; i++) {
      let startPoint = points[i];
      let endPoint = points[i+1];
      let lineLength = pixelsLengthBetweenTwoPoints(startPoint, endPoint);
      returnObject = { ...returnObject, lines: [...returnObject.lines, { startPoint: startPoint, endPoint: endPoint, length: lineLength }] };
      totalLength += lineLength;
    }
    returnObject = { ...returnObject, totalLength: totalLength };
    return returnObject;
  };

  // Longueurs du segment en vrai
  const realLengthSegment = (segment) => {
    let returnObject = { lines: [] };
    let startPointCoordinates = getCoordinatesFromCrossingPoint(segment.start_crossing_point_id);
    let endPointCoordinates = getCoordinatesFromCrossingPoint(segment.end_crossing_point_id);
    if(startPointCoordinates === null || endPointCoordinates === null) return null;
    let points = [startPointCoordinates, ...segment.coordinates, endPointCoordinates];
    let totalLength = 0;
    for(let i = 0; i < points.length-1; i++) {
      let startPoint = points[i];
      let endPoint = points[i+1];
      let lineLength = realLengthBetweenTwoPoints(startPoint, endPoint, challenge.scalling, width);
      returnObject = { ...returnObject, lines: [...returnObject.lines, { startPoint: startPoint, endPoint: endPoint, length: lineLength }] };
      totalLength += lineLength;
    }
    returnObject = { ...returnObject, totalLength: totalLength };
    return returnObject;
  };

  return (
    <div style={css.flexRight}>
      <h3>Challenge Map</h3>
      {errorDownload ? <h3>{errorDownload.message}</h3> :
        successDownload ?
          <div>
            <Stage width={width} height={height}>
              <Layer>
                <Image image={image} />
                { /* Render segments */ }
                {segments.map(segment => <Arrow key={segment.id} id={segment.id} points={formatSegmentPoints(segment)}
                                          stroke={"black"} strokeWidth={6} fill={"black"} pointerLength={16} pointerWidth={16}
                                          onClick={() => openSegmentModalFunction(segment)} />)}
                { /* Render crossing points */ }
                {crossingPoints.map(crossingPoint => <Circle key={crossingPoint.id} id={crossingPoint.id} x={crossingPoint.position_x} y={crossingPoint.position_y} radius={12} stroke={"black"} strokeWidth={2}
                                                     fill={crossingPoint.isStartChallenge && !crossingPoint.isEndChallenge ? "green" : !crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? "orange" : !crossingPoint.isStartChallenge && !crossingPoint.isEndChallenge ? "blue" : null}
                                                     fillLinearGradientStartPoint={crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? { x: -5, y: 0 } : { x: null, y: null }}
                                                     fillLinearGradientEndPoint={crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? { x: 5, y: 0 } : { x: null, y: null }}
                                                     fillLinearGradientColorStops={crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? [0, 'green', 0.40, 'green', 0.41, 'black', 0.59, 'black', 0.60, 'orange', 1, 'orange'] : null}
                                                     onClick={() => openCrossingPointModalFunction(crossingPoint)} />)}
                { /* Render obstacles */ }
                {obstacles.map(obstacle => <Star key={obstacle.id} id={obstacle.id} x={obstacle.position_x} y={obstacle.position_y}
                                           numPoints={5} innerRadius={8} outerRadius={16} stroke={"black"} strokeWidth={2} fill={"red"}
                                           onClick={() => openObstacleModalFunction(obstacle)} />)}
              </Layer>
            </Stage>
          </div>
        : null}
        { /* Render Modals */ }
        {dataForModal && openCrossingPointModal ? <ModalCrossingPoint crossingPointObject={dataForModal} openState={openCrossingPointModal} setOpenState={setOpenCrossingPointModal} /> : null}
        {dataForModal && openSegmentModal ? <ModalSegment segmentObject={dataForModal} openState={openSegmentModal} setOpenState={setOpenSegmentModal} /> : null}
        {dataForModal && openObstacleModal ? <ModalObstacle obstacleObject={dataForModal} openState={openObstacleModal} setOpenState={setOpenObstacleModal} /> : null}
    </div>
  );
};

export default ChallengeMap;
