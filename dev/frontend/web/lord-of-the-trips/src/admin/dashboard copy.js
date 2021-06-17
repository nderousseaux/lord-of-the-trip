import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import Button from '@material-ui/core/Button';
import { useStyles } from '../CustomCSS';

const AdminDashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  return <div>
    <h2>Dashboard administrateur</h2>
    <Button onClick={() => history.push(`/validateobstacles/`)} size="large" variant="contained" color="primary"
            className={ `${classes.button} ${classes.colorPrimary}` }>Valider les obstacles</Button>
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
    createChallenge.mutate({ name: name, scalling: 1000, level: 2, step_length: 0.80 });
  };

  return <div>
    <h3>Créer un nouveau challenge</h3>
    <form onSubmit={handleSubmit}>
      <label>Nom : </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} /> {' '}
      <Button onClick={handleSubmit} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Créer</Button>
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
    <h3>Vos challenges en cours de création</h3>
    {isLoading ? 'Chargement...' : isError ? "Vous n'avez pas de challenge en cours de création, créé en un" :
      <ul>
      {editableChallenges.challenges.map(c => (
        <li key={c.id}>
          {c.id} : {c.name} {' '}
          <Button onClick={() => history.push(`/editchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Modifier</Button> {' '}
          <Button onClick={() => deleteChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#CB4335"}}>Supprimer</Button>
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
    <h3>Vos challenges publiés</h3>
    {isLoading ? 'Chargement...' : isError ? "Vous n'avez pas de challenge publié" :
      <ul>
      {publishedChallenges.challenges.map(c => (
        <li key={c.id}>
          {c.id} : {c.name} {' '}
          <Button onClick={() => history.push(`/adminviewchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Voir</Button> {' '}
          <Button onClick={() => duplicateChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Dupliquer</Button>
        </li>
      ))}
      </ul>
    }
  </div>
};

export default AdminDashboard;
