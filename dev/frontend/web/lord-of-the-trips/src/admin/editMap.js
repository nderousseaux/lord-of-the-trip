import { useState, useEffect } from "react";
import { Stage, Layer, Image, Circle, Line } from 'react-konva';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';

const EditMap = () => {
  const [errorDownload, setErrorDownload] = useState(null);
  const [successDownload, setSuccessDownload] = useState(false);
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [radioButtonValue, setRadioButtonValue] = useState("1");

  // Temp State, replace with API calls
  const [crossingPoints, setCrossingPoints] = useState([]);
  const [idCrossingPoints, setIdCrossingPoints] = useState(1);
  const [segments, setSegments] = useState([]);
  const [idSegments, setIdSegments] = useState(1);
  const [drawingSegment, setDrawingSegment] = useState(false);

  const queryClient = useQueryClient();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

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

  const addCrossingPoint = (x, y) => {
    setCrossingPoints(current => [...current, { id: idCrossingPoints, x: x, y: y, isDragging: false, isStartChallenge: false, isEndChallenge: false, onMouseOver: false }]);
    setIdCrossingPoints(id => id + 1);
  };

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
      setCrossingPoints(current => current.filter(cr => cr.id !== idCrossingPoint));
    }
  };

  const updateCrossingPoint = (crossingPoint) => {
    setCrossingPoints(current => current.map(cr => cr.id !== crossingPoint.id ? cr : crossingPoint));
  };

  const setStartChallenge = (idCrossingPoint) => {
    setCrossingPoints(current => current.map(cr => idCrossingPoint !== cr.id ? { ...cr, isStartChallenge: false } : { ...cr, isStartChallenge: true }));
  };

  const setEndChallenge = (idCrossingPoint) => {
    setCrossingPoints(current => current.map(cr => idCrossingPoint !== cr.id ? { ...cr, isEndChallenge: false } : { ...cr, isEndChallenge: true }));
  };

  const addSegment = (segment) => {
    setSegments(current => [...current, { id: idSegments, ...segment }]);
    setIdSegments(id => id + 1);
  };

  const deleteSegment = (idSegment) => {
    setSegments(current => current.filter(segment => segment.id !== idSegment));
  };

  const updateSegment = (segment) => {
    setSegments(current => current.map(seg => seg.id !== segment.id ? seg : segment));
  };

  const startDrawingSegment = (idCrossingPoint) => {
    setDrawingSegment({ startCrossingPoint: idCrossingPoint, endCrossingPoint: null, coordinates: [], onMouseOver: false });
  };

  const updateDrawingSegment = (x, y) => {
    setDrawingSegment(segment => ({ ...segment, coordinates: [...segment.coordinates, { x: x, y: y }] }));
  };

  const stopDrawingSegment = (idCrossingPoint) => {
    addSegment({ ...drawingSegment, endCrossingPoint: idCrossingPoint });
    setDrawingSegment(false);
  };

  const onDragStartCrossingPoint = (e, crossingPoint) => {
    crossingPoint.isDragging = true;
    updateCrossingPoint(crossingPoint);
  };

  const onDragEndCrossingPoint = (e, crossingPoint) => {
    crossingPoint.x = e.target.attrs.x;
    crossingPoint.y = e.target.attrs.y;
    crossingPoint.isDragging = false;
    updateCrossingPoint(crossingPoint);
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
    updateCrossingPoint(crossingPoint);
  };

  const onMouseLeaveCrossingPoint = (e, crossingPoint) => {
    crossingPoint.onMouseOver = false;
    updateCrossingPoint(crossingPoint);
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
        returnCoordinates = { x: crossingPoint.x, y: crossingPoint.y };
        return;
      }
    });
    return returnCoordinates;
  };

  const formatSegmentPoints = (segment) => {
    let returnCoordinates = [];
    let coordinatesStart = getCoordinatesFromCrossingPoint(segment.startCrossingPoint);
    if(coordinatesStart !== null) {
      returnCoordinates.push(coordinatesStart.x);
      returnCoordinates.push(coordinatesStart.y);
    }
    segment.coordinates.forEach((coordinate) => {
      returnCoordinates.push(coordinate.x);
      returnCoordinates.push(coordinate.y);
    });
    let coordinatesEnd = getCoordinatesFromCrossingPoint(segment.endCrossingPoint);
    if(coordinatesEnd !== null) {
      returnCoordinates.push(coordinatesEnd.x);
      returnCoordinates.push(coordinatesEnd.y);
    }
    return returnCoordinates;
  };

  const Menu = () => {
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

  return <>
    <h3>Edit Map</h3>
    {errorDownload ? <h3>{errorDownload.message}</h3> :
      successDownload ?
        <div>
          <Menu />
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
              {crossingPoints.map(crossingPoint => <Circle key={crossingPoint.id} id={crossingPoint.id} x={crossingPoint.x} y={crossingPoint.y} radius={12} draggable stroke={"black"} strokeWidth={2}
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

export default EditMap;
