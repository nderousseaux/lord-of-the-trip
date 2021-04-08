import React, { useState } from "react";
import { Stage, Layer, Image, Circle, Line } from 'react-konva';
import { pixelsToPercent } from "../utils/utils";

// Image
// https://www.encyclopedie-hp.org/wp-content/uploads/sites/4/2014/07/poudlard-valentin.jpg

// Upload
// https://dev.to/asimdahall/client-side-image-upload-in-react-5ffc
// https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html

// Konva
// https://konvajs.org/
// https://konvajs.org/docs/index.html
// https://konvajs.org/docs/react/index.html
// https://konvajs.org/docs/react/Free_Drawing.html

const Konva = () => {;
  // the image loaded from the file uploaded
  const [image, setImage] = useState(null);
  // width of the image
  const [width, setWidth] = useState(0);
  // height of the image
  const [height, setHeight] = useState(0);
  // wrong file uploaded
  const [errorUpload, setErrorUpload] = useState(null);
  // when image is loaded
  const [loaded, setLoaded] = useState(null);

  // array of crossing points
  const [crossingPoints, setCrossingPoints] = useState([]);
  // id of crossing points, increment when we add one
  const [idCrossingPoints, setIdCrossingPoints] = useState(1);
  // array of segments
  const [segments, setSegments] = useState([]);
  // id of segments, increment when we add one
  const [idSegments, setIdSegments] = useState(1);
  // segment that is currently drawn, else false
  const [drawingSegment, setDrawingSegment] = useState(false);

  // Value of the radio button checked in the Menu component
  const [radioButtonChecked, setRadioButtonChecked] = useState("1"); // first radio button checked by default

  const resetState = () => {
    setImage(null);
    setWidth(0);
    setHeight(0);
    setErrorUpload(null);
    setLoaded(null);
    setCrossingPoints([]);
    setIdCrossingPoints(1);
    setSegments([]);
    setIdSegments(1);
    setDrawingSegment(false);
    setRadioButtonChecked("1");
  };

  const handleImageUpload = e => {
    resetState();
    // the file uploaded to send to API
    const file = e.target.files[0];
    if (file) {
      let img = new window.Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = function() {
        setImage(img);
        setWidth(img.width);
        setHeight(img.height);
        setLoaded(true);
      };
      img.onerror = function() {
        setErrorUpload(true);
      };
    }
  };

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
    if(radioButtonChecked === "3")
    {
      deleteCrossingPoint(idCrossingPoint);
    }
    else if(radioButtonChecked === "4" && drawingSegment === false)
    {
      startDrawingSegment(idCrossingPoint);
    }
    else if(radioButtonChecked === "4" && drawingSegment !== false)
    {
      stopDrawingSegment(idCrossingPoint);
    }
    else if(radioButtonChecked === "6")
    {
      setStartChallenge(idCrossingPoint);
    }
    else if(radioButtonChecked === "7")
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
    if(radioButtonChecked === "5")
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
    if(radioButtonChecked === "5")
    {
      setDrawingSegment(false);
    }
  };

  // Click on Canvas
  const clickOnStage = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    if(radioButtonChecked === "2")
    {
      addCrossingPoint(pos.x, pos.y);
    }
    // add Coordinates in the current drawn segment
    else if(radioButtonChecked === "4" && drawingSegment !== false)
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

  const log = () => {
    console.log("crossingPoints");
    console.log(crossingPoints);
    console.log("segments");
    console.log(segments);
    console.log("drawingSegment");
    console.log(drawingSegment);
    let tabPixels = [];
    let tab0To1 = [];
    segments.forEach((segment) => {
      let segPixels = [];
      let seg0To1 = [];
      segment.coordinates.forEach((coordinate) => {
        segPixels.push({ x: coordinate.x, y: coordinate.y});
        seg0To1.push({ x: pixelsToPercent(coordinate.x, width), y: pixelsToPercent(coordinate.y, height)});
      });
      tabPixels.push(segPixels);
      tab0To1.push(seg0To1);
    });
    console.log("tabPixels");
    console.log(tabPixels);
    console.log("tab0To1");
    console.log(tab0To1);
  };

  const Menu = () => {
    const handleOptionChange = (e) => {
      setRadioButtonChecked(e.target.value);
    }
    return <div>
      <p>Select an action to do on the Map</p>
      <label> <input type="radio" name="action" value="1" checked={radioButtonChecked === "1"} onChange={handleOptionChange} /> Nothing </label>
      <label> <input type="radio" name="action" value="2" checked={radioButtonChecked === "2"} onChange={handleOptionChange} /> Add Crossing points </label>
      <label> <input type="radio" name="action" value="3" checked={radioButtonChecked === "3"} onChange={handleOptionChange} /> Delete Crossing points </label>
      <label> <input type="radio" name="action" value="4" checked={radioButtonChecked === "4"} onChange={handleOptionChange} /> Draw a Segment </label>
      <label> <input type="radio" name="action" value="5" checked={radioButtonChecked === "5"} onChange={handleOptionChange} /> Delete a Segment </label>
      <label> <input type="radio" name="action" value="6" checked={radioButtonChecked === "6"} onChange={handleOptionChange} /> Set Start challenge </label>
      <label> <input type="radio" name="action" value="7" checked={radioButtonChecked === "7"} onChange={handleOptionChange} /> Set End challenge </label>
      <label> <input type="radio" name="action" value="8" checked={radioButtonChecked === "8"} onChange={handleOptionChange} /> Other stuff to code </label>
    </div>
  };

  return <>
    <label>Upload your Map image</label>
    <br />
    <input type="file" accept="image/*" onChange={handleImageUpload} />
    <hr />
    {errorUpload ? <h3>Invalid file uploaded</h3> :
      loaded ?
        <div>
          <Menu />
          <Stage width={width} height={height} onClick={(e) => clickOnStage(e)}>
            <Layer>
              <Image image={image} />
              {segments.map(segment => <Line key={segment.id} points={formatSegmentPoints(segment)}
                                        stroke={radioButtonChecked === "5" && segment.onMouseOver ? "red" : "black"}
                                        strokeWidth={radioButtonChecked === "5" && segment.onMouseOver ? 10 : 5}
                                        onClick={(e) => onClickSegment(e, segment.id)}
                                        onMouseEnter={(e) => onMouseEnterSegment(e, segment)}
                                        onMouseLeave={(e) => onMouseLeaveSegment(e, segment)} />)}
              {drawingSegment !== false ? <Line points={formatSegmentPoints(drawingSegment)}
                                          stroke={radioButtonChecked === "5" && drawingSegment.onMouseOver ? "red" : "sienna"}
                                          strokeWidth={radioButtonChecked === "5" && drawingSegment.onMouseOver ? 10 : 5}
                                          onClick={(e) => onClickDrawingSegment(e)}
                                          onMouseEnter={(e) => setDrawingSegment(segment => ({ ...segment, onMouseOver: true }))}
                                          onMouseLeave={(e) => setDrawingSegment(segment => ({ ...segment, onMouseOver: false }))} />
                                        : null}
              {crossingPoints.map(crossingPoint => <Circle key={crossingPoint.id} id={crossingPoint.id} x={crossingPoint.x} y={crossingPoint.y} radius={12} draggable stroke={"black"} strokeWidth={2}
                                                   fill={crossingPoint.isDragging ? "sienna" : radioButtonChecked === "3" && crossingPoint.onMouseOver ? "red" : crossingPoint.isStartChallenge && !crossingPoint.isEndChallenge ? "green" : !crossingPoint.isStartChallenge && crossingPoint.isEndChallenge ? "orange" : !crossingPoint.isStartChallenge && !crossingPoint.isEndChallenge ? "blue" : null}
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
          <br />
          <button onClick={() => log()}>Log Data in Console</button>
        </div>
      : null}
  </>
};

export default Konva;
