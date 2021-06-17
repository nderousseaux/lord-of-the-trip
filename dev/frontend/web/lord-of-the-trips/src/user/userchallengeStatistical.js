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


import logo from '../logo.png';
import { dateString } from "../utils/utils";
import { colors } from '@material-ui/core';

const getIconMove =(move_type) => {

  switch(move_type){
    case 0:
      return < MdDirectionsWalk />;
      // difficulty = "Facile";
      // break;
    case 1:
      return < MdDirectionsRun />;
      // difficulty = "Facile";
      // break;
    case 0:
      return < MdDirectionsBike />;
    default:
      return '';
  }
}

const getTimeDayHour = (duration) => {
  
  let seconds = Math.round(duration) / 1000 ; // don't forget the second param

  let day     = Math.floor(seconds / 86400);
  let hours   = Math.floor((seconds - (day * 86400)) / 3600);
  let minutes = Math.floor((seconds - (hours * 3600)) / 60);

  let dayLetter = "";
  if (day > 0) {
    dayLetter = (day < 10 ? "0" + day : day) + "j "
  }

  let hoursLetter = "";
  if (hours > 0) {
    hoursLetter = (hours < 10 ? "0" + hours : hours) + "h "
  }

  let minutesLetter = "";
  if (minutes > 0) {
    minutesLetter = (minutes < 10 ? "0" + minutes : minutes) + "mn "
  }
  if (hours   < 0) {hours   = "0"+hours;}
  if (minutes < 0) {minutes = "0"+minutes;}
  if (seconds < 0) {seconds = "0"+seconds;}

  let time = dayLetter + hoursLetter + minutesLetter;

  return time;
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
  let seconds = Math.round(duration) / 1000 ;

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


const UserchallengeStatisticals = ({ challenge }) => {

  let classes = useStyles();

  const { isLoading, isError, error, data: statisticals } = useQuery(['statisticals', challenge.id], () => apiUserChallenge.getUserChallengeStatistical(challenge.id));

  return (
    <>

      <div >
        

        {isLoading ? 'Chargement...' : isError ? error.message : <> 
            <div >
            <h2>Vos statistiques</h2>
            <p>{getIconMove(statisticals.statistics.average_move_type)}</p>
            
            <p>{getdistance(statisticals.statistics.distance)}</p>

            <p>{getTimeDayHour(statisticals.statistics.time)}</p>
            <p>{getSpeed( statisticals.statistics.distance,statisticals.statistics.time) }</p>

              {/* <TableContainer component={Paper}>
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
                    
                  {statisticals.statistics
                      <TableRow key={st.average_move_type}>
                        <TableCell className={classes.tableLeft}>{getIconMove(st.average_move_type)}</TableCell>
                        <TableCell className={classes.tableDescr}> {getdistance(st.distance)}</TableCell>
                        <TableCell className={classes.tableRight}>{getTimeDayHour(st.time)}</TableCell>
                        <TableCell className={classes.tableRight}>{getSpeed(st.time, st.duration)}</TableCell>
                      </TableRow>
                    ))} 
                  </TableBody>
                </Table>
              </TableContainer>   */}
            </div>
          </> }
        {/* <p className={classes.cardChildOneText01}>{challenge.name}</p>
        <p className={classes.cardChildOneText02}> Difficulté : {difficulty}</p>
      </div>
      <div className={classes.cardDate}>
        {challenge.start_date ?
          <p className={classes.cardDateText}> {dateString(challenge.start_date)} - {dateString(challenge.end_date)} </p> : <p className={classes.cardDateText}>Durée illimitée</p>}   
      </div>
      <div className={classes.imageCard}>
        {image ? <img src={window.URL.createObjectURL(image)} alt="map" className={classes.imageInDiv} /> : <img src={logo} alt="map" className={classes.imageInDiv} />}
      </div>
      <div className={classes.infoCard}>
        <p className={classes.infoCardText}> Inscrit le </p>
        <p className={classes.infoCardText}> Distance parcourue </p>
        <p className={classes.infoCardText}> Temp passé </p> */}
      </div>
    </>
  );
};

export default UserchallengeStatisticals;
