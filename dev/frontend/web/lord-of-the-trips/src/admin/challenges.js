import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';

const AdminChallenges = () => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const { isLoading, isError, error, data: challenges } = useQuery('challenges', () => apiChallenge.getAllChallenges());

  const deleteChallenge = useMutation( (id) => apiChallenge.deleteChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('challenges')
    },
  });

  return <>
    <CreateChallengeForm />
    <h3>Challenge List</h3>
    {isLoading ? 'Loading...' : isError ? error.message :
      <ul>
        {challenges.challenges.map(c => (
          <li key={c.id}>
            id : {c.id}, name : {c.name} {' '}
            <button onClick={() => history.push(`/editchallenge/${c.id}`)}>Edit</button> {' '}
            <button onClick={() => deleteChallenge.mutate(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    }
    <h3>Konva test</h3>
    <button onClick={() => history.push("/konva")}>Konva test</button>
  </>
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
        <button>Create</button>
      </form>
      {error ? <p>{error.message}</p> : null}
    </div>
  );
};

export default AdminChallenges;
