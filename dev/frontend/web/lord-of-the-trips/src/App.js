import React, { useState, useRef, useEffect } from 'react'
import CanvasExample from './canvas/canvasExample'
import CanvasStatic from './canvas/canvasStatic'
import image from './canvas/poudlard.jpg'
import thunder from './canvas/thunder.jpg'
import { degToRad, percentToPixels, pixelsToPercent } from './canvas/conversions.js'
//import image from './canvas/middleEarth.jpg'

// Trouver une librairie pour importer et dessiner sur des images
// https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutoriel_canvas/Utilisation_d'images
// https://developer.mozilla.org/fr/docs/Apprendre/JavaScript/Client-side_web_APIs/Drawing_graphics
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
// https://www.encyclopedie-hp.org/wp-content/uploads/sites/4/2014/07/poudlard-valentin.jpg

const CanvasClik = () => {
  const canvasRef = useRef(null)
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [coordinates, setCoordinates] = useState([]);

  // Initial useEffect to draw the image
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    initialDraw(context)
  }, [])

  // useEffect when the coordinates array change (user click)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    draw(context)
  }, [coordinates])

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
    ctx.strokeStyle = 'rgb(0, 0, 255)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    coordinates.forEach((value, index) => {
      if(index == 0) {
        ctx.moveTo(value.x, value.y);
      }
      else {
        ctx.lineTo(value.x, value.y);
      }
    });
    ctx.stroke();
  };

  const getMousePosition = (canvas, event) => {
    event.preventDefault();
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    addCoordinates(x, y);
  };

  const addCoordinates = (x, y) => {
      setCoordinates(current => [...current, { x, y }]);
  };

  return <canvas ref={canvasRef} width={width} height={height} onClick={(e) => getMousePosition(canvasRef.current, e)} />
}

const App = () => {

  return <div>
    <h1>Lord of the trips</h1>
    { /* <CanvasExample /> */ }
    <CanvasStatic />
    <CanvasClik />
  </div>
};

export default App;
