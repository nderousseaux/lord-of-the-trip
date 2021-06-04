import { useQuery } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import Button from '@material-ui/core/Button';
import ChallengeMap from '../user/challengeMap';
import * as css from '../CustomCSS';

const AdminViewChallenge = () => {
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

  const { isLoading, isError, error, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));

  return <>
    {isLoading ? 'Loading...' : isError ? error.message : <>
      <div style={css.flexRow}>
        <div style={css.flexLeft}>
          <ChallengeInfo challenge={challenge} />
          {challenge.draft === true ?
          <div>
            <Button onClick={() => history.push(`/editchallenge/${challenge.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Edit Challenge</Button> {' '}
            <Button onClick={() => history.push(`/editmap/${challenge.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Edit Map</Button>
          </div>
          : null }
        </div>
        <ChallengeMap challenge={challenge} isAdmin={true} />
      </div>
    </> }
  </>
};

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

export default AdminViewChallenge;
