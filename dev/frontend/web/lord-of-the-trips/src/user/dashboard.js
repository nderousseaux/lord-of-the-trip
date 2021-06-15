import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiUserChallenge from '../api/userChallenge';
import Button from '@material-ui/core/Button';

const UserDashboard = () => {
  return <div>
    <h2>Dashboard utilisateur</h2>
    <SubscribedChallenges />
    <NotSubscribedChallenges />
  </div>
};

const SubscribedChallenges = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { isLoading, isError, data: subscribedChallenges } = useQuery('subscribedChallenges', () => apiUserChallenge.getSubscribedChallenges());

  const unsubscribeChallenge = useMutation( (id) => apiUserChallenge.unsubscribeChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('subscribedChallenges');
      queryClient.invalidateQueries('notSubscribedChallenges');
    },
  });

  return <div>
    <h3>Vos challenges</h3>
    {isLoading ? 'Chargement...' : isError ? "Vous n'êtes inscrit à aucun challenge :(" :
      <ul>
        {subscribedChallenges.challenges.map(c => (
          <li key={c.id}>
            {c.id} : {c.name} {' '}
            <Button onClick={() => history.push(`/viewsubscibedchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Voir</Button> {' '}
            <Button onClick={() => unsubscribeChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#CB4335"}}>Se désinscrire</Button>
          </li>
        ))}
      </ul>
    }
  </div>
};

const NotSubscribedChallenges = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { isLoading, isError, data: notSubscribedChallenges } = useQuery('notSubscribedChallenges', () => apiUserChallenge.getNotSubscribedChallenges());

  const subscribeChallenge = useMutation( (id) => apiUserChallenge.subscribeChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('subscribedChallenges');
      queryClient.invalidateQueries('notSubscribedChallenges');
    },
  });

  return <div>
    <h3>Challenges disponibles</h3>
    {isLoading ? 'Chargement...' : isError ? "Il n'y a aucun challenge auquel vous pouvez vous inscrire :(" :
      <ul>
        {notSubscribedChallenges.challenges.map(c => (
          <li key={c.id}>
            {c.id} : {c.name} {' '}
            <Button onClick={() => history.push(`/viewnotsubscibedchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Voir</Button> {' '}
            <Button onClick={() => subscribeChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>S'inscire</Button>
          </li>
        ))}
      </ul>
    }
  </div>
};

export default UserDashboard;
