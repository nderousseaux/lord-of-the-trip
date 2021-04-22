import { useState, useEffect } from "react";
import { Stage, Layer, Image, Circle, Arrow } from 'react-konva';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import apiCrossingPoints from '../api/crossingPoints';
import apiSegments from '../api/segments';
import { percentToPixels, pixelsToPercent, coordinatesEndSegment } from "../utils/utils";
import Button from '@material-ui/core/Button';

const EditMap = () => {
  const [errorDownload, setErrorDownload] = useState(null);
  const [successDownload, setSuccessDownload] = useState(false);
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [radioButtonValue, setRadioButtonValue] = useState("1");

  const [crossingPoints, setCrossingPoints] = useState([]);
  // +1 when there is a change in the crossing points, to set again the start and the end of the challenge (horrible)
  const [crossingPointsLoaded, setCrossingPointsLoaded] = useState(0);
  const [segments, setSegments] = useState([]);
  const [drawingSegment, setDrawingSegment] = useState(false);

  const queryClient = useQueryClient();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

  const { isLoadingChallenge, isErrorChallenge, errorChallenge, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));
  const { isLoadingCrossingPoints, isErrorCrossingPoints, data: crossingPointsRequest } = useQuery(['crossingPoints', id], () => apiCrossingPoints.getAllCrossingPoints(id));
  const { isLoadingSegments, isErrorSegments, data: segmentsRequest } = useQuery(['segments', id], () => apiSegments.getAllSegments(id));

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

  // Load the crossing points
  useEffect(() => {
    if(isLoadingCrossingPoints || isErrorCrossingPoints || !crossingPointsRequest || !successDownload) {
      setCrossingPoints([]);
    }
    else {
      let cr = [];
      crossingPointsRequest.crossing_points.forEach((crossingPoint) => {
        cr = [...cr, { id: crossingPoint.id, position_x: percentToPixels(crossingPoint.position_x, width), position_y: percentToPixels(crossingPoint.position_y, height),
              name: crossingPoint.name, isDragging: false, isStartChallenge: false, isEndChallenge: false, onMouseOver: false }];
      });
      setCrossingPoints(cr);
      setCrossingPointsLoaded(current => current + 1);
    }
  }, [crossingPointsRequest, successDownload]);

  // Load the segments
  useEffect(() => {
    if(isLoadingSegments || isErrorSegments || !segmentsRequest || !successDownload) {
      setSegments([]);
    }
    else {
      let seg = [];
      segmentsRequest.segments.forEach((segment) => {
        let coord = [];
        segment.coordinates.forEach((coordinate) => {
          coord = [...coord, { positionInSegment: coord.length, position_x: percentToPixels(coordinate.position_x, width), position_y: percentToPixels(coordinate.position_y, height), isDragging: false }];
        });
        seg = [...seg, { id: segment.id, start_crossing_point_id: segment.start_crossing_point.id, end_crossing_point_id: segment.end_crossing_point.id, name: segment.name, coordinates: coord, onMouseOver: false }];
      });
      setSegments(seg);
    }
  }, [segmentsRequest, successDownload]);

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

  const createCrossingPointMutation = useMutation( (crossingPoint) => apiCrossingPoints.createCrossingPoint(id, crossingPoint), {
    onSuccess: () => { queryClient.invalidateQueries(['crossingPoints', id]) },
  });

  const addCrossingPoint = (x, y) => {
    let cr = { name: "crossing point", position_x: pixelsToPercent(x, width), position_y: pixelsToPercent(y, height) };
    createCrossingPointMutation.mutate(cr);
  };

  const deleteCrossingPointMutation = useMutation( (crossingPointId) => apiCrossingPoints.deleteCrossingPoint(id, crossingPointId), {
    onSuccess: () => { queryClient.invalidateQueries(['crossingPoints', id]) },
  });

  // Delete a crossing point if there is no segment starting or ending on it
  const deleteCrossingPoint = (idCrossingPoint) => {
    let isUsed = false;
    segments.forEach((segment) => {
      if(segment.start_crossing_point_id === idCrossingPoint || segment.end_crossing_point_id === idCrossingPoint) {
        isUsed = true;
      }
    });
    if(drawingSegment.start_crossing_point_id === idCrossingPoint || drawingSegment.end_crossing_point_id === idCrossingPoint) {
      isUsed = true;
    }
    if(isUsed === false) {
      deleteCrossingPointMutation.mutate(idCrossingPoint);
    }
  };

  const updateCrossingPointMutation = useMutation( ({ crossingPoint, crossingPointId }) => apiCrossingPoints.updateCrossingPoint(id, crossingPoint, crossingPointId), {
    onSuccess: () => { queryClient.invalidateQueries(['crossingPoints', id]) },
  });

  const updateCrossingPoint = (crossingPoint, requestApi) => {
    if(requestApi) {
      let cr = { name: crossingPoint.name, position_x: pixelsToPercent(crossingPoint.position_x, width), position_y: pixelsToPercent(crossingPoint.position_y, height) };
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
    let seg = { name: "segment", start_crossing_point_id: segment.start_crossing_point_id, end_crossing_point_id: segment.end_crossing_point_id, coordinates: coord };
    createSegmentMutation.mutate(seg);
  };

  const deleteSegmentMutation = useMutation( (segmentId) => apiSegments.deleteSegment(id, segmentId), {
    onSuccess: () => { queryClient.invalidateQueries(['segments', id]) },
  });

  const deleteSegment = (idSegment) => {
    deleteSegmentMutation.mutate(idSegment);
  };

  const updateSegmentMutation = useMutation( ({ segment, segmentId }) => apiSegments.updateSegment(id, segment, segmentId), {
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
      let newSegmentData = { name: segment.name, start_crossing_point_id: segment.start_crossing_point_id, end_crossing_point_id: segment.end_crossing_point_id, coordinates: coord };
      updateSegmentMutation.mutate({ segment: newSegmentData, segmentId: segment.id });
    }
    else {
      setSegments(current => current.map(seg => seg.id !== segment.id ? seg : segment));
    }
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
  const onClickCrossingPoint = (e, idCrossingPoint) => {
    e.cancelBubble = true; // Cancel the click on the stage
    if(radioButtonValue === "3") {
      deleteCrossingPoint(idCrossingPoint);
    }
    else if(radioButtonValue === "4" && drawingSegment === false) {
      startDrawingSegment(idCrossingPoint);
    }
    else if(radioButtonValue === "4" && drawingSegment !== false) {
      stopDrawingSegment(idCrossingPoint);
    }
    else if(radioButtonValue === "6") {
      setStartChallenge(idCrossingPoint);
    }
    else if(radioButtonValue === "7") {
      setEndChallenge(idCrossingPoint);
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
        return;
      }
    });
    return returnCoordinates;
  };

  const formatSegmentPoints = (segment) => {
    let returnCoordinates = [];
    let lastCoordinates; // Last coordinates before the coordinates of the ending crossing points
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
    if(coordinatesEnd !== null) {
      let newCoordinatesEnd = coordinatesEndSegment(lastCoordinates.position_x, lastCoordinates.position_y, coordinatesEnd.position_x, coordinatesEnd.position_y, 16);
      returnCoordinates.push(newCoordinatesEnd.x);
      returnCoordinates.push(newCoordinatesEnd.y);
    }
    return returnCoordinates;
  };

  // Longueur entre le départ et l'arrivé du segment (sans points intermédiaires entre les crossings points)
  const longueurSegment1 = () => {
    let scaling = challenge.scalling;
    let firstSegment = segments[0];
    let startPointCoordinates = getCoordinatesFromCrossingPoint(firstSegment.start_crossing_point_id);
    let endPointCoordinates = getCoordinatesFromCrossingPoint(firstSegment.end_crossing_point_id);
    let dx = endPointCoordinates.position_x - startPointCoordinates.position_x;
    let dy = endPointCoordinates.position_y - startPointCoordinates.position_y;
    let dx2 = dx * dx;
    let dy2 = dy * dy;
    let longueurPix = Math.sqrt(dx2 + dy2);
    console.log(longueurPix);
    let longueur1pix = scaling / width;
    let longueurRéelle = longueurPix * longueur1pix;
    console.log(longueurRéelle);
  };

  // Longueur du segment avec les points intermédiaire (vrai longueur du segment)
  // TODO(actuellement copier coller de longueurSegment1)
  const longueurSegment2 = () => {
    let scaling = challenge.scalling;
    let firstSegment = segments[0];
    let startPointCoordinates = getCoordinatesFromCrossingPoint(firstSegment.start_crossing_point_id);
    let endPointCoordinates = getCoordinatesFromCrossingPoint(firstSegment.end_crossing_point_id);
    let dx = endPointCoordinates.position_x - startPointCoordinates.position_x;
    let dy = endPointCoordinates.position_y - startPointCoordinates.position_y;
    let dx2 = dx * dx;
    let dy2 = dy * dy;
    let longueurPix = Math.sqrt(dx2 + dy2);
    console.log(longueurPix);
    let longueur1pix = scaling / width;
    let longueurRéelle = longueurPix * longueur1pix;
    console.log(longueurRéelle);
  };

  return <>
    <h3>Edit Map</h3>
    {errorDownload ? <h3>{errorDownload.message}</h3> :
      successDownload ?
        <div>
          <Menu radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue}/>
          <Stage width={width} height={height} onClick={(e) => clickOnStage(e)}>
            <Layer>
              <Image image={image} />
              { /* Render segments */ }
              {segments.map(segment => <Arrow key={segment.id} id={segment.id} points={formatSegmentPoints(segment)}
                                        stroke={radioButtonValue === "5" && segment.onMouseOver ? "red" : radioButtonValue === "8" && segment.onMouseOver ? "green" : "black"}
                                        strokeWidth={(radioButtonValue === "5" || radioButtonValue === "8") && segment.onMouseOver ? 12 : 6}
                                        fill={radioButtonValue === "5" && segment.onMouseOver ? "red" : radioButtonValue === "8" && segment.onMouseOver ? "green" : "black"}
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
                      <Circle key={segment.id + " " + coordinate.positionInSegment} x={coordinate.position_x} y={coordinate.position_y} radius={8} draggable stroke={"black"} strokeWidth={2}
                      fill={coordinate.isDragging ? "sienna" : "black"}
                      onDragStart={(e) => onDragStartSegmentPoint(e, segment, coordinate)}
                      onDragEnd={(e) => onDragEndSegmentPoint(e, segment, coordinate)} />
                    );
                  })
                );
              })}
              { /* Render crossing points */ }
              {crossingPoints.map(crossingPoint => <Circle key={crossingPoint.id} id={crossingPoint.id} x={crossingPoint.position_x} y={crossingPoint.position_y} radius={12} draggable stroke={"black"} strokeWidth={2}
                                                   fill={crossingPoint.isDragging ? "sienna" : radioButtonValue === "3" && crossingPoint.onMouseOver ? "red" : crossingPoint.isStartChallenge && !crossingPoint.isEndChallenge ? "green" : !crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? "orange" : !crossingPoint.isStartChallenge && !crossingPoint.isEndChallenge ? "blue" : null}
                                                   fillLinearGradientStartPoint={crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? { x: -5, y: 0 } : { x: null, y: null }}
                                                   fillLinearGradientEndPoint={crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? { x: 5, y: 0 } : { x: null, y: null }}
                                                   fillLinearGradientColorStops={crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? [0, 'green', 0.40, 'green', 0.41, 'black', 0.59, 'black', 0.60, 'orange', 1, 'orange'] : null}
                                                   onDragStart={(e) => onDragStartCrossingPoint(e, crossingPoint)}
                                                   onDragEnd={(e) => onDragEndCrossingPoint(e, crossingPoint)}
                                                   onClick={(e) => onClickCrossingPoint(e, crossingPoint.id)}
                                                   onMouseEnter={(e) => onMouseEnterCrossingPoint(e, crossingPoint)}
                                                   onMouseLeave={(e) => onMouseLeaveCrossingPoint(e, crossingPoint)} />)}
            </Layer>
          </Stage>
        </div>
      : null}
    <hr />
    <h3>Back to challenge</h3>
    <Button onClick={() => history.push(`/editchallenge/${id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Edit Challenge</Button>
    <button onClick={() => longueurSegment1()}>test longueur segment 1</button>
    <button onClick={() => longueurSegment2()}>test longueur segment 2</button>
  </>
};

const Menu = ({ radioButtonValue, setRadioButtonValue }) => {
  const handleOptionChange = (e) => {
    setRadioButtonValue(e.target.value);
  }
  return <div>
    <p>Select an action to do on the Map</p>
    <label> <input type="radio" name="action" value="1" checked={radioButtonValue === "1"} onChange={handleOptionChange} /> Nothing </label>
    <label> <input type="radio" name="action" value="2" checked={radioButtonValue === "2"} onChange={handleOptionChange} /> Add Crossing points </label>
    <label> <input type="radio" name="action" value="3" checked={radioButtonValue === "3"} onChange={handleOptionChange} /> Delete Crossing points </label>
    <label> <input type="radio" name="action" value="4" checked={radioButtonValue === "4"} onChange={handleOptionChange} /> Draw a Segment </label>
    <label> <input type="radio" name="action" value="5" checked={radioButtonValue === "5"} onChange={handleOptionChange} /> Delete a Segment </label>
    <label> <input type="radio" name="action" value="6" checked={radioButtonValue === "6"} onChange={handleOptionChange} /> Set Start challenge </label>
    <label> <input type="radio" name="action" value="7" checked={radioButtonValue === "7"} onChange={handleOptionChange} /> Set End challenge </label>
    <label> <input type="radio" name="action" value="8" checked={radioButtonValue === "8"} onChange={handleOptionChange} /> Change Segment Orientation </label>
  </div>
};

export default EditMap;
