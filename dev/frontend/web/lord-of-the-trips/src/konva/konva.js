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
  const [loaded, setLoaded] = useState(null);

  // array of crossing points
  const [crossingPoints, setCrossingPoints] = useState([]);
  // id of crossing points, increment when we add one
  const [idCrossingPoints, setIdCrossingPoints] = useState(1);
  // array of segments
  const [segments, setSegments] = useState([]);
  // id of segments, increment when we add one
  const [idSegments, setIdSegments] = useState(1);
  // Id to know the segment that is currently drawn, else false
  const [idDrawingSegment, setIdDrawingSegment] = useState(false);

  // Value of the radio button checked in the Menu component
  const [radioButtonChecked, setRadioButtonChecked] = useState("1"); // first radio button checked by default

  const handleImageUpload = e => {
    setErrorUpload(false);
    setLoaded(false);
    setCrossingPoints([]);
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
      setCrossingPoints(current => [...current, { id: idCrossingPoints, x: x, y: y }]);
      setIdCrossingPoints(id => id + 1);
  };

  const updateCrossingPoint = (e, idCrossingPoint) => {
    setCrossingPoints(current => current.map(cr => idCrossingPoint !== cr.id ? cr : {...cr, x: e.target.attrs.x, y: e.target.attrs.y}));
  };

  const updateSegment = (x, y) => {
    setSegments(current => current.map(segment => {
      if(idDrawingSegment === segment.id) {
        const obj = segment;
        obj.coordinates.push({ x: x, y: y });
        return obj;
      }
      else {
        return segment;
      }
    }));
  };

  // On Click on a crossing point
  const onMouseUpCrossingPoint = (e, idCrossingPoint) => {
    //Draw a segment if menu option "draw" checked
    if(radioButtonChecked === "4" && idDrawingSegment === false)
    {
      startDrawingNewSegment(e, idCrossingPoint);
    }
    else if(radioButtonChecked === "4" && idDrawingSegment !== false)
    {
      stopDrawingSegment(e, idCrossingPoint);
    }
  };

  const startDrawingNewSegment = (e, idCrossingPoint) => {
    const id = idSegments;
    setIdDrawingSegment(id);
    const newSegment = {
      id: id,
      coordinates: [{x: e.target.attrs.x, y: e.target.attrs.y}],
    };
    setIdSegments(id => id + 1);
    setSegments(current => [...current, newSegment]);
  }

  const stopDrawingSegment = (e, idCrossingPoint) => {
    updateSegment(e.target.attrs.x, e.target.attrs.y)
    setIdDrawingSegment(false);
  }

  const formatSegmentPoints = (coordinates) => {
    const returnCoordinates = [];
    coordinates.forEach((coordinate) => {
      returnCoordinates.push(coordinate.x);
      returnCoordinates.push(coordinate.y);
    });
    return returnCoordinates;
  }

  // Click on Canvas
  const clickOnStage = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    if(radioButtonChecked === "2")
    {
      addCrossingPoint(pos.x, pos.y);
    }
    // add Coordinates in the current drawn segment
    else if(radioButtonChecked === "4" && idDrawingSegment !== false)
    {
      updateSegment(pos.x, pos.y);
    }
    //else if(radioButtonChecked === "5") function for option 5
  };

  const log = () => {
    console.log("crossingPoints");
    console.log(crossingPoints);
    console.log("segments");
    console.log(segments);
  }

  const Menu = () => {
    const handleOptionChange = (e) => {
      setRadioButtonChecked(e.target.value);
    }
    return <div>
      <p>Select an action to do on the Map</p>
      <label> <input type="radio" name="action" value="1" checked={radioButtonChecked === "1"} onChange={handleOptionChange} /> Nothing </label>
      <label> <input type="radio" name="action" value="2" checked={radioButtonChecked === "2"} onChange={handleOptionChange} /> Add Crossing points on click </label>
      <label> <input type="radio" name="action" value="3" checked={radioButtonChecked === "3"} onChange={handleOptionChange} /> Move Crossing points on click </label>
      <label> <input type="radio" name="action" value="4" checked={radioButtonChecked === "4"} onChange={handleOptionChange} /> Draw a segment </label>
      <label> <input type="radio" name="action" value="5" checked={radioButtonChecked === "5"} onChange={handleOptionChange} /> Other stuff to code </label>
    </div>
  };

  return <>
    <label>Upload your Map image</label>
    <br />
    <input type="file" accept="image/*" onChange={handleImageUpload} />
    {errorUpload ? <h3>Invalid file uploaded</h3> :
      loaded ?
      <div>
        <Stage width={width} height={height} onClick={clickOnStage}>
          <Layer>
            <Image image={image} />
            {crossingPoints.map(crossingPoint => <Circle id={crossingPoint.id} x={crossingPoint.x} y={crossingPoint.y} radius={10} fill="green" draggable
                                                 onDragEnd={(e) => updateCrossingPoint(e, crossingPoint.id)}
                                                 onMouseUp={(e) => onMouseUpCrossingPoint(e, crossingPoint.id)} />)}
            {segments.map(segment => <Line points={formatSegmentPoints(segment.coordinates)} stroke="black" strokeWidth={5} />)}
          </Layer>
        </Stage>
        <Menu />
        <br />
        <button onClick={() => log()}>Log Data in Console</button>
      </div>
      : null}
  </>
}

export default Konva;
