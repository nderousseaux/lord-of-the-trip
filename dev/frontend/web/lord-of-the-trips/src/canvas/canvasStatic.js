import React, { useState, useRef, useEffect } from 'react'
import image from '../images/poudlard.jpg'
import { degToRad } from '../utils/utils.js'

const CanvasStatic = () => {
  const canvasRef = useRef(null)
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    draw(context)
  }, [])

  const draw = (ctx) => {
    const img = new Image();
    // NB : l'image de Poudlard fait 800 de largeur et 570 de hauteur
    img.src = image;
    img.onload = function() {
      // J'enregistre la taille de l'image pour donner la largeur et la hauteur de l'image au canvas (dans le return)
      // On ne peut que savoir la taille de l'image si elle est chargé
      setWidth(img.width);
      setHeight(img.height);
      ctx.drawImage(img, 0, 0); // Dessine l'image

      // segments
      ctx.strokeStyle = 'rgb(0, 0, 255)'; // Change la couleur des segments
      ctx.lineWidth = 5; // Epaisseur des segments
      ctx.beginPath();
      ctx.moveTo(510, 420); // Début du segement
      ctx.lineTo(515, 350);
      ctx.lineTo(480, 300);
      ctx.lineTo(380, 270);
      ctx.stroke(); // Dessine le segement
      ctx.strokeStyle = 'rgb(255, 0, 0)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(380, 270);
      ctx.lineTo(470, 180);
      ctx.stroke();
      ctx.strokeStyle = 'rgb(0, 255, 0)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(470, 180);
      ctx.lineTo(350, 75);
      ctx.lineTo(245, 40);
      ctx.stroke();
      ctx.strokeStyle = '#D35400';
      ctx.beginPath();
      ctx.moveTo(245, 40);
      ctx.lineTo(160, 65);
      ctx.lineTo(140, 460);
      ctx.lineTo(340, 540);
      ctx.lineTo(520, 440);
      ctx.stroke();

      // Cercles
      ctx.fillStyle = '#00FF00';
      ctx.beginPath();
      ctx.arc(510, 420, 8, degToRad(0), degToRad(360), false); // (coordonné x, Coordonné y, rayon, ...)
      ctx.fill();
      ctx.fillStyle = '#808080';
      ctx.beginPath();
      ctx.arc(380, 270, 8, degToRad(0), degToRad(360), false);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(470, 180, 8, degToRad(0), degToRad(360), false);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(245, 40, 8, degToRad(0), degToRad(360), false);
      ctx.fill();
      ctx.fillStyle = '#FF0000';
      ctx.beginPath();
      ctx.arc(520, 440, 8, degToRad(0), degToRad(360), false);
      ctx.fill();
    };
  };

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default CanvasStatic;
