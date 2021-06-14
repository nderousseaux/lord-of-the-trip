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
