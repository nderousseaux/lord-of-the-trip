import { useQuery, useQueryClient, useMutation } from 'react-query';
import apiObstacles from '../api/obstacles';
import { useStyles } from '../CustomCSS';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const ValidateObstacles = ({ challenge }) => {
  const classes = useStyles();

  const { isLoading, data: events } = useQuery('events', () => apiObstacles.getAllObstaclesToValidate());

  return (
    <>
      <h2>Validation des obstacles</h2>
      <Grid container direction="row">
        {isLoading ? 'Chargement...' : !events ? "Vous n'avez pas d'obstacles à valider" :
          events.events.map(event => (
            <Grid key={event.id} item lg={3}>
              <Event event={event} />
            </Grid>
          ))
        }
      </Grid>
    </>
  );
};

const Event = ({ event }) => {
  const classes = useStyles();
  const queryClient = useQueryClient();

  const validateObstacleMutation = useMutation( (eventId) => apiObstacles.validateObstacle(eventId), {
    onSuccess: () => { queryClient.invalidateQueries('events') },
  });

  const invalidateObstacleMutation = useMutation( (eventId) => apiObstacles.invalidateObstacle(eventId), {
    onSuccess: () => { queryClient.invalidateQueries('events') },
  });

  return (
    <Grid container direction="column">
      <div className={classes.imageDiv}>
        <img src={`data:image/jpeg;base64,${event.response}`} alt="" className={classes.imageInDiv} />
      </div>
      <Grid container direction="row">
        <Grid item lg={6} className={classes.contentCenterHorizontal}>
          <Button onClick={() => validateObstacleMutation.mutate(event.id)} size="large" variant="contained" color="primary" alignItems="center" justify="center"
                  className={ `${classes.button} ${classes.colorPrimary}` }>Valider</Button>
        </Grid>
        <Grid item lg={6} className={classes.contentCenterHorizontal}>
          <Button onClick={() => invalidateObstacleMutation.mutate(event.id)} size="large" variant="contained" color="secondary" alignItems="center" justify="center"
                  className={ `${classes.button} ${classes.colorSecondary}` }>Refuser</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ValidateObstacles;
