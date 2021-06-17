import { useQuery, useQueryClient, useMutation } from 'react-query';
import apiObstacles from '../api/obstacles';
import { useStyles } from '../CustomCSS';
import Grid from '@material-ui/core/Grid';
import ObstacleValidCard from './obstacleValidCard'

const ValidateObstacles = ({ challenge }) => {
  const classes = useStyles();

  const { isLoading, data: events } = useQuery('events', () => apiObstacles.getAllObstaclesToValidate());

  return (
    <>
      <h2>Vos obstacles à valider</h2>
      <Grid container direction="row">
        {isLoading ? 'Chargement...' : !events ? "Vous n'avez pas d'obstacles à valider" :
          events.events.map(event => (
            <Grid key={event.id} item sm={3}>
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

  return (
    <Grid container direction="column">
      <div className={classes.obstacleParent}>
        <ObstacleValidCard event={event} />
      </div>
    </Grid>
  );
};

export default ValidateObstacles;
