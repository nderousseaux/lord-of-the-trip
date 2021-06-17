import { useStyles } from '../CustomCSS';
import apiObstacles from '../api/obstacles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useQueryClient, useMutation } from 'react-query';

const ObstacleValidCard = ({ event }) => {

  let classes = useStyles();

  const queryClient = useQueryClient();

  const validateObstacleMutation = useMutation( (eventId) => apiObstacles.validateObstacle(eventId), {
    onSuccess: () => { queryClient.invalidateQueries('events') },
  });

  const invalidateObstacleMutation = useMutation( (eventId) => apiObstacles.invalidateObstacle(eventId), {
    onSuccess: () => { queryClient.invalidateQueries('events') },
  });

  return (
    <>
      <div className={classes.obstacleImage}>
        <img src={`data:image/jpeg;base64,${event.response}`} alt="" className={classes.obstacleImageRadius} />
      </div>       
      <div className={classes.obstacleDiv}>
        <div className={classes.obstacleDivText}>
          <p className={classes.obstacleChildText01}>Tâche</p>
          <p className={classes.obstacleChildText02}>{event.obstacle.label}</p>
        </div>
        <div className={classes.obstacleDivText}>
          <p className={classes.obstacleChildText01}>Description</p>
          <p className={classes.obstacleChildText03}>{event.obstacle.description}</p>
        </div>
        <Grid container direction="row" className={classes.obstacleDiv}>
          <Grid item lg={6} className={classes.contentCenterHorizontal}>
            <Button onClick={() => validateObstacleMutation.mutate(event.id)} size="large" variant="contained" color="primary" alignItems="center" justify="center"
                    className={ `${classes.button} ${classes.colorPrimary}` }>Valider</Button>
          </Grid>
          <Grid item lg={6} className={classes.contentCenterHorizontal}>
            <Button onClick={() => invalidateObstacleMutation.mutate(event.id)} size="large" variant="contained" color="secondary" alignItems="center" justify="center"
                    className={ `${classes.button} ${classes.colorSecondary}` }>Refuser</Button>
          </Grid>
        </Grid>       
      </div>

        
    </>
  );
};

export default ObstacleValidCard;
