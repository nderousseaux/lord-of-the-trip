import React, { useState } from "react";
import { Stage, Layer, Image, Circle, Line } from 'react-konva';

// Upload
// https://dev.to/asimdahall/client-side-image-upload-in-react-5ffc
// https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html

// Konva
// https://konvajs.org/
// https://konvajs.org/docs/index.html
// https://konvajs.org/docs/react/index.html

// Konva click
// https://stackoverflow.com/questions/57576984/in-react-konva-how-to-get-the-position-of-a-click-on-an-image-shape-in-a-dragga
// https://github.com/konvajs/react-konva/issues/433

// Konva line between circle
// https://stackoverflow.com/questions/59111411/react-konva-conneting-circle-with-a-line-using-mouse-click

// Konva free drawing
// https://konvajs.org/docs/react/Free_Drawing.html

const Konva = () => {
  // the file uploaded (to send to API server ?)
  const [file, setFile] = useState(null);
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
    setFile(null);
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
    const file = e.target.files[0];
    if (file) {
      setFile(file);
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
    setCrossingPoints(current => [...current, { id: idCrossingPoints, x: x, y: y, isDragging: false }]);
    setIdCrossingPoints(id => id + 1);
  };

  const colorDraggingCrossingPoint = (idCrossingPoint) => {
    setCrossingPoints(current => current.map(cr => idCrossingPoint !== cr.id ? cr : { ...cr, isDragging: true }));
  };

  const updateCrossingPoint = (x, y, idCrossingPoint) => {
    setCrossingPoints(current => current.map(cr => idCrossingPoint !== cr.id ? cr : { ...cr, x: x, y: y, isDragging: false }));
  };

  const addSegment = (segment) => {
    setSegments(current => [...current, { id: idSegments, ...segment }]);
    setIdSegments(id => id + 1);
  };

  const deleteSegment = (idSegment) => {
    setSegments(current => current.filter(segment => segment.id !== idSegment));
  };

  const startDrawingSegment = (e, idCrossingPoint) => {
    setDrawingSegment({ coordinates: [{ x: e.target.attrs.x, y: e.target.attrs.y }] });
  };

  const updateDrawingSegment = (x, y) => {
    setDrawingSegment(segment => ({ coordinates: [...segment.coordinates, { x: x, y: y }] }));
  };

  const stopDrawingSegment = (e, idCrossingPoint) => {
    setDrawingSegment(segment => {
      segment.coordinates.push({ x: e.target.attrs.x, y: e.target.attrs.y })
      return segment;
    });
    addSegment(drawingSegment);
    setDrawingSegment(false);
  };

  const onDragStartCrossingPoint = (e, idCrossingPoint) => {
    colorDraggingCrossingPoint(idCrossingPoint);
  };

  const onDragEndCrossingPoint = (e, idCrossingPoint) => {
    updateCrossingPoint(e.target.attrs.x, e.target.attrs.y, idCrossingPoint);
  };

  // Click on a Crossing Point
  const onClickCrossingPoint = (e, idCrossingPoint) => {
    if(radioButtonChecked === "4" && drawingSegment === false)
    {
      startDrawingSegment(e, idCrossingPoint);
    }
    else if(radioButtonChecked === "4" && drawingSegment !== false)
    {
      stopDrawingSegment(e, idCrossingPoint);
    }
  };

  // Click on a Segment
  const onClickSegment = (e, idSegment) => {
    if(radioButtonChecked === "5")
    {
      deleteSegment(idSegment);
    }
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

  const formatSegmentPoints = (coordinates) => {
    const returnCoordinates = [];
    coordinates.forEach((coordinate) => {
      returnCoordinates.push(coordinate.x);
      returnCoordinates.push(coordinate.y);
    });
    return returnCoordinates;
  };

  const log = () => {
    console.log("crossingPoints");
    console.log(crossingPoints);
    console.log("segments");
    console.log(segments);
    console.log("drawingSegment");
    console.log(drawingSegment);
  };

  const Menu = () => {
    const handleOptionChange = (e) => {
      setRadioButtonChecked(e.target.value);
    }
    return <div>
      <p>Select an action to do on the Map</p>
      <label> <input type="radio" name="action" value="1" checked={radioButtonChecked === "1"} onChange={handleOptionChange} /> Nothing </label>
      <label> <input type="radio" name="action" value="2" checked={radioButtonChecked === "2"} onChange={handleOptionChange} /> Add Crossing points </label>
      <label> <input type="radio" name="action" value="3" checked={radioButtonChecked === "3"} onChange={handleOptionChange} /> Delete Crossing points (to code) </label>
      <label> <input type="radio" name="action" value="4" checked={radioButtonChecked === "4"} onChange={handleOptionChange} /> Draw a segment </label>
      <label> <input type="radio" name="action" value="5" checked={radioButtonChecked === "5"} onChange={handleOptionChange} /> Delete a segment </label>
      <label> <input type="radio" name="action" value="6" checked={radioButtonChecked === "6"} onChange={handleOptionChange} /> Other stuff to code </label>
    </div>
  };

  return <>
    <label>Upload your Map image</label>
    <br />
    <input type="file" accept="image/*" onChange={handleImageUpload} />
    {errorUpload ? <h3>Invalid file uploaded</h3> :
      loaded ?
        <div>
          <Stage width={width} height={height} onClick={(e) => clickOnStage(e)}>
            <Layer>
              <Image image={image} />
              {segments.map(segment => <Line key={segment.id} points={formatSegmentPoints(segment.coordinates)} stroke="black" strokeWidth={radioButtonChecked === "5" ? 10 : 5}
                                        onClick={(e) => onClickSegment(e, segment.id)} />)}
              {drawingSegment !== false ? <Line points={formatSegmentPoints(drawingSegment.coordinates)} stroke="red" strokeWidth={radioButtonChecked === "5" ? 10 : 5}
                                          onClick={(e) => onClickDrawingSegment(e)} /> : null}
              {crossingPoints.map(crossingPoint => <Circle key={crossingPoint.id} id={crossingPoint.id} x={crossingPoint.x} y={crossingPoint.y} radius={10} draggable
                                                   fill={crossingPoint.isDragging ? "red" : "blue"}
                                                   onDragStart={(e) => onDragStartCrossingPoint(e, crossingPoint.id)}
                                                   onDragEnd={(e) => onDragEndCrossingPoint(e, crossingPoint.id)}
                                                   onClick={(e) => onClickCrossingPoint(e, crossingPoint.id)} />)}
            </Layer>
          </Stage>
          <Menu />
          <br />
          <button onClick={() => log()}>Log Data in Console</button>
        </div>
      : null}
  </>
};

export default Konva;
