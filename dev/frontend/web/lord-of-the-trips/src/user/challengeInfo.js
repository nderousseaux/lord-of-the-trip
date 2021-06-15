import * as css from '../CustomCSS';

const ChallengeInfo = ({ challenge }) => {

  return (
    <>
      <h3>Informations du challenge</h3>
      <p>
        <b>Nom :</b>
        <p>{challenge.name}</p>
      </p>
      <p>
        <b>Description :</b> <br />
        <p>{challenge.description}</p>
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
