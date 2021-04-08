import { useState, useEffect } from "react";
import { Stage, Layer, Image, Circle, Line } from 'react-konva';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import apiCrossingPoints from '../api/crossingPoints';
import apiSegments from '../api/segments';
import { percentToPixels, pixelsToPercent } from "../utils/utils";

const EditMap = () => {
  const [errorDownload, setErrorDownload] = useState(null);
  const [successDownload, setSuccessDownload] = useState(false);
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [radioButtonValue, setRadioButtonValue] = useState("1");

  const [crossingPoints, setCrossingPoints] = useState([]);
  const [idCrossingPoints, setIdCrossingPoints] = useState(1);
  const [segments, setSegments] = useState([]);
  const [idSegments, setIdSegments] = useState(1);
  const [drawingSegment, setDrawingSegment] = useState(false);

  const queryClient = useQueryClient();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

  const { isLoadingCrossingPoints, isErrorCrossingPoints, data: crossingPointsRequest } = useQuery(['crossingPoints', id], () => apiCrossingPoints.getAllCrossingPoints(id));
  const { isLoadingSegments, isErrorSegments, data: segmentsRequest } = useQuery(['segments', id], () => apiSegments.getAllSegments(id));

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
    }
  }, [crossingPointsRequest, successDownload]);

  useEffect(() => {
    if(isLoadingSegments || isErrorSegments || !segmentsRequest) {
      setSegments([]);
    }
    else {
      let seg = [];
      segmentsRequest.segments.forEach((segment) => {
        let coord = [];
        segment.coordinates.forEach((coordinate) => {
          coord = [...coord, { position_x: percentToPixels(coordinate.position_x, width), position_y: percentToPixels(coordinate.position_y, height) }];
        });
        seg = [...seg, { id: segment.id, startCrossingPoint: segment.start_crossing_point.id, endCrossingPoint: segment.end_crossing_point.id, name: segment.name, coordinates: coord, onMouseOver: false }];
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
    let cr = { name: "cr " + idCrossingPoints, position_x: pixelsToPercent(x, width), position_y: pixelsToPercent(y, height) };
    createCrossingPointMutation.mutate(cr);
    setIdCrossingPoints(id => id + 1);
  };

  const deleteCrossingPointMutation = useMutation( (crossingPointId) => apiCrossingPoints.deleteCrossingPoint(id, crossingPointId), {
    onSuccess: () => { queryClient.invalidateQueries(['crossingPoints', id]) },
  });

  // Delete a crossing point if there is no segment starting or ending on it
  const deleteCrossingPoint = (idCrossingPoint) => {
    let isUsed = false;
    segments.forEach((segment) => {
      if(segment.startCrossingPoint === idCrossingPoint || segment.endCrossingPoint === idCrossingPoint)
      {
        isUsed = true;
      }
    });
    if(drawingSegment.startCrossingPoint === idCrossingPoint || drawingSegment.endCrossingPoint === idCrossingPoint)
    {
      isUsed = true;
    }
    if(isUsed === false)
    {
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

  const setStartChallenge = (idCrossingPoint) => {
    setCrossingPoints(current => current.map(cr => idCrossingPoint !== cr.id ? { ...cr, isStartChallenge: false } : { ...cr, isStartChallenge: true }));
  };

  const setEndChallenge = (idCrossingPoint) => {
    setCrossingPoints(current => current.map(cr => idCrossingPoint !== cr.id ? { ...cr, isEndChallenge: false } : { ...cr, isEndChallenge: true }));
  };

  const createSegmentMutation = useMutation( (segment) => apiSegments.createSegment(id, segment), {
    onSuccess: () => { queryClient.invalidateQueries(['segments', id]) },
  });

  const addSegment = (segment) => {
    let coord = [];
    segment.coordinates.forEach((coordinate) => {
      coord = [...coord, { position_x: pixelsToPercent(coordinate.position_x, width), position_y: pixelsToPercent(coordinate.position_y, height) }];
    });
    let seg = { name: "seg " + idSegments, start_crossing_point_id: segment.start_crossing_point_id, end_crossing_point_id: segment.end_crossing_point_id, coordinates: coord };
    createSegmentMutation.mutate(seg);
    setIdSegments(id => id + 1);
  };

  const deleteSegmentMutation = useMutation( (segmentId) => apiSegments.deleteSegment(id, segmentId), {
    onSuccess: () => { queryClient.invalidateQueries(['segments', id]) },
  });

  const deleteSegment = (idSegment) => {
    deleteSegmentMutation.mutate(idSegment);
  };

  const updateSegment = (segment) => {
    setSegments(current => current.map(seg => seg.id !== segment.id ? seg : segment));
  };

  const startDrawingSegment = (idCrossingPoint) => {
    setDrawingSegment({ start_crossing_point_id: idCrossingPoint, end_crossing_point_id: null, coordinates: [], onMouseOver: false });
  };

  const updateDrawingSegment = (x, y) => {
    setDrawingSegment(segment => ({ ...segment, coordinates: [...segment.coordinates, { position_x: x, position_y: y }] }));
  };

  const stopDrawingSegment = (idCrossingPoint) => {
    addSegment({ ...drawingSegment, end_crossing_point_id: idCrossingPoint });
    setDrawingSegment(false);
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
    if(radioButtonValue === "3")
    {
      deleteCrossingPoint(idCrossingPoint);
    }
    else if(radioButtonValue === "4" && drawingSegment === false)
    {
      startDrawingSegment(idCrossingPoint);
    }
    else if(radioButtonValue === "4" && drawingSegment !== false)
    {
      stopDrawingSegment(idCrossingPoint);
    }
    else if(radioButtonValue === "6")
    {
      setStartChallenge(idCrossingPoint);
    }
    else if(radioButtonValue === "7")
    {
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

  // Click on a Segment
  const onClickSegment = (e, idSegment) => {
    if(radioButtonValue === "5")
    {
      deleteSegment(idSegment);
    }
  };

  const onMouseEnterSegment = (e, segment) => {
    segment.onMouseOver = true;
    updateSegment(segment);
  };

  const onMouseLeaveSegment = (e, segment) => {
    segment.onMouseOver = false;
    updateSegment(segment);
  };

  // Click on the drawing Segment
  const onClickDrawingSegment = (e) => {
    if(radioButtonValue === "5")
    {
      setDrawingSegment(false);
    }
  };

  // Click on Canvas
  const clickOnStage = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    if(radioButtonValue === "2")
    {
      addCrossingPoint(pos.x, pos.y);
    }
    // add Coordinates in the current drawn segment
    else if(radioButtonValue === "4" && drawingSegment !== false)
    {
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
    let coordinatesStart = getCoordinatesFromCrossingPoint(segment.startCrossingPoint);
    if(coordinatesStart !== null) {
      returnCoordinates.push(coordinatesStart.position_x);
      returnCoordinates.push(coordinatesStart.position_y);
    }
    segment.coordinates.forEach((coordinate) => {
      returnCoordinates.push(coordinate.position_x);
      returnCoordinates.push(coordinate.position_y);
    });
    let coordinatesEnd = getCoordinatesFromCrossingPoint(segment.endCrossingPoint);
    if(coordinatesEnd !== null) {
      returnCoordinates.push(coordinatesEnd.position_x);
      returnCoordinates.push(coordinatesEnd.position_y);
    }
    return returnCoordinates;
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
              {segments.map(segment => <Line key={segment.id} points={formatSegmentPoints(segment)}
                                        stroke={radioButtonValue === "5" && segment.onMouseOver ? "red" : "black"}
                                        strokeWidth={radioButtonValue === "5" && segment.onMouseOver ? 10 : 5}
                                        onClick={(e) => onClickSegment(e, segment.id)}
                                        onMouseEnter={(e) => onMouseEnterSegment(e, segment)}
                                        onMouseLeave={(e) => onMouseLeaveSegment(e, segment)} />)}
              {drawingSegment !== false ? <Line points={formatSegmentPoints(drawingSegment)}
                                          stroke={radioButtonValue === "5" && drawingSegment.onMouseOver ? "red" : "sienna"}
                                          strokeWidth={radioButtonValue === "5" && drawingSegment.onMouseOver ? 10 : 5}
                                          onClick={(e) => onClickDrawingSegment(e)}
                                          onMouseEnter={(e) => setDrawingSegment(segment => ({ ...segment, onMouseOver: true }))}
                                          onMouseLeave={(e) => setDrawingSegment(segment => ({ ...segment, onMouseOver: false }))} />
                                        : null}
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
    <button onClick={() => history.push(`/editchallenge/${id}`)}>Edit Challenge</button>
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
  </div>
};

export default EditMap;
