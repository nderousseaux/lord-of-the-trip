import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import Button from '@material-ui/core/Button';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const { isLoading, isError, error, data: challenges } = useQuery('challenges', () => apiChallenge.getAllChallenges());

  const deleteChallenge = useMutation( (id) => apiChallenge.deleteChallenge(id), {
    onSuccess: () => { queryClient.invalidateQueries('challenges') },
  });

  return <div>
    <h2>Admin Dashboard</h2>
    <CreateChallengeForm />
    <h3>Your challenges that you created</h3>
    {isLoading ? 'Loading...' : isError ? "You don't own any challenge, create one" :
      <ul>
        {challenges.challenges.map(c => (
          <li key={c.id}>
            {c.id} : {c.name} {' '}
            <Button onClick={() => history.push(`/editchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Edit</Button> {' '}
            <Button onClick={() => deleteChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#CB4335"}}>Delete</Button>
          </li>
        ))}
      </ul>
    }
  </div>
};

const CreateChallengeForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const history = useHistory();

  const createChallenge = useMutation( (challenge) => apiChallenge.createChallenge(challenge), {
    onError: (error) => {
      setError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('challenges')
      setName('');
      history.push(`/editchallenge/${data.id}`)
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    createChallenge.mutate({ name });
  };

  return (
    <div>
    <h3>Create a new challenge</h3>
      <form onSubmit={handleSubmit}>
        <label>Name : </label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} /> {' '}
        <Button onClick={handleSubmit} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Create</Button>
      </form>
      {error ? <p>{error.message}</p> : null}
    </div>
  );
};

export default AdminDashboard;
