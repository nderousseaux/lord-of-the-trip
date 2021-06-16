import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiUserChallenge from '../api/userChallenge';
import ChallengeCardAvailable from './challengeCardAvailable';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../CustomCSS';

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
      <p>fil ariane</p>
    </Grid>
    <div>
      <h3>Les challenges disponibles</h3>
      {isLoading ? 'Chargement...' : isError ? "Il n'y a aucun challenge auquel vous pouvez vous inscrire :(" :
        <Grid container direction="row">

            {notSubscribedChallenges.challenges.map(c => ( 
              <Grid key={c.id} item lg={3}>        
                <div className={classes.cardParent}>
                  <ChallengeCardAvailable challenge={c} />
                </div>
              </Grid>
            ))}
                  
        </Grid>
      }
    </div>
  </Grid>

  // return <div>
  //   <h3>Challenges disponibles</h3>
  //   {isLoading ? 'Chargement...' : isError ? "Il n'y a aucun challenge auquel vous pouvez vous inscrire :(" :
  //     <Grid container direction="row">
  //     {notSubscribedChallenges.challenges.map(c => (
  //         //{c.id} : {c.name} {' '}
  //         <Grid key={c.id} item lg={3}>  
  //             <div className={classes.cardParent}>            
  //               <challengeCardDispo challenge={c} />      

  //               {/* <Grid className={classes.cardBouton} container direction="row">
  //                 <Grid item lg={6}>
  //                   <Button onClick={() => history.push(`/viewsubscibedchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Voir</Button> 
  //                 </Grid>
  //                 <Grid item lg={6}>
  //                   <Button onClick={() => unsubscribeChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#CB4335"}}>Se désinscrire</Button>
  //                 </Grid>
  //               </Grid> */}
  //             </div>
  //         </Grid>
  //         ))}
  //   </Grid>
  //     // <ul>
  //     //   {notSubscribedChallenges.challenges.map(c => (
  //     //     <li key={c.id}>
  //     //       {c.id} : {c.name} {' '}
  //     //       <Button onClick={() => history.push(`/viewnotsubscibedchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Voir</Button> {' '}
  //     //       <Button onClick={() => subscribeChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>S'inscire</Button>
  //     //     </li>
  //     //   ))}
  //     // </ul>
  //   }
  // </div>
};

export default ChallengesAvailable;
