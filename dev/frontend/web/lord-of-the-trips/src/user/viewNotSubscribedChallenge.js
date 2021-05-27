import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import apiUserChallenge from '../api/userChallenge';
import Button from '@material-ui/core/Button';
import ChallengeInfo from './challengeInfo';
import ChallengeMap from './challengeMap';

const flexCenter = {
  display: 'flex',
  justifyContent: 'center'
};

const flexRow = {
  display: 'flex',
  flexDirection: 'row'
};

const flexLeft = {
  width: '30%',
  marginRight: '5px'
};

const ViewNotSubscribedChallenge = () => {
  let { id } = useParams();
  id = parseInt(id);

  const { isLoading, isError, error, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));

  return <>
    {isLoading ? 'Loading...' : isError ? error.message : <>
      <div style={flexRow}>
        <ViewChallengeInfo challenge={challenge} />
        <ChallengeMap challenge={challenge} />
      </div>
    </> }
  </>
};

const ViewChallengeInfo = ({ challenge }) => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const subscribeChallenge = useMutation( (id) => apiUserChallenge.subscribeChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('subscribedChallenges');
      queryClient.invalidateQueries('notSubscribedChallenges');
      history.push(`/dashboard`);
    },
  });

  return (
    <div style={flexLeft}>
      <ChallengeInfo challenge={challenge} />
      <div style={flexCenter}>
        <Button onClick={() => subscribeChallenge.mutate(challenge.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Subscibe</Button> {' '}
      </div>
    </div>
  );
};

export default ViewNotSubscribedChallenge;
