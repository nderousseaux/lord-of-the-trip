import { useQuery } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../../api/challenge';
import Button from '@material-ui/core/Button';
import ChallengeInfo from './challengeInfo';
import ChallengeMap from './challengeMap';
import * as css from '../../CustomCSS';

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
        <ChallengeMap challenge={challenge} />
      </div>
    </> }
  </>
};

export default AdminViewChallenge;
