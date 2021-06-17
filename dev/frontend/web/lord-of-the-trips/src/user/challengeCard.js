import { useStyles } from '../CustomCSS';
import apiChallenge from '../api/challenge';
import { useQuery } from 'react-query';
import logo from '../logo.png';
import { dateString } from "../utils/utils";

const ChallengeCard = ({ challenge }) => {

  let classes = useStyles();

  let { data: image } = useQuery(['image', challenge.id], () => apiChallenge.downloadMap(challenge.id));
  
  let difficulty;



  switch(challenge.level){
    case 1:
      difficulty = "Facile";
      break;
    case 2:
      difficulty = "Moyenne";
      break;
    case 3:
      difficulty = "Difficile";
      break;
    default:
      difficulty = "Inconnue";
  }

  return (
    <>

      <div className={classes.cardChildOne}  >
        <p className={classes.cardChildOneText01}>{challenge.name}</p>
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
        <p className={classes.infoCardText}> Temp passé </p>
      </div>
    </>
  );
};

export default ChallengeCard;
