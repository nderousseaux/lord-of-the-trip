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

// La distance entre 2 points en pixels
export const pixelsLengthBetweenTwoPoints = (startPoint, endPoint) => {
  let dx = endPoint.position_x - startPoint.position_x;
  let dy = endPoint.position_y - startPoint.position_y;
  let dx2 = dx * dx;
  let dy2 = dy * dy;
  return Math.sqrt(dx2 + dy2);
}

// La distance entre 2 points dans la réalité, avec l'échelle et la taille de la map en pixels en paramètre
export const realLengthBetweenTwoPoints = (startPoint, endPoint, scaling, width) => {
  let dx = endPoint.position_x - startPoint.position_x;
  let dy = endPoint.position_y - startPoint.position_y;
  let dx2 = dx * dx;
  let dy2 = dy * dy;
  let pixelsLength = Math.sqrt(dx2 + dy2);
  return pixelsLength * scaling / width;
}


export const dateString = (date) => {
  const pad = (s) => {
    return (s < 10) ? '0' + s : s;
  };
  var d = new Date(date);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
};

export const getEventLable = (event_type) => {

  let label;

  switch(event_type){
    case "1":
      label = "Départ du parcours";
      break;
    case "2":
      label = "Arrivée à la fin du parcours";
      break;
    case "3":
      label = "Déplacement";
      break;
    case "4":
      label = "Arrivée sur un obstacle";
      break;
    case "5":
      label = "Réponse à un obstacle";
      break;
    case "6":
      label = "Obstacle validée";
      break;
    case "7":
      label = "Refus de la réponse par un administrateur ou par le système";
      break;
    case "8":
      label = "Arrivée à un point de passage";
      break;
    case "9":
      label = "Choix d'un segment";
      break;
    default:
        return '';
  }   
  return label;

};