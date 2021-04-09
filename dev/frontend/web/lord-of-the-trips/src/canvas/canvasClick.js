import React, { useState, useRef, useEffect } from 'react'
import image from '../images/poudlard.jpg'
import { randomInt } from '../utils/utils.js'

// Canvas
// https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutoriel_canvas/Utilisation_d'images
// https://developer.mozilla.org/fr/docs/Apprendre/JavaScript/Client-side_web_APIs/Drawing_graphics
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const CanvasClick = () => {
  const canvasRef = useRef(null);
  // width of the image
  const [width, setWidth] = useState(0);
  // height of the image
  const [height, setHeight] = useState(0);
  // tell if the user can click on map
  const [isEditMode, setIsEditMode] = useState(false);
  // array of segments
  const [segments, setSegments] = useState([]);

  // Initial useEffect to draw the image
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    initialDraw(context)
  }, [])

  // useEffect when the segments array change (user click)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    draw(context)
  }, [segments])

  const initialDraw = (ctx) => {
    const img = new Image();
    img.src = image;
    img.onload = function() {
      setWidth(img.width);
      setHeight(img.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const draw = (ctx) => {
    ctx.lineWidth = 5;
    segments.forEach((segment) => {
      ctx.strokeStyle = segment.color;
      ctx.beginPath();
      segment.coordinates.forEach((coordinate, index) => {
        if(index === 0) {
          ctx.moveTo(coordinate.x, coordinate.y);
        }
        else {
          ctx.lineTo(coordinate.x, coordinate.y);
        }
      });
      ctx.stroke();
    });
  };

  const clickOnCanvas = (canvas, event) => {
    event.preventDefault();
    // do nothing if edit mode is off
    if(!isEditMode) return;
    // get coordinates of the click on the map
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    addCoordinates(x, y);
  };

  const addCoordinates = (x, y) => {
    setSegments(current => current.map(segment => {
      if(segment.isInDrawState === true) {
        const obj = segment;
        obj.coordinates.push({ x, y });
        return obj;
      }
      else {
        return segment;
      }
    }));
  };

  // check if a segment is in draw state
  const aSegmentInDrawState = () => {
    let ret = false;
    if(!(segments.length === 0)) {
      segments.forEach((segment) => {
        if(segment.isInDrawState === true) ret = true;
      });
    }
    return ret;
  };

  const drawSegment = () => {
    // Cancel the click on the draw segment button if there is currently one in draw state
    if(aSegmentInDrawState()) return;

    const newSegment = {
      id: segments.length + 1,
      isInDrawState: true,
      color: "rgb(" + randomInt(0,255) + ", " + randomInt(0,255) + ", " + randomInt(0,255) +")",
      coordinates: [],
    };
    setSegments(current => [...current, newSegment]);
    setIsEditMode(true);
  };

  const stopDrawing = () => {
    setSegments(current => current.map(segment => {
      if(segment.isInDrawState === true) {
        const obj = segment;
        obj.isInDrawState = false;
        return obj;
      }
      else {
        return segment;
      }
    }));
    setIsEditMode(false);
  };

  return <div>
    <canvas ref={canvasRef} width={width} height={height} onClick={(event) => clickOnCanvas(canvasRef.current, event)} />
    <br />
    <h1>Edit Mode is {isEditMode ? "On" : "Off"}</h1>
    {!isEditMode ? <button onClick={() => drawSegment()}>Draw a Segment</button> : <button onClick={() => stopDrawing()}>Stop Drawing</button>}
    <h3>Segments List :</h3>
    {segments.map(segment => <Segment segment={segment} />)}
  </div>
};

const Segment = ({segment}) => {

  return <ul>
    <li>Id : {segment.id}</li>
    <li>Color : {segment.color}</li>
    <li>isInDrawState : {segment.isInDrawState ? "True" : "False"}</li>
    <li>coordinates :
      <ul>
        {segment.coordinates.map(c => <li>{c.x}, {c.y}</li>)}
      </ul>
    </li>
  </ul>
};

export default CanvasClick;
