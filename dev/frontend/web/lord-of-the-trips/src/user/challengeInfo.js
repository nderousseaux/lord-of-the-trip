import * as css from '../CustomCSS';

const ChallengeInfo = ({ challenge }) => {

  return (
    <>
      <h3>Challenge informations</h3>
      <p>
        <b>Name :</b>
        <p>{challenge.name}</p>
      </p>
      <p>
        <b>Description :</b> <br />
        <p>{challenge.description}</p>
      </p>
      <div style={css.flexRow}>
        <div style={css.flex25left}>
          <b>End At</b>
          <p>{challenge.end_date}</p>
        </div>
        <div style={css.flex25mid}>
          <b>Scaling</b>
          <p>{challenge.scalling} meters</p>
        </div>
        <div style={css.flex25mid}>
          <b>Level</b>
          <p>{challenge.level}</p>
        </div>
        <div style={css.flex25right}>
          <b>Step lenght</b>
          <p>{challenge.step_length * 100} cm</p>
        </div>
      </div>
    </>
  );
};

export default ChallengeInfo;
