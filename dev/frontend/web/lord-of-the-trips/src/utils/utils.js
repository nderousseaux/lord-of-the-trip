// Fonctions mathématiques de conversion

// Converti les degrés en radian (pour le dessin des cercles)
export const degToRad = (degrees) => {
  return degrees * Math.PI / 180;
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