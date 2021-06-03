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
        <div style={css.flex20left}>
          <b>End At</b>
          <p>{challenge.end_date}</p>
        </div>
        <div style={css.flex20mid}>
          <b>Scaling</b>
          <p>{challenge.scalling} meters</p>
          {/* (the width of the map do 1000 meters) */}
        </div>
        <div style={css.flex20mid}>
          <b>Level</b>
          <p>{challenge.level}</p>
        </div>
        <div style={css.flex20mid}>
          <b>In team</b>
          <p>...</p>
        </div>
        <div style={css.flex20right}>
          <b>Step lenght</b>
          <p>{challenge.step_length * 100} cm</p>
        </div>
      </div>
    </>
  );
};

export default ChallengeInfo;
