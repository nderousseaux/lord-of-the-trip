const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

export function utcToString(dateString) {

  let date = new Date(dateString);

  let day = date.getDate();
  
  let month = monthNames[date.getMonth()];

  let year = date.getFullYear();
  
  return day + ' ' + month + ' ' + year;
}

//Renvoie le temp entre deux dates, en minutes, puis en heures
export function chrono(dateDebut, dateFin){

  let duree = Math.round((dateFin.getTime() - dateDebut?.getTime())/1000)
        
  let uniteDuree = "minute"

  let heure = "00";
  let minute = "00";
  let seconde = "00";
  seconde = duree%60 > 9 ? duree%60 : "0"+duree%60;
  minute = Math.trunc(duree/60) > 9 ? Math.trunc(duree/60) : "0"+ Math.trunc(duree/60);
  heure = Math.trunc(duree/3600) > 9 ? Math.trunc(duree/3600) : "0"+ Math.trunc(duree/3600);
  //Heures
  if (duree >= 3600) {
      uniteDuree = duree > 7199 ? "heures": "heure"
      return {duree: heure + ":" + minute, unitee: uniteDuree}
  }
  //minutes
  else {
      uniteDuree = duree > 119 ? "minutes": "minute"
      return {duree: minute + ":" + seconde, unitee: uniteDuree}
  }

}

export function timeFormat(duree){
        
  let uniteDuree = "minute"

  let heure = "00";
  let minute = "00";
  let seconde = "00";
  seconde = duree%60 > 9 ? duree%60 : "0"+duree%60;
  minute = Math.trunc(duree/60) > 9 ? Math.trunc(duree/60) : "0"+ Math.trunc(duree/60);
  heure = Math.trunc(duree/3600) > 9 ? Math.trunc(duree/3600) : "0"+ Math.trunc(duree/3600);
  //Heures
  if (duree >= 3600) {
      uniteDuree = duree > 7199 ? "heures": "heure"
      return {duree: heure + ":" + minute, unitee: uniteDuree}
  }
  //minutes
  else {
      uniteDuree = duree > 119 ? "minutes": "minute"
      return {duree: minute + ":" + seconde, unitee: uniteDuree}
  }

}