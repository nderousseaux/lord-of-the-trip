import { useState, useEffect } from "react";
import { Stage, Layer, Image, Circle, Arrow, Star } from 'react-konva';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import apiCrossingPoints from '../api/crossingPoints';
import apiSegments from '../api/segments';
import apiObstacles from '../api/obstacles';
import { percentToPixels, pixelsToPercent, coordinatesEndSegment, pixelsLengthBetweenTwoPoints, realLengthBetweenTwoPoints } from "../utils/utils";
import ModalCrossingPoint from './modalCrossingPoint';
import ModalSegment from './modalSegment';
import ModalObstacle from './modalObstacle';
import MenuDrawer from './menuDrawer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from '../CustomCSS';
import Tooltip from '@material-ui/core/Tooltip';

const EditMap = () => {
  const classes = useStyles();
  const [errorDownload, setErrorDownload] = useState(null);
  const [successDownload, setSuccessDownload] = useState(false);
  const [image, setImage] = useState(null);
  const [baseWidth, setBaseWidth] = useState(0);
  const [baseHeight, setBaseHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [radioButtonValue, setRadioButtonValue] = useState("11");
  const [zoom, setZoom] = useState(null);
  const [minZoom, setMinZoom] = useState(null);
  const [maxZoom, setMaxZoom] = useState(null);
  const [responseVerify, setResponseVerify] = useState(null);

  const [crossingPoints, setCrossingPoints] = useState([]);
  // +1 when there is a change in the crossing points, to set again the start and the end of the challenge
  const [crossingPointsLoaded, setCrossingPointsLoaded] = useState(0);
  const [segments, setSegments] = useState([]);
  // +1 when there is a change in the segments, to set obstacles
  const [segmentsLoaded, setSegmentsLoaded] = useState(0);
  const [drawingSegment, setDrawingSegment] = useState(false);
  const [obstacles, setObstacles] = useState([]);

  // Modals
  const [dataForModal, setDataForModal] = useState(null);
  const [openCrossingPointModal, setOpenCrossingPointModal] = useState(false);
  const [openSegmentModal, setOpenSegmentModal] = useState(false);
  const [openObstacleModal, setOpenObstacleModal] = useState(false);

  const queryClient = useQueryClient();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

  // Default Min and Max pixels for the map
  const defaultMapWidth = 1200;
  const minMapLength = 300;
  const maxMapLength = 3000;

  const { data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));
  const { isError: isErrorCrossingPoints, data: crossingPointsRequest } = useQuery(['crossingPoints', id], () => apiCrossingPoints.getAllCrossingPoints(id));
  const { isError: isErrorSegments, data: segmentsRequest } = useQuery(['segments', id], () => apiSegments.getAllSegments(id));
  const { isError: isErrorObstacles, data: obstaclesRequest } = useQuery(['obstacles', id], () => apiObstacles.getAllObstacles(id));

  // Change the zoom of the map
  useEffect(() => {
    setWidth(baseWidth * zoom);
    setHeight(baseHeight * zoom);
  }, [zoom, baseWidth, baseHeight]);

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
      setResponseVerify(null);
    }
  }, [isErrorCrossingPoints, crossingPointsRequest, successDownload, width, height]);

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
      setResponseVerify(null);
    }
  }, [isErrorSegments, segmentsRequest, crossingPointsLoaded, successDownload, width, height]);

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
        setBaseWidth(img.width);
        setBaseHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);

        // Zoom
        let shortestDistance = Math.min(img.width, img.height);
        let minZoom = minMapLength / shortestDistance;
        minZoom = Math.round(minZoom * 10) / 10;
        setMinZoom(minZoom);
        let longestDistance = Math.max(img.width, img.height);
        let maxZoom = maxMapLength / longestDistance;
        maxZoom = Math.round(maxZoom * 10) / 10;
        setMaxZoom(maxZoom);
        let defaultZoom = defaultMapWidth / img.width;
        defaultZoom = Math.round(defaultZoom * 10) / 10;
        setZoom(defaultZoom);

        setSuccessDownload(true);
      };
    },
  });

  useEffect(() => {
    downloadMap.mutate();
  }, []);

  const createCrossingPointMutation = useMutation( (crossingPoint) => apiCrossingPoints.createCrossingPoint(id, crossingPoint), {
    onSuccess: () => { queryClient.invalidateQueries(['crossingPoints', id]) },
  });

  const addCrossingPoint = (x, y) => {
    let cr = { position_x: pixelsToPercent(x, width), position_y: pixelsToPercent(y, height) };
    createCrossingPointMutation.mutate(cr);
  };

  const deleteCrossingPointMutation = useMutation( (crossingPointId) => apiCrossingPoints.deleteCrossingPoint(crossingPointId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['crossingPoints', id]);
      queryClient.invalidateQueries(['segments', id]);
      queryClient.invalidateQueries(['obstacles', id]);
    },
  });

  const deleteCrossingPoint = (idCrossingPoint) => {
    deleteCrossingPointMutation.mutate(idCrossingPoint);
  };

  const updateCrossingPointMutation = useMutation( ({ crossingPoint, crossingPointId }) => apiCrossingPoints.updateCrossingPoint(crossingPoint, crossingPointId), {
    onSuccess: () => { queryClient.invalidateQueries(['crossingPoints', id]) },
  });

  const updateCrossingPoint = (crossingPoint, requestApi) => {
    if(requestApi) {
      let cr = { position_x: pixelsToPercent(crossingPoint.position_x, width), position_y: pixelsToPercent(crossingPoint.position_y, height) };
      updateCrossingPointMutation.mutate({ crossingPoint: cr, crossingPointId: crossingPoint.id });
    }
    else {
      setCrossingPoints(current => current.map(cr => cr.id !== crossingPoint.id ? cr : crossingPoint));
    }
  };

  const setStartChallengeMutation = useMutation( (crossingPointId) => apiChallenge.setStartChallenge(id, crossingPointId), {
    onSuccess: () => { queryClient.invalidateQueries(['challenge', id]) },
  });

  const setStartChallenge = (idCrossingPoint) => {
    setStartChallengeMutation.mutate(idCrossingPoint);
  };

  const setEndChallengeMutation = useMutation( (crossingPointId) => apiChallenge.setEndChallenge(id, crossingPointId), {
    onSuccess: () => { queryClient.invalidateQueries(['challenge', id]) },
  });

  const setEndChallenge = (idCrossingPoint) => {
    setEndChallengeMutation.mutate(idCrossingPoint);
  };

  const openCrossingPointModalFunction = (crossingPoint) => {
    setDataForModal(crossingPoint);
    setOpenCrossingPointModal(true);
  };

  const createSegmentMutation = useMutation( (segment) => apiSegments.createSegment(id, segment), {
    onSuccess: () => {
      queryClient.invalidateQueries(['segments', id]);
      setDrawingSegment(false);
    },
  });

  const addSegment = (segment) => {
    let coord = [];
    segment.coordinates.forEach((coordinate) => {
      coord = [...coord, { position_x: pixelsToPercent(coordinate.position_x, width), position_y: pixelsToPercent(coordinate.position_y, height) }];
    });
    let seg = { start_crossing_point_id: segment.start_crossing_point_id, end_crossing_point_id: segment.end_crossing_point_id, coordinates: coord };
    createSegmentMutation.mutate(seg);
  };

  const deleteSegmentMutation = useMutation( (segmentId) => apiSegments.deleteSegment(segmentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['segments', id]);
      queryClient.invalidateQueries(['obstacles', id]);
    },
  });

  const deleteSegment = (idSegment) => {
    deleteSegmentMutation.mutate(idSegment);
  };

  const updateSegmentMutation = useMutation( ({ segment, segmentId }) => apiSegments.updateSegment(segment, segmentId), {
    onSuccess: () => { queryClient.invalidateQueries(['segments', id]) },
  });

  const changeSegmentOrientation = (segment) => {
    let coord = [];
    segment.coordinates.forEach((coordinate) => {
      coord = [...coord, { position_x: pixelsToPercent(coordinate.position_x, width), position_y: pixelsToPercent(coordinate.position_y, height) }];
    });
    let newSegmentData = { start_crossing_point_id: segment.end_crossing_point_id, end_crossing_point_id: segment.start_crossing_point_id, coordinates: coord.reverse() };
    updateSegmentMutation.mutate({ segment: newSegmentData, segmentId: segment.id });
  };

  const updateSegment = (segment, requestApi) => {
    if(requestApi) {
      let coord = [];
      segment.coordinates.forEach((coordinate) => {
        coord = [...coord, { position_x: pixelsToPercent(coordinate.position_x, width), position_y: pixelsToPercent(coordinate.position_y, height) }];
      });
      let newSegmentData = { start_crossing_point_id: segment.start_crossing_point_id, end_crossing_point_id: segment.end_crossing_point_id, coordinates: coord };
      updateSegmentMutation.mutate({ segment: newSegmentData, segmentId: segment.id });
    }
    else {
      setSegments(current => current.map(seg => seg.id !== segment.id ? seg : segment));
    }
  };

  const openSegmentModalFunction = (segment) => {
    let segmentLenghts = realLengthSegment(segment);
    let totalLength = Math.ceil(segmentLenghts.totalLength);
    setDataForModal({ ...segment, totalLength: totalLength });
    setOpenSegmentModal(true);
  };

  const startDrawingSegment = (idCrossingPoint) => {
    setDrawingSegment({ start_crossing_point_id: idCrossingPoint, end_crossing_point_id: null, coordinates: [], onMouseOver: false });
  };

  const updateDrawingSegment = (x, y) => {
    setDrawingSegment(segment => ({ ...segment, coordinates: [...segment.coordinates, { position_x: x, position_y: y }] }));
  };

  const stopDrawingSegment = (idCrossingPoint) => {
    // The end crossing point can't be the same as the start
    if(idCrossingPoint !== drawingSegment.start_crossing_point_id) {
      setDrawingSegment({ ...drawingSegment, end_crossing_point_id: idCrossingPoint });
      addSegment({ ...drawingSegment, end_crossing_point_id: idCrossingPoint });
    }
  };

  const createObstacleMutation = useMutation( ({ segmentId, obstacle }) => apiObstacles.createObstacle(segmentId, obstacle), {
    onSuccess: () => { queryClient.invalidateQueries(['obstacles', id]) },
  });

  const addObstacle = (segmentId) => {
    let obstacle = { progress: 0.5, question_type: 0 };
    createObstacleMutation.mutate({ segmentId: segmentId, obstacle: obstacle });
  };

  const deleteObstacleMutation = useMutation( ({ obstacleId }) => apiObstacles.deleteObstacle(obstacleId), {
    onSuccess: () => { queryClient.invalidateQueries(['obstacles', id]) },
  });

  const deleteObstacle = (obstacle) => {
    deleteObstacleMutation.mutate({ obstacleId: obstacle.id });
  };

  const openObstacleModalFunction = (obstacle) => {
    let segment = getSegmentById(obstacle.segmentId);
    setDataForModal({ ...obstacle, segment: segment });
    setOpenObstacleModal(true);
  };

  const dragBoundFunction = (pos) => {
    let x = pos.x;
    let y = pos.y;
    if(pos.x < 0) x = 0;
    else if(pos.x > width) x = width;
    if(pos.y < 0) y = 0;
    else if(pos.y > height) y = height;
    return { x, y };
  }

  const onDragStartCrossingPoint = (e, crossingPoint) => {
    crossingPoint.isDragging = true;
    updateCrossingPoint(crossingPoint, false);
  };

  const onDragEndCrossingPoint = (e, crossingPoint) => {
    crossingPoint.position_x = e.target.attrs.x;
    crossingPoint.position_y = e.target.attrs.y;
    crossingPoint.isDragging = false;
    updateCrossingPoint(crossingPoint, true);
  };

  // Click on a Crossing Point
  const onClickCrossingPoint = (e, crossingPoint) => {
    e.cancelBubble = true; // Cancel the click on the stage
    if(radioButtonValue === "3") {
      deleteCrossingPoint(crossingPoint.id);
    }
    else if(radioButtonValue === "4" && drawingSegment === false) {
      startDrawingSegment(crossingPoint.id);
    }
    else if(radioButtonValue === "4" && drawingSegment !== false) {
      stopDrawingSegment(crossingPoint.id);
    }
    else if(radioButtonValue === "6") {
      setStartChallenge(crossingPoint.id);
    }
    else if(radioButtonValue === "7") {
      setEndChallenge(crossingPoint.id);
    }
    else if(radioButtonValue === "11") {
      openCrossingPointModalFunction(crossingPoint);
    }
  };

  const onMouseEnterCrossingPoint = (e, crossingPoint) => {
    crossingPoint.onMouseOver = true;
    updateCrossingPoint(crossingPoint, false);
  };

  const onMouseLeaveCrossingPoint = (e, crossingPoint) => {
    crossingPoint.onMouseOver = false;
    updateCrossingPoint(crossingPoint, false);
  };

  const onDragStartSegmentPoint = (e, segment, coordinate) => {
    segment.coordinates[coordinate.positionInSegment] = { ...coordinate, isDragging: true };
    updateSegment(segment, false);
  };

  const onDragEndSegmentPoint = (e, segment, coordinate) => {
    segment.coordinates[coordinate.positionInSegment] = { ...coordinate, position_x: e.target.attrs.x, position_y: e.target.attrs.y, isDragging: false };
    updateSegment(segment, true);
  };

  // Click on a Segment
  const onClickSegment = (e, segment) => {
    if(radioButtonValue === "5") {
      deleteSegment(segment.id);
    }
    else if(radioButtonValue === "8") {
      changeSegmentOrientation(segment);
    }
    else if(radioButtonValue === "9") {
      addObstacle(segment.id);
    }
    else if(radioButtonValue === "11") {
      openSegmentModalFunction(segment);
    }
  };

  const onMouseEnterSegment = (e, segment) => {
    segment.onMouseOver = true;
    updateSegment(segment, false);
  };

  const onMouseLeaveSegment = (e, segment) => {
    segment.onMouseOver = false;
    updateSegment(segment, false);
  };

  // Click on the drawing Segment
  const onClickDrawingSegment = (e) => {
    if(radioButtonValue === "5") {
      setDrawingSegment(false);
    }
  };

  // Click on a Obstacle
  const onClickObstacle = (e, obstacle) => {
    if(radioButtonValue === "10") {
      deleteObstacle(obstacle);
    }
    else if(radioButtonValue === "11") {
      openObstacleModalFunction(obstacle);
    }
  };

  // Click on Canvas
  const clickOnStage = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    if(radioButtonValue === "2") {
      addCrossingPoint(pos.x, pos.y);
    }
    // add Coordinates in the current drawn segment
    else if(radioButtonValue === "4" && drawingSegment !== false) {
      updateDrawingSegment(pos.x, pos.y);
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

  const ValueLabelComponent = (props) => {
    const { children, open, value } = props;
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={<h1 className={classes.tooltip}>{value}</h1>}>
        {children}
      </Tooltip>
    );
  }

  return <>
    <Grid container direction="row">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" onClick={() => history.push(`/`)} className={classes.clickable}>
          Accueil
        </Link>
        <Link color="inherit" onClick={() => history.push(`/admindashboard`)} className={classes.clickable}>
          Dashboard Administrateur
        </Link>
        <Link color="inherit" onClick={() => history.push(`/editchallenge/${id}`)} className={classes.clickable}>
          Modification d'un challenge
        </Link>
        <Typography color="textPrimary">Édition de la carte</Typography>
      </Breadcrumbs>
    </Grid>
    <div className={classes.margin20bottom}>
      <VerifyChallenge challenge={challenge} response={responseVerify} setResponse={setResponseVerify} />
    </div>
    {errorDownload ? <h3>{errorDownload.message}</h3> :
      successDownload ?
        <div>
          <MenuDrawer radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
          <Grid container spacing={2}>
            <Grid item>
              <Typography>
                Zoom
              </Typography>
            </Grid>
            <Grid item>
              <RemoveIcon />
            </Grid>
            <Grid item lg>
              <Slider value={zoom} onChange={(e, val) => setZoom(val)} step={0.1} min={minZoom} max={maxZoom}
                      valueLabelDisplay="auto" valueLabelFormat={Math.round(zoom*100) + ' %'} ValueLabelComponent={ValueLabelComponent} />
            </Grid>
            <Grid item>
              <AddIcon />
            </Grid>
          </Grid>
          <Stage width={width} height={height} onClick={(e) => clickOnStage(e)}>
            <Layer>
              <Image image={image} width={width} height={height} />
              { /* Render segments */ }
              {segments.map(segment => <Arrow key={segment.id} id={segment.id} points={formatSegmentPoints(segment)}
                                        stroke={radioButtonValue === "5" && segment.onMouseOver ? "red" : (radioButtonValue === "8" || radioButtonValue === "9" || radioButtonValue === "11") && segment.onMouseOver ? "green" : "black"}
                                        strokeWidth={(radioButtonValue === "5" || radioButtonValue === "8" || radioButtonValue === "9" || radioButtonValue === "11") && segment.onMouseOver ? 12 : 6}
                                        fill={radioButtonValue === "5" && segment.onMouseOver ? "red" : (radioButtonValue === "8" || radioButtonValue === "9" || radioButtonValue === "11") && segment.onMouseOver ? "green" : "black"}
                                        pointerLength={16} pointerWidth={16}
                                        onClick={(e) => onClickSegment(e, segment)}
                                        onMouseEnter={(e) => onMouseEnterSegment(e, segment)}
                                        onMouseLeave={(e) => onMouseLeaveSegment(e, segment)} />)}
              { /* Render the segment currently drawn */ }
              {drawingSegment !== false ? <Arrow points={formatSegmentPoints(drawingSegment)}
                                          stroke={radioButtonValue === "5" && drawingSegment.onMouseOver ? "red" : "sienna"}
                                          strokeWidth={radioButtonValue === "5" && drawingSegment.onMouseOver ? 12 : 6}
                                          fill={radioButtonValue === "5" && drawingSegment.onMouseOver ? "red" : "sienna"}
                                          pointerLength={16} pointerWidth={16}
                                          onClick={(e) => onClickDrawingSegment(e)}
                                          onMouseEnter={(e) => setDrawingSegment(segment => ({ ...segment, onMouseOver: true }))}
                                          onMouseLeave={(e) => setDrawingSegment(segment => ({ ...segment, onMouseOver: false }))} />
                                        : null}
              { /* Render intermediates points on segments */ }
              {segments.map((segment) => {
                return (
                  segment.coordinates.map(coordinate => {
                    return (
                      <Circle key={segment.id + " " + coordinate.positionInSegment} x={coordinate.position_x} y={coordinate.position_y} radius={5} draggable={challenge?.draft} dragBoundFunc={dragBoundFunction} stroke={"black"} strokeWidth={2}
                      fill={coordinate.isDragging ? "sienna" : "black"}
                      onDragStart={(e) => onDragStartSegmentPoint(e, segment, coordinate)}
                      onDragEnd={(e) => onDragEndSegmentPoint(e, segment, coordinate)} />
                    );
                  })
                );
              })}
              { /* Render crossing points */ }
              {crossingPoints.map(crossingPoint => <Circle key={crossingPoint.id} id={crossingPoint.id} x={crossingPoint.position_x} y={crossingPoint.position_y} radius={12} draggable={challenge?.draft} dragBoundFunc={dragBoundFunction} stroke={"black"} strokeWidth={2}
                                                   fill={crossingPoint.isDragging ? "sienna" : radioButtonValue === "3" && crossingPoint.onMouseOver ? "red" : crossingPoint.isStartChallenge && !crossingPoint.isEndChallenge ? "#2a7e50" : !crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? "#ea1943" : !crossingPoint.isStartChallenge && !crossingPoint.isEndChallenge ? "#2a6592" : null}
                                                   fillLinearGradientStartPoint={crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? { x: -5, y: 0 } : { x: null, y: null }}
                                                   fillLinearGradientEndPoint={crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? { x: 5, y: 0 } : { x: null, y: null }}
                                                   fillLinearGradientColorStops={crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? [0, '#2a7e50', 0.40, '#2a7e50', 0.41, 'black', 0.59, 'black', 0.60, '#ea1943', 1, '#ea1943'] : null}
                                                   onDragStart={(e) => onDragStartCrossingPoint(e, crossingPoint)}
                                                   onDragEnd={(e) => onDragEndCrossingPoint(e, crossingPoint)}
                                                   onClick={(e) => onClickCrossingPoint(e, crossingPoint)}
                                                   onMouseEnter={(e) => onMouseEnterCrossingPoint(e, crossingPoint)}
                                                   onMouseLeave={(e) => onMouseLeaveCrossingPoint(e, crossingPoint)} />)}
              { /* Render obstacles */ }
              {obstacles.map(obstacle => <Star key={obstacle.id} id={obstacle.id} x={obstacle.position_x} y={obstacle.position_y}
                                         numPoints={5} innerRadius={8} outerRadius={16} stroke={"black"} strokeWidth={2} fill={"#db9833"}
                                         onClick={(e) => onClickObstacle(e, obstacle)} />)}
            </Layer>
          </Stage>
        </div>
      : null}

    { /* Render Modals */ }
    {dataForModal && openCrossingPointModal ? <ModalCrossingPoint crossingPointObject={dataForModal} challengeId={id} openState={openCrossingPointModal} setOpenState={setOpenCrossingPointModal} /> : null}
    {dataForModal && openSegmentModal ? <ModalSegment segmentObject={dataForModal} challengeId={id} openState={openSegmentModal} setOpenState={setOpenSegmentModal} /> : null}
    {dataForModal && openObstacleModal ? <ModalObstacle obstacleObject={dataForModal} challengeId={id} openState={openObstacleModal} setOpenState={setOpenObstacleModal} /> : null}
  </>
};

const VerifyChallenge = ({ challenge, response, setResponse }) => {
  const classes = useStyles();
  const history = useHistory();

  const verifyChallenge = useMutation( (id) => apiChallenge.verifyChallenge(id), {
    onError: (data) => {
      setResponse(data);
    },
    onSuccess: (data) => {
      setResponse(data);
    },
  });

  const handleClick = e => {
    e.preventDefault();
    setResponse(null);
    verifyChallenge.mutate(challenge.id);
  };

  return <div>
    <Button onClick={handleClick} size="small" variant="contained" color="primary" className={ `${classes.button} ${classes.colorPrimary}` }>Vérifier le parcours</Button> {' '}
    {response ?
      response.status === 'ok' ?
        <>
          Parcours valide, pour publier le challenge, aller sur cette page {' '}
          <Button onClick={() => history.push(`/editchallenge/${challenge.id}`)} size="small" variant="contained" color="primary" className={ `${classes.button} ${classes.colorPrimary}` }>Modifier le challenge</Button>
        </>
      : <div>
          <ul>
            {response.data?.error?.details?.start_crossing_point_id === null ? <li>Il n'y a pas de départ</li> : null}
            {response.data?.error?.details?.end_crossing_point_id === null ? <li>Il n'y a pas d'arrivé</li> : null}
            {response.data?.error?.details?.orphans && response.data?.error?.details?.orphans?.length !== 0 ? <li>Il y a des points de passages reliés à aucun segment, supprimés les ou reliés les.</li> : null}
            {response.data?.error?.details?.deadend && response.data?.error?.details?.deadend?.length !== 0 ? <li>Il y a des culs de sac, supprimés les ou reliés les.</li> : null}
            {response.data?.error?.details?.loop && response.data?.error?.details?.loop?.length !== 0 ? <li>Vos segments font des boucles, les boucles ne sont pas acceptées.</li> : null}
          </ul>
        </div>
    : null}
  </div>
};

export default EditMap;
