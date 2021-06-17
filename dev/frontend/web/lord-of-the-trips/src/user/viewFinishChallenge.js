import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import apiUserChallenge from '../api/userChallenge';
import Button from '@material-ui/core/Button';
import ChallengeInfo from './challengeInfo';
import ChallengeMap from './challengeMap';
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

  const unsubscribeChallenge = useMutation( (id) => apiUserChallenge.unsubscribeChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('subscribedChallenges');
      queryClient.invalidateQueries('notSubscribedChallenges');
      history.push(`/dashboard`);
    },
  });

  return (
    <div style={css.flexLeft}>
      <ChallengeInfo challenge={challenge} />
      <hr />
      <div>
        <h3>Vos statistiques</h3>
        <p>
          _______________________________<br />
          _______________________________<br />
          _______________________________
        </p>
      </div>
      <div>
        <h3>Historique de vos actions</h3>
        <p>
          _______________________________<br />
          _______________________________<br />
          _______________________________
        </p>
      </div>
    </div>
  );
};

export default ViewFinishChallenge;