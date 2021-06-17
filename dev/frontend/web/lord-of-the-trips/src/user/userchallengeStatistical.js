import { useStyles } from '../CustomCSS';
import apiUserChallenge from '../api/userChallenge';
import { useQuery } from 'react-query';
import { MdDirectionsWalk, MdDirectionsRun, MdDirectionsBike } from "react-icons/md";
//Tab
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const getIconMove =(move_type) => {

  switch(move_type){
    case 0:
      return < MdDirectionsWalk />;
    case 1:
      return < MdDirectionsRun />;
    case 2:
      return < MdDirectionsBike />;
    default:
      return '';
  }
}

const getMove =(move_type) => {
  if (move_type = "0"){
    return "Marche";
  }

  if (move_type = "1"){
    return "Vélo";
  }

  if (move_type = "3"){
    return "Course";
  }
}

const getTimeDayHour = (duration) => {
  
  let seconds = Math.round(duration / 1000)  ; // don't forget the second param

  if (seconds > 60){
    let day     = Math.floor(seconds / 86400);
    let hours   = Math.floor((seconds - (day * 86400)) / 3600);
    let minutes = Math.floor((seconds - ((hours * 3600) + (day * 86400))) / 60);
  
    let dayLetter = "";
      if (day > 0) {
        dayLetter = (day < 10 ? "0" + day : day) + "j ";
      }
    
      let hoursLetter = "";
      if (hours > 0) {
        hoursLetter = (hours < 10 ? "0" + hours : hours) + "h ";
      }
    
      let minutesLetter = "";
      if (minutes > 0) {
        minutesLetter = (minutes < 10 ? "0" + minutes : minutes) + "mn ";
      }
    
      if (hours   < 0) {hours   = "0"+hours;}
      if (minutes < 0) {minutes = "0"+minutes;}
      if (seconds < 0) {seconds = "0"+seconds;}
    
      let time = dayLetter + hoursLetter + minutesLetter;
    
      return time;
  } else {
    return seconds + " s";
  }

}

const getdistance = (distance) => {
    
    let distanceFormat, unitee;
    let distanceInt = parseInt(distance);

    if (Math.round(distanceInt).toString().length > 2 ){
        distanceFormat = Math.round(Math.round(distanceInt)/100)/10
        unitee = 'km'
      }
      else {
        distanceFormat = Math.round(distanceInt)
        unitee = 'm'
      }

    return distanceFormat + " " + unitee
}

const roundToTwo = (num) => {
  return +(Math.round(num + "e+2")  + "e-2");
}

const getSpeed = (distance,duration) => {

  let speedFormat, distanceFormat, unitee;
  let seconds = Math.round(duration / 1000) ;

  if (Math.round(distance) >= 1000 ){
    distanceFormat = (Math.round(Math.round(distance)/100)/10) / (Math.round(seconds / 3600));
    unitee = 'km/h';
  }
  else {
    speedFormat = Math.round(distance) / Math.round(seconds);
    unitee = 'm/s';
  }

  // speedFormat = Math.round(speedFormat);
  let speedFormat2 = roundToTwo(speedFormat);
  // speedFormat = Math.round(speedFormat+'e'+decimals)+'e-'+decimals;

  return speedFormat2 + " " + unitee

}

const getJsonresult = (results) => {

  let table = []

  for (const [key, value] of Object.entries(results)) {

    table.push(<TableRow key={key}>
    <TableCell >{getMove(key)}</TableCell>
    <TableCell > {getdistance(value.distance)}</TableCell>
    <TableCell >{getTimeDayHour(value.time)}</TableCell>
    <TableCell >{getSpeed(value.distance, value.time)}</TableCell>
  </TableRow>)


  }
  return table;
}

const UserchallengeStatisticals = ({ challenge }) => {

  let classes = useStyles();
  let key, value;

  const { isLoading, isError, error, data: statisticals } = useQuery(['statisticals', challenge.id], () => apiUserChallenge.getUserChallengeStatistical(challenge.id));

  return (
    <>

      <div >       

        {isLoading ? 'Chargement...' : isError ? "Vous n'avez pas de statistiques sur ce challenge" : <> 
            <div >
            <h2>Vos statistiques</h2>
            
            <p>{getIconMove(statisticals.statistics.average_move_type)}</p>            
            <p>{getdistance(statisticals.statistics.distance)}</p>
            <p>{getTimeDayHour(statisticals.statistics.time)}</p>
            <p>{getSpeed( statisticals.statistics.distance,statisticals.statistics.time) }</p>

            <TableContainer component={Paper}>
                <Table>
                  <TableHead className={classes.tableAdminHead}>
                    <TableRow>
                      <TableCell className={classes.tableAdminheadStyle}>Mode</TableCell>
                      <TableCell className={classes.tableAdminheadStyle}>Distance parcourue</TableCell>
                      <TableCell className={classes.tableAdminheadStyle}>Temp passé</TableCell>
                      <TableCell className={classes.tableAdminheadStyle}>Vitesse</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getJsonresult(statisticals.statistics.results)}
                  </TableBody>
              </Table>
              </TableContainer> 
            </div>
          </> }

      </div>
    </>
  );
};

export default UserchallengeStatisticals;
