import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import apiUserChallenge from '../api/userChallenge';
import Button from '@material-ui/core/Button';
import ViewChallengeMap from './viewChallengeMap';

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

const flex20left = {
  width: '20%',
  marginRight: '5px'
};

const flex20mid = {
  width: '20%',
  margin: '0px 5px'
};

const flex20right = {
  width: '20%',
  marginLeft: '5px'
};

const ViewNotSubscribedChallenge = () => {
  let { id } = useParams();
  id = parseInt(id);

  const { isLoading, isError, error, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));

  return <>
    {isLoading ? 'Loading...' : isError ? error.message : <>
      <div style={flexRow}>
        <ViewChallengeInfo challenge={challenge} />
        <ViewChallengeMap challenge={challenge} />
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
      <h3>Challenge informations</h3>
      <p>
        <b>Name :</b>
        <p>{challenge.name}</p>
      </p>
      <p>
        <b>Description :</b> <br />
        <p>{challenge.description}</p>
      </p>
      <div style={flexRow}>
        <div style={flex20left}>
          <b>End At</b>
          <p>{challenge.end_date}</p>
        </div>
        <div style={flex20mid}>
          <b>Scaling</b>
          <p>{challenge.scalling} meters</p>
          {/* (the width of the map do 1000 meters) */}
        </div>
        <div style={flex20mid}>
          <b>Level</b>
          <p>{challenge.level}</p>
        </div>
        <div style={flex20mid}>
          <b>In team</b>
          <p>...</p>
        </div>
        <div style={flex20right}>
          <b>Step lenght</b>
          <p>{challenge.step_length * 100} cm</p>
        </div>
      </div>
      <div style={flexCenter}>
        <Button onClick={() => subscribeChallenge.mutate(challenge.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Subscibe</Button> {' '}
      </div>
    </div>
  );
};

export default ViewNotSubscribedChallenge;
