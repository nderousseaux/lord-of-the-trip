import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import Button from '@material-ui/core/Button';

const UserDashboard = () => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const { isLoading, isError, error, data: challenges } = useQuery('challenges', () => apiChallenge.getAllChallenges());

  const subscribeChallenge = useMutation( (id) => apiChallenge.subscribeChallenge(id), {
    onSuccess: () => { queryClient.invalidateQueries('challenges') },
  });

  const unsubscribeChallenge = useMutation( (id) => apiChallenge.unsubscribeChallenge(id), {
    onSuccess: () => { queryClient.invalidateQueries('challenges') },
  });

  return <div>
    <h2>User Dashboard</h2>
    <h3>Challenge List</h3>
    {isLoading ? 'Loading...' : isError ? error.message :
      <ul>
        {challenges.challenges.map(c => (
          <li key={c.id}>
            {c.id} : {c.name} {' '}
            <Button onClick={() => history.push(`/viewchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>View</Button> {' '}
            <Button onClick={() => subscribeChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Subscibe</Button> {' '}
            <Button onClick={() => unsubscribeChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Unsubscribe</Button>
          </li>
        ))}
      </ul>
    }
  </div>
};

export default UserDashboard;
