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
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../CustomCSS';

const ViewFinishChallenge = () => {
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
          <Typography color="textPrimary">Détails d'un challenge fini</Typography>
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
