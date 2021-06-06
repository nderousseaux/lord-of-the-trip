import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import Button from '@material-ui/core/Button';

const AdminDashboard = () => {
  return <div>
    <h2>Admin Dashboard</h2>
    <CreateChallengeForm />
    <EditableChallenges />
    <PublishedChallenges />
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
      queryClient.invalidateQueries('editableChallenges');
      setName('');
      history.push(`/editchallenge/${data.id}`);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    createChallenge.mutate({ name: name, scalling: 1000 });
  };

  return <div>
    <h3>Create a new challenge</h3>
    <form onSubmit={handleSubmit}>
      <label>Name : </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} /> {' '}
      <Button onClick={handleSubmit} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Create</Button>
    </form>
    {error ? <p>{error.message}</p> : null}
  </div>
};

const EditableChallenges = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { isLoading, isError, data: editableChallenges } = useQuery('editableChallenges', () => apiChallenge.getEditableChallengesFromAdmin());

  const deleteChallenge = useMutation( (id) => apiChallenge.deleteChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('editableChallenges');
      queryClient.invalidateQueries('publishedChallenges');
    },
  });

  return <div>
    <h3>Your challenges Editable</h3>
    {isLoading ? 'Loading...' : isError ? "You have no editable challenge, create one" :
      <ul>
      {editableChallenges.challenges.map(c => (
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

const PublishedChallenges = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { isLoading, isError, data: publishedChallenges } = useQuery('publishedChallenges', () => apiChallenge.getPublishedChallengesFromAdmin());

  const duplicateChallenge = useMutation( (id) => apiChallenge.duplicateChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('editableChallenges');
      queryClient.invalidateQueries('publishedChallenges');
    },
  });

  return <div>
    <h3>Your challenges Published</h3>
    {isLoading ? 'Loading...' : isError ? "You have no published challenge" :
      <ul>
      {publishedChallenges.challenges.map(c => (
        <li key={c.id}>
          {c.id} : {c.name} {' '}
          <Button onClick={() => history.push(`/adminviewchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>View</Button> {' '}
          <Button onClick={() => duplicateChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Duplicate</Button>
        </li>
      ))}
      </ul>
    }
  </div>
};

export default AdminDashboard;
