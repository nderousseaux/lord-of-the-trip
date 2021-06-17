import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import Button from '@material-ui/core/Button';
import { useStyles } from '../CustomCSS';
import ValidateObstacles from './validateObstacles'
// Fil d'ariane
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// Tab import
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
//Table import
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MDEditor from '@uiw/react-md-editor';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminDashboard = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.roottab}>

      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" onClick={() => history.push(`/`)} className={classes.clickable}>
          Accueil
        </Link>
        <Typography color="textPrimary">DashBoard Administrateur</Typography>
      </Breadcrumbs>
    
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Challenges" {...a11yProps(0)} />
          <Tab label="Validez vos obstacles" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
          {/* <Button onClick={() => history.push(`/validateobstacles/`)} size="large" variant="contained" color="primary"
                  className={ `${classes.button} ${classes.colorPrimary}` }>Valider les obstacles</Button>
           */}
          <CreateChallengeForm />
          <EditableChallenges />
          <PublishedChallenges />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
           <ValidateObstacles />
      </TabPanel>
    </div>
  );
}

const CreateChallengeForm = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const history = useHistory();

  const createChallenge = useMutation( (challenge) => apiChallenge.createChallenge(challenge), {
    onError: (error) => {
      setError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('editableChallenges');
      setName('');
      history.push(`/editchallenge/${data.id}`);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    createChallenge.mutate({ name: name, scalling: 1000, level: 2, step_length: 0.80 });
  };

  return <div className={classes.textCenter}>
    <h2>Créer un nouveau challenge</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nom du Challenge" className={classes.inputChallenge} value={name} onChange={e => setName(e.target.value)} /> {' '}
      <Button onClick={handleSubmit} size="large" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Création</Button>
    </form>
    {error ? <p>{error.message}</p> : null}
  </div>
};

const EditableChallenges = () => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const history = useHistory();
  const { isLoading, isError, data: editableChallenges } = useQuery('editableChallenges', () => apiChallenge.getEditableChallengesFromAdmin());

  const deleteChallenge = useMutation( (id) => apiChallenge.deleteChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('editableChallenges');
      queryClient.invalidateQueries('publishedChallenges');
    },
  });

  return <div>
    <h3>Vos challenges en cours de création</h3>
    {isLoading ? 'Chargement...' : isError ? "Vous n'avez pas de challenge en cours de création, créé en un" :
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.tableAdminHead}>
            <TableRow>
              <TableCell className={classes.tableAdminheadStyle}>Nom</TableCell>
              <TableCell className={classes.tableAdminheadStyle}>Description</TableCell>
              <TableCell className={classes.tableAdminheadStyle} width="15%">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {editableChallenges.challenges.map(c => (
              <TableRow key={c.id}>
                <TableCell className={classes.tableLeft}>{c.name}</TableCell>
                <TableCell className={classes.tableDescr}> <MDEditor.Markdown source={c.description} /></TableCell>
                <TableCell className={classes.tableRight} width="15%">
                  <Button onClick={() => history.push(`/editchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Modifier</Button> {' '}
                  <Button onClick={() => deleteChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#CB4335"}}>Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>      
    }
  </div>
};

const PublishedChallenges = () => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const history = useHistory();
  const { isLoading, isError, data: publishedChallenges } = useQuery('publishedChallenges', () => apiChallenge.getPublishedChallengesFromAdmin());

  const duplicateChallenge = useMutation( (id) => apiChallenge.duplicateChallenge(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('editableChallenges');
      queryClient.invalidateQueries('publishedChallenges');
    },
  });

  return <div>
    <h3>Vos challenges publiés</h3>
    {isLoading ? 'Chargement...' : isError ? "Vous n'avez pas de challenge publié" :
      <TableContainer component={Paper}>
      <Table>
        <TableHead className={classes.tableAdminHead}>
          <TableRow>
            <TableCell className={classes.tableAdminheadStyle}>Nom</TableCell>
            <TableCell className={classes.tableAdminheadStyle}>Description</TableCell>
            <TableCell className={classes.tableAdminheadStyle}>Participants</TableCell>
            <TableCell className={classes.tableAdminheadStyle} width="15%">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {publishedChallenges.challenges.map(c => (
            <TableRow key={c.id}>
              <TableCell className={classes.tableLeft}>{c.name}</TableCell>
              <TableCell className={classes.tableDescr}> <MDEditor.Markdown source={c.description} /></TableCell>
              <TableCell className={classes.tableLeft} align="center">{c.nb_subscribers}</TableCell>
              <TableCell className={classes.tableRight} width="15%">
                <Button onClick={() => history.push(`/adminviewchallenge/${c.id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Voir</Button> {' '}
                <Button onClick={() => duplicateChallenge.mutate(c.id)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Dupliquer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>   
  }
  </div>
};

export default AdminDashboard;
