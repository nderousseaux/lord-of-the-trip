// Fonctions mathématiques de conversion

// Converti les degrés en radian (pour le dessin des cercles)
export const degToRad = (degrees) => {
  return degrees * Math.PI / 180;
};

// Donne les coordonnées de la pointe de la flèche d'un segment
// x1 et y1 : coordonnées du point avant celui de fin du segment
// x2 et y2 : coordonnées du point de passage de fin du segment
// radius : rayon du point de passage
export const coordinatesEndSegment = (x1, y1, x2, y2, radius) => {
  let dx = x2 - x1;
  let dy = y1 - y2;
  let angle = Math.atan2(dy, dx); // angle en radian
  let x = Math.cos(angle) * radius;
  let y = Math.sin(angle) * radius;
  return { x : x2 - x, y : y2 + y };
};

// Converti une valeur en pourcentage en une position en pixels
// exemple : une position de 0.7 sur une image de 800 pixels donne 560 pixels
export const percentToPixels = (percent, totalPixels) => {
  return percent * totalPixels;
};

// Converti une position en pixels en une valeur en pourcentage
// exemple : 560 pixels sur une image de 800 pixels donne une position de 0.7
export const pixelsToPercent = (pixels, totalPixels) => {
  return pixels / totalPixels;
};

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
