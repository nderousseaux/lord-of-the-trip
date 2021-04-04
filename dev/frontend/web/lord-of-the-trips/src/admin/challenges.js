import { useQuery, useQueryClient, useMutation } from 'react-query';
import apiChallenge from '../api/challenge';

const AdminChallenges = () => {
  const { isLoading, isError, error, data: challenges } = useQuery('challenges', apiChallenge.getAllChallenges);
  const queryClient = useQueryClient();

  const mutation = useMutation(apiChallenge.deleteChallenge, {
    onSuccess: () => {
      queryClient.invalidateQueries('challenges')
    },
  });

  return <>
    <h3>Challenge List</h3>
    {isLoading ? 'Loading...' : isError ? error.message :
      <ul>
        {challenges.challenges.map(c => (
          <li key={c.id}>
            id : {c.id}, name : {c.name}
            <button onClick={() => mutation.mutate(c.id)}>Remove</button>
          </li>
        ))}
      </ul>
    }
  </>
};

export default AdminChallenges;
