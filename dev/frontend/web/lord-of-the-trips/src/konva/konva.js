import React, { useState } from "react";
import { Stage, Layer, Image } from 'react-konva';

// Konva
// https://konvajs.org/
// https://konvajs.org/docs/index.html
// https://konvajs.org/docs/react/index.html

// Upload
// https://dev.to/asimdahall/client-side-image-upload-in-react-5ffc
// https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html

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

  const handleImageUpload = e => {
    setLoaded(false);
    setErrorUpload(false);
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

  return <>
    <label>Upload your Map image</label>
    <br />
    <input type="file" accept="image/*" onChange={handleImageUpload} />
    {errorUpload ? <h3>Invalid file uploaded</h3> :
      loaded ?
        <Stage width={width} height={height}>
          <Layer>
            <Image image={image} />
          </Layer>
        </Stage>
      : null}
  </>
}

export default Konva;
