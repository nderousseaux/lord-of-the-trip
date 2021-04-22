export const vitesseMoyenne = (points) => {
    let dist = distanceTotale(points);
    let temps = points[points.length-1].timestamp - points[0].timestamp;

    return dist/(temps/1000);
}

export const distanceTotale = (points) => {
    let dist = 0;
    for(let i = 0; i<points.length-1; i++){
        dist += distance(points[i].coords, points[i+1].coords);
    }
    return dist;
}

const distance = (a, b) => {
    

    earth_radius = 6378137;
    rlo1 = deg2rad(a.longitude);
    rla1 = deg2rad(a.latitude);
    rlo2 = deg2rad(b.longitude);
    rla2 = deg2rad(b.latitude);
    dlo = (rlo2 - rlo1) / 2;
    dla = (rla2 - rla1) / 2;
    q = (Math.sin(dla) * Math.sin(dla)) + Math.cos(rla1) * Math.cos(rla2) * (Math.sin(dlo) * Math.sin(dlo));
    d = 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q));
    return (earth_radius * d);
}

const deg2rad = (deg) => {
    return deg * (Math.PI/180);
}