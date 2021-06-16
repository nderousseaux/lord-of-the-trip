import { useStyles } from '../CustomCSS';
// import apiChallenge from '../api/challenge';
// import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const dateString = (date) => {
  const pad = (s) => {
    return (s < 10) ? '0' + s : s;
  };
  var d = new Date(date);
  return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
};

const ChallengeCardAvailable = ({ challenge }) => {

  let classes = useStyles();
  let history = useHistory();
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
          <p className={classes.cardDateText}> {dateString(challenge.start_date)} - {dateString(challenge.end_date)} </p> : <p className={classes.cardDateText}>Illimité</p>}   
      </div>
      <div >
        <p className={classes.descriptionCard}>{challenge.description}</p>
      </div>
      <div className={classes.cardBouton} container direction="row">
        <Button onClick={() => history.push(`/viewnotsubscibedchallenge/${challenge.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Voir les détails de ce challenge</Button>
      </div>
      <div >
        <p className={classes.peopleCard}> participants</p>
      </div>
    </>
  );
};

export default ChallengeCardAvailable;
