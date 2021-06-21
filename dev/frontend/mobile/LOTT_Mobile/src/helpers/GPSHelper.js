export const distanceTotale = (points) => {
    let dist = 0;
    for(let i = 0; i<points.length-1; i++){
        dist += distance(points[i].coords, points[i+1].coords);
    }
    return dist;
}


const distance = (a, b) => {
    

    let earth_radius = 6378137;
    let rlo1 = deg2rad(a.longitude);
    let rla1 = deg2rad(a.latitude);
    let rlo2 = deg2rad(b.longitude);
    let rla2 = deg2rad(b.latitude);
    let dlo = (rlo2 - rlo1) / 2;
    let dla = (rla2 - rla1) / 2;
    let q = (Math.sin(dla) * Math.sin(dla)) + Math.cos(rla1) * Math.cos(rla2) * (Math.sin(dlo) * Math.sin(dlo));
    let d = 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q));
    return (earth_radius * d);
}

const deg2rad = (deg) => {
    return deg * (Math.PI/180);
}