import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import apiUserChallenge from '../api/userChallenge';
import Button from '@material-ui/core/Button';
import ChallengeInfo from './challengeInfo';
import ChallengeMap from './challengeMap';
import UserchallengeStatistical from './userchallengeStatistical'
import UserchallengeEvents from './userchallengeEvents'
import * as css from '../CustomCSS';

const ViewFinishChallenge = () => {
  let { id } = useParams();
  id = parseInt(id);

  const { isLoading, isError, error, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));

  return <>
    {isLoading ? 'Chargement...' : isError ? error.message : <>
      <div style={css.flexRow}>
        <ViewChallengeInfo challenge={challenge} />
        <ChallengeMap challenge={challenge} isAdmin={false} />
      </div>
    </> }
  </>
};

const ViewChallengeInfo = ({ challenge }) => {
  const queryClient = useQueryClient();
  const history = useHistory();

  return (
    <div style={css.flexLeft}>
      <ChallengeInfo challenge={challenge} />
      <hr />
      <div>
        <UserchallengeStatistical challenge={challenge} />
      </div>
      <div>
        <UserchallengeEvents challenge={challenge} />
      </div>
    </div>
  );
};

export default ViewFinishChallenge;
