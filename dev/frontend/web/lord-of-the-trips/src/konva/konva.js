import React, { useState } from "react";
import { Stage, Layer, Image, Circle } from 'react-konva';

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

// TODO : Mettre un boutton pour dire si on veut ajouter des points de passage ou non
// Avec des conditions dans la fonction clickOnStage
// Exemple : if(addCrossingPointsButtonCHecked) addCrossingPoint(pos);

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

  const addCrossingPoint = (pos) => {
      setCrossingPoints(current => [...current, { id: 'un id', x: pos.x, y:pos.y }]);
      console.log(crossingPoints); // TODO : mettre un id unique pour chaque point
  };

  // Click on Canvas
  const clickOnStage = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    if(radioButtonChecked === "2") addCrossingPoint(pos);
    //else if(radioButtonChecked === "3") function for option 3
  };

  const Menu = () => {
    const handleOptionChange = (e) => {
      setRadioButtonChecked(e.target.value);
    }
    return <div>
      <p>Select an action to do on the Map</p>
      <label> <input type="radio" name="action" value="1" checked={radioButtonChecked === "1"} onChange={handleOptionChange} /> Nothing </label>
      <label> <input type="radio" name="action" value="2" checked={radioButtonChecked === "2"} onChange={handleOptionChange} /> Add Crossing points on click </label>
      <label> <input type="radio" name="action" value="3" checked={radioButtonChecked === "3"} onChange={handleOptionChange} /> Move Crossing points on click </label>
      <label> <input type="radio" name="action" value="4" checked={radioButtonChecked === "4"} onChange={handleOptionChange} /> Other stuff to code </label>
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
            {crossingPoints.map(crossingPoint => <Circle x={crossingPoint.x} y={crossingPoint.y} radius={10} fill="green" />)}
          </Layer>
        </Stage>
        <Menu />
      </div>
      : null}
  </>
}

export default Konva;
