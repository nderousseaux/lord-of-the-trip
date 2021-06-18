import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiUserChallenge from '../api/userChallenge';
import ChallengeCardAvailable from './challengeCardAvailable';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../CustomCSS';
// Fil d'ariane
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';


const ChallengesAvailable = () => {
  return <div>
    {/* <SubscribedChallenges /> */}
    <ChallengesAvailableList />
  </div>
};

const ChallengesAvailableList = () => {
  const queryClient = useQueryClient();
  const classes = useStyles();
  const history = useHistory();
  const { isLoading, isError, data: notSubscribedChallenges } = useQuery('notSubscribedChallenges', () => apiUserChallenge.getNotSubscribedChallenges());

  const subscribeChallenge = useMutation( (id) => apiUserChallenge.subscribeChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('subscribedChallenges');
      queryClient.invalidateQueries('notSubscribedChallenges');
    },
  });

  return <Grid container direction="column">    
    <Grid container direction="row">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" onClick={() => history.push(`/`)} className={classes.clickable}>
                Accueil
              </Link>
              <Link color="inherit" onClick={() => history.push(`/dashboard`)} className={classes.clickable}>
                Dashboard
              </Link>
              <Typography color="textPrimary">Challenges disponibles</Typography>
            </Breadcrumbs>
      </Grid>
    <div>
      <h1>A vous de jouer</h1>
      {isLoading ? 'Chargement...' : isError ? "Il n'y a aucun challenge auquel vous pouvez vous inscrire :(" :
        <Grid container direction="row">

            {notSubscribedChallenges.challenges.map(c => ( 
              <Grid key={c.id} item sm={3}>        
                <div className={classes.cardParent}>
                  <ChallengeCardAvailable challenge={c} />
                </div>
              </Grid>
            ))}
                  
        </Grid>
      }
    </div>
  </Grid>
};

export default ChallengesAvailable;
