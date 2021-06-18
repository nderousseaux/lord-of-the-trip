import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import apiUserChallenge from '../api/userChallenge';
import Button from '@material-ui/core/Button';
import ChallengeInfo from './challengeInfo';
import ChallengeMap from './challengeMap';
import UserchallengeStatistical from './userchallengeStatistical'
import UserchallengeEvents from './userchallengeEvents'
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../CustomCSS';

const ViewFinishChallenge = () => {
  const classes = useStyles();
  let { id } = useParams();
  id = parseInt(id);

  const { isLoading, isError, error, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));

  return <>
    {isLoading ? 'Chargement...' : isError ? error.message : <>
      <Grid container direction="row">
        <Grid item lg={4}>
          <div className={classes.margin5right}>
            <ViewChallengeInfo challenge={challenge} />
          </div>
        </Grid>
        <Grid item lg={8}>
          <div className={classes.margin5left}>
            <ChallengeMap challenge={challenge} isAdmin={true} />
          </div>
        </Grid>
      </Grid>
      <div>
        <UserchallengeStatistical challenge={challenge} />
      </div>
      <div>
        <UserchallengeEvents challenge={challenge} />
      </div>
    </> }
  </>
};

const ViewChallengeInfo = ({ challenge }) => {
  const queryClient = useQueryClient();
  const history = useHistory();

  return (
    <div>
      <ChallengeInfo challenge={challenge} />
      <hr />
    </div>
  );
};

export default ViewFinishChallenge;
