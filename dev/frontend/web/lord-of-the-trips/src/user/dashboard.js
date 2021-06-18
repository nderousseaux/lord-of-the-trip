import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiUserChallenge from '../api/userChallenge';
import ChallengeCard from './challengeCard';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../CustomCSS';
import { dateString } from "../utils/utils";
// Fil d'ariane
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
//Tab
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MDEditor from '@uiw/react-md-editor';

const UserDashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  return <div>
    <Grid container direction="row">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" onClick={() => history.push(`/`)} className={classes.clickable}>
            Accueil
          </Link>
          <Typography color="textPrimary">Dashboard</Typography>
        </Breadcrumbs>
    </Grid>
    <SubscribedChallenges />
    <br></br>
    <FinishChallenges />
  </div>
};

const SubscribedChallenges = () => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const history = useHistory();
  const { isLoading, isError, data: subscribedChallenges } = useQuery('subscribedChallenges', () => apiUserChallenge.getSubscribedChallenges());

  const unsubscribeChallenge = useMutation( (id) => apiUserChallenge.unsubscribeChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('subscribedChallenges');
      queryClient.invalidateQueries('notSubscribedChallenges');
    },
  });

  return <Grid container direction="column">
    <div className={classes.boutonOne}>
      <Button onClick={() => history.push(`/ChallengesAvailable`)}size="large" variant="contained" color="primary" className={ `${classes.button} ${classes.colorPrimary}` }>Voir les challenges disponibles</Button>
    </div>
    <div>
      <h3>Vos challenges en cours</h3>
      {isLoading ? 'Chargement...' : isError ? "Vous n'êtes inscrit à aucun challenge :(" :

        <Grid container direction="row">
          {subscribedChallenges.challenges.map(c => (
            // Todo : sélectionnez qur ceux ayant une inscription en cours
              //{c.id} : {c.name} {' '}
              <Grid key={c.id} item sm={3}>
                  <div className={classes.cardParent}>
                    <ChallengeCard challenge={c} />

                    <Grid className={classes.cardBouton} container direction="row">
                      <Grid item lg={6}>
                        <Button onClick={() => history.push(`/viewsubscibedchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Voir</Button>
                      </Grid>
                      <Grid item lg={6}>
                        <Button onClick={() => unsubscribeChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#CB4335"}}>Se désinscrire</Button>
                      </Grid>
                    </Grid>
                  </div>
              </Grid>
             ))}
        </Grid>
      }
    </div>
  </Grid>
};

const FinishChallenges = () => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const history = useHistory();
  //const { isLoading, isError, data: notSubscribedChallenges } = useQuery('notSubscribedChallenges', () => apiUserChallenge.getNotSubscribedChallenges());
  const { isLoading, isError, data: subscribedChallenges } = useQuery('subscribedChallenges', () => apiUserChallenge.getSubscribedChallenges());

  return <div>
    <h3>Vos challenges accomplis</h3>
    {isLoading ? 'Chargement...' : isError ? "Il n'y a aucun challenge auquel vous pouvez vous inscrire :(" :


      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >


          <TableRow>
            <TableCell className={classes.tableLeft}>Nom</TableCell>
            <TableCell className={classes.tableDescr}>Description</TableCell>
            <TableCell className={classes.tableRight}>Fini le</TableCell>
            <TableCell className={classes.tableRight}>Temp passé</TableCell>
            <TableCell className={classes.tableRight}>Distance parcourue</TableCell>
            <TableCell className={classes.tableRight}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {subscribedChallenges.challenges.map(c => (

          // que ceux fini manque des champs
            <TableRow key={c.id}>
              <TableCell className={classes.tableLeft}>
                {c.name}
              </TableCell>
              <TableCell className={classes.tableDescr}>
                <MDEditor.Markdown source={c.description} />
              </TableCell>
              <TableCell className={classes.tableRight}>{dateString(c.start_date)}</TableCell>
              <TableCell className={classes.tableRight}> h </TableCell>
              <TableCell className={classes.tableRight}> km</TableCell>
              <TableCell className={classes.tableRight}>
              <Button onClick={() => history.push(`/viewFinishChallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Voir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    }
  </div>



};

export default UserDashboard;
