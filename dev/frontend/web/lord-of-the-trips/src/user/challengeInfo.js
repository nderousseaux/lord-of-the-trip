import MDEditor from '@uiw/react-md-editor';
import { useStyles } from '../CustomCSS';
import { dateString } from "../utils/utils";
import Grid from '@material-ui/core/Grid';

const ChallengeInfo = ({ challenge }) => {
  const classes = useStyles();

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
      <h3>Informations du challenge</h3>
      <p>
        <b>Nom :</b>
        <p>{challenge.name}</p>
      </p>
      <p>
        <b>Description :</b> <br />
        <div className={classes.border}>
          <MDEditor.Markdown source={challenge.description} />
        </div>
      </p>
      <Grid container direction="row">
        <Grid item lg={3}>
          <div className={classes.margin5right}>
            <b>Fini le</b>
            <p>{challenge.end_date ? dateString(challenge.end_date) : "Durée illimitée"}</p>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={classes.margin5horizontal}>
            <b>Échelle</b>
            <p>{challenge.scalling} mètres</p>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={classes.margin5horizontal}>
            <b>Niveau</b>
            <p>{difficulty}</p>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={classes.margin5left}>
            <b>Longueur d'un pas</b>
            <p>{challenge.step_length * 100} cm</p>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ChallengeInfo;
