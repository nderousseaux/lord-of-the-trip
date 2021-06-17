import { useQuery } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import Button from '@material-ui/core/Button';
import ChallengeMap from '../user/challengeMap';
import MDEditor from '@uiw/react-md-editor';
import { useStyles } from '../CustomCSS';
import { dateString } from "../utils/utils";
import * as css from '../CustomCSS';
import Grid from '@material-ui/core/Grid';
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

const AdminViewChallenge = () => {
  const classes = useStyles();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

  const { isLoading, isError, error, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));
  const { isLoading:isLoadingUser, isError:isErrorUser, error:errorUser, data: user } = useQuery(['user', id], () => apiChallenge.getAlllUsersChallenge(id));


  return <>   
    {isLoading ? 'Chargement...' : isError ? error.message : <>
      <Grid container direction="column">
        <Grid container direction="row">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" onClick={() => history.push(`/`)} className={classes.clickable}>
              Accueil
            </Link>
            <Link color="inherit" onClick={() => history.push(`/admindashboard`)} className={classes.clickable}>
              Dashboard Administrateur
            </Link>
            <Typography color="textPrimary">Modification d'un challenge</Typography>
          </Breadcrumbs>
        </Grid>
      <div>
          <div style={css.flexRow}>
            <div style={css.flexLeft}>
              <ChallengeInfo challenge={challenge} />
              {challenge.draft === true ?
              <div>
                <Button onClick={() => history.push(`/editchallenge/${challenge.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Modifier le challenge</Button> {' '}
                <Button onClick={() => history.push(`/editmap/${challenge.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Modifier la carte</Button>
              </div>
              : null }
            </div>
            <ChallengeMap challenge={challenge} isAdmin={true} />
          </div>
              
        
          {isLoadingUser ? 'Chargement...' : isErrorUser ? errorUser.message : <> 
            <div >
              <h2>Les joueurs inscrits</h2>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead className={classes.tableAdminHead}>
                    <TableRow>
                      <TableCell className={classes.tableAdminheadStyle}>Nom</TableCell>
                      <TableCell className={classes.tableAdminheadStyle}>pseudo</TableCell>
                      <TableCell className={classes.tableAdminheadStyle}>Mail</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.subscribers.map( s => (
                      <TableRow key={s.email}>
                        <TableCell className={classes.tableLeft}>{s.first_name } {' '} {s.last_name}</TableCell>
                        <TableCell className={classes.tableDescr}> {s.pseudo}</TableCell>
                        <TableCell className={classes.tableRight}>{s.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer> 
            </div>
          </> }
        </div>
      </Grid>
    </>}
  </>
};

const ChallengeInfo = ({ challenge }) => {
  const classes = useStyles();

  return (
    <>
      <h3>Informations du challenge</h3>
      <p>
        <b>Nom :</b>
        <p>{challenge.name}</p>
      </p>
      <p>
        <b>Description :</b> <br />
        <div className={classes.border}>
          <MDEditor.Markdown source={challenge.description} />
        </div>
      </p>
      <div style={css.flexRow}>
        <div style={css.flex25left}>
          <b>Fini le</b>
          <p>{dateString(challenge.end_date)}</p>
        </div>
        <div style={css.flex25mid}>
          <b>Échelle</b>
          <p>{challenge.scalling} mètres</p>
        </div>
        <div style={css.flex25mid}>
          <b>Niveau</b>
          <p>{challenge.level}</p>
        </div>
        <div style={css.flex25right}>
          <b>Longueur d'un pas</b>
          <p>{challenge.step_length * 100} cm</p>
        </div>
      </div>
    </>
  );
};

export default AdminViewChallenge;
