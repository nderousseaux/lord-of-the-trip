import MDEditor from '@uiw/react-md-editor';
import { useStyles } from '../CustomCSS';
import * as css from '../CustomCSS';

const ChallengeInfo = ({ challenge }) => {
  const classes = useStyles();

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
      <div style={css.flexRow}>
        <div style={css.flex25left}>
          <b>Fini le</b>
          <p>{challenge.end_date}</p>
        </div>
        <div style={css.flex25mid}>
          <b>Échelle</b>
          <p>{challenge.scalling} mètres</p>
        </div>
        <div style={css.flex25mid}>
          <b>Niveau</b>
          <p>{challenge.level}</p>
        </div>
        <div style={css.flex25right}>
          <b>Longueur d'un pas</b>
          <p>{challenge.step_length * 100} cm</p>
        </div>
      </div>
    </>
  );
};

export default ChallengeInfo;
