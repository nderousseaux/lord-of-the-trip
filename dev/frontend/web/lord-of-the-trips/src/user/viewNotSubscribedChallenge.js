import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import apiUserChallenge from '../api/userChallenge';
import Button from '@material-ui/core/Button';
import ChallengeInfo from './challengeInfo';
import ChallengeMap from './challengeMap';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../CustomCSS';

const ViewNotSubscribedChallenge = () => {
  const classes = useStyles();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

  const { isLoading, isError, error, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));

  return <>
    {isLoading ? 'Chargement...' : isError ? error.message : <>
      <Grid container direction="row">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" onClick={() => history.push(`/`)} className={classes.clickable}>
            Accueil
          </Link>
          <Link color="inherit" onClick={() => history.push(`/dashboard`)} className={classes.clickable}>
            Dashboard
          </Link>
          <Link color="inherit" onClick={() => history.push(`/ChallengesAvailable`)} className={classes.clickable}>
            Challenges disponibles
          </Link>
          <Typography color="textPrimary">Détails d'un challenge</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid container direction="row">
        <Grid item lg={4}>
          <div className={classes.margin5right}>
            <ViewChallengeInfo challenge={challenge} />
          </div>
        </Grid>
        <Grid item lg={8}>
          <div className={classes.margin5left}>
            <ChallengeMap challenge={challenge} isAdmin={false} />
          </div>
        </Grid>
      </Grid>
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
    <div>
      <ChallengeInfo challenge={challenge} />
      <Grid container justify="center">
        <Button onClick={() => subscribeChallenge.mutate(challenge.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Vous inscrire</Button> {' '}
      </Grid>
    </div>
  );
};

export default ViewNotSubscribedChallenge;
