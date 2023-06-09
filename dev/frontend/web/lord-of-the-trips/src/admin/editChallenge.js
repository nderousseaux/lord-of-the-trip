import { useState, useRef, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MDEditor from '@uiw/react-md-editor';
import { useStyles } from '../CustomCSS';

const EditChallenge = () => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [limitTime, setLimitTime] = useState(null);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [scalling, setScalling] = useState(null);
  const [level, setLevel] = useState(null);
  const [step_length, setStep_length] = useState(null);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [publishResponse, setPublishResponse] = useState(null);
  const queryClient = useQueryClient();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

  const { isLoading, isError, error, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));
  const { data: image } = useQuery(['image', id], () => apiChallenge.downloadMap(id));

  const updateChallenge = useMutation( (challenge) => apiChallenge.updateChallenge(id, challenge), {
    onError: (error) => {
      setErrorUpdate(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['challenge', id]);
    },
  });

  const updateChallengeAndEditMap = useMutation( (challenge) => apiChallenge.updateChallenge(id, challenge), {
    onError: (error) => {
      setErrorUpdate(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['challenge', id])
      history.push(`/editmap/${id}`);
    },
  });

  const publishChallenge = useMutation( (id) => apiChallenge.publishChallenge(id), {
    onError: (data) => {
      setPublishResponse(data);
    },
    onSuccess: (data) => {
      setPublishResponse(data);
    },
  });

  const updateChallengeAndPublish = useMutation( (challenge) => apiChallenge.updateChallenge(id, challenge), {
    onError: (error) => {
      setErrorUpdate(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['challenge', id]);
      publishChallenge.mutate(challenge.id);
    },
  });

  useEffect(() => {
    if(challenge) {
      setName(challenge.name);
      setDescription(challenge.description);
      if(challenge.start_date && challenge.end_date) setLimitTime(true);
      else setLimitTime(false);
      if(challenge.start_date) setStart_date(new Date(challenge.start_date));
      if(challenge.end_date) setEnd_date(new Date(challenge.end_date));
      setScalling(challenge.scalling);
      setLevel(challenge.level);
      setStep_length(challenge.step_length);
    }
  }, [challenge]);

  const dateString = (date) => {
    const pad = (s) => {
      return (s < 10) ? '0' + s : s;
    };
    var d = new Date(date);
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
  };

  // redirect = true -> Submit challenge form and then go to edit map
  // publish = true -> Submit challenge form and then publish challenge
  const handleSubmit = (redirect, publish) => {
    setErrorUpdate(null);
    setPublishResponse(null);
    const challengeObj = {};
    if(name) challengeObj.name = name;
    if(description) challengeObj.description = description;
    if(limitTime && start_date && end_date) {
      challengeObj.start_date = dateString(start_date);
      challengeObj.end_date = dateString(end_date);
    }
    else {
      challengeObj.start_date = null;
      challengeObj.end_date = null;
    }
    if(scalling && (scalling < 100 || scalling > 1000000)) return;
    else if(scalling) challengeObj.scalling = parseInt(scalling);
    if(level) challengeObj.level = parseInt(level);
    if(step_length && step_length < 0.30) return;
    else if(step_length) challengeObj.step_length = parseFloat(step_length);

    if(redirect) updateChallengeAndEditMap.mutate(challengeObj);
    else if(publish) updateChallengeAndPublish.mutate(challengeObj);
    else updateChallenge.mutate(challengeObj);
  };

  return <>
    {isLoading ? 'Chargement...' : isError ? error.message :
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
        <Grid container direction="row">
          <Grid item direction="column" lg={6}>
            <div className={classes.margin10right}>
              <h3>Modifier le challenge</h3>
              <form onSubmit={handleSubmit}>
                <TextField variant="outlined" margin="dense" type="text" label="Nom" value={name} onChange={e => setName(e.target.value)} fullWidth className={classes.margin15vertical} />
                <DialogContentText>Description</DialogContentText>
                <MDEditor height={350} value={description} onChange={setDescription} />
                <Grid container direction="row" className={classes.margin15vertical}>
                  <Grid item direction="column" lg={4}>
                    <div className={classes.margin10right}>
                      <FormControlLabel
                        control={<Switch checked={limitTime} onChange={e => setLimitTime(e.target.checked)} color="primary" />}
                        label="Challenge a durée limitée ?"
                      />
                    </div>
                  </Grid>
                  <Grid item direction="column" lg={8}>
                    <div className={classes.margin10left}>
                      <Box display={limitTime ? null : "none"}>
                        <Grid container direction="row">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item direction="column" lg={6}>
                              <div className={classes.margin10right}>
                                <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" label="Commence le" value={start_date} onChange={setStart_date}
                                                    minDate={new Date()} />
                              </div>
                            </Grid>
                            <Grid item direction="column" lg={6}>
                              <div className={classes.margin10left}>
                                <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" label="Fini le" value={end_date} onChange={setEnd_date}
                                                    minDate={start_date ? new Date(start_date).setDate(start_date.getDate() + 1) : new Date()} />
                              </div>
                            </Grid>
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Box>
                    </div>
                  </Grid>
                </Grid>
                <Grid container direction="row" className={classes.margin15vertical}>
                  <Grid item direction="column" lg={4}>
                    <div className={classes.margin10right}>
                      <TextField variant="outlined" margin="dense" type="number" label="Échelle" value={scalling} onChange={e => setScalling(e.target.value)} fullWidth
                                 helperText="L'échelle correspond à la longueur de la carte en mètres. Minimum 100 mètres, Maximum 1000000 mètres"
                                 error={scalling && (scalling < 100 || scalling > 1000000) ? true : false} />
                    </div>
                  </Grid>
                  <Grid item direction="column" lg={4}>
                    <div className={classes.margin10horizontal}>
                      <FormControl variant="outlined" margin="dense" fullWidth>
                        <InputLabel id="level"></InputLabel>
                        <Select labelId="level" value={level} onChange={e => setLevel(e.target.value)}>
                          <MenuItem value={1}>Facile</MenuItem>
                          <MenuItem value={2}>Normale</MenuItem>
                          <MenuItem value={3}>Difficile</MenuItem>
                        </Select>
                        <FormHelperText>La difficulté estimée du challenge</FormHelperText>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item direction="column" lg={4}>
                    <div className={classes.margin10left}>
                      <TextField variant="outlined" margin="dense" type="number" label="Longueur de pas" value={step_length} onChange={e => setStep_length(e.target.value)} fullWidth
                                 helperText="Longueur d'un pas en mètres pour le podomètre. 0.30 mètres minimum"
                                 error={step_length && step_length < 0.30 ? true : false} />
                    </div>
                  </Grid>
                </Grid>
              </form>
              {errorUpdate ? <p className={classes.colorErrorMessage}>{errorUpdate.message}</p> : null}
            </div>
          </Grid>
          <Grid item direction="column" lg={6}>
            <div className={classes.margin10left}>
              <UploadMap />
              <hr />
              <div className={classes.imageDiv}>
                {image ? <img src={window.URL.createObjectURL(image)} alt="map" className={classes.imageInDiv} /> : null}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item lg={4}>
            <div className={classes.contentCenterHorizontal}>
              <Button onClick={() => handleSubmit()} size="large" variant="contained" color="primary"
                      className={ `${classes.button} ${classes.colorPrimary} ${classes.margin15vertical}` }>Modifier le challenge</Button>
            </div>
          </Grid>
          <Grid item container lg={4}>
            <Grid item lg={12} className={classes.contentCenterHorizontal}>
              {publishResponse ?
                publishResponse.status === 'ok' ?
                  <p className={ `${classes.colorErrorMessage} ${classes.textCenter}` }>Challenge publié !</p>
                : publishResponse.status === 'ko graph' ?
                  <>
                    <p className={ `${classes.colorErrorMessage} ${classes.textCenter}` }>
                      Le parcours du challenge n'est pas valide {' '}
                      <Button onClick={() => handleSubmit(true)} size="large" variant="contained" color="primary"
                                       className={ `${classes.button} ${classes.colorPrimary} ${classes.margin15vertical}` }>Éditer le parcours</Button>
                    </p>
                  </>
                : publishResponse.status === 'ko challenge' ?
                  <p className={ `${classes.colorErrorMessage} ${classes.textCenter}` }>{publishResponse.data?.error?.message}</p>
                : null
              : null}
            </Grid>
            <Grid item lg={12} className={classes.contentCenterHorizontal}>
              {image ? <Button onClick={() => handleSubmit(false, true)} size="large" variant="contained" color="primary"
                               className={ `${classes.button} ${classes.colorPrimary} ${classes.margin15vertical}` }>Publier le challenge</Button> : null}
            </Grid>
          </Grid>
          <Grid item lg={4}>
            <div className={classes.contentCenterHorizontal}>
              {image ? <Button onClick={() => handleSubmit(true)} size="large" variant="contained" color="primary"
                               className={ `${classes.button} ${classes.colorPrimary} ${classes.margin15vertical}` }>Éditer le parcours</Button> : null}
            </div>
          </Grid>
        </Grid>
      </Grid>
    }
  </>
};

const UploadMap = () => {
  const classes = useStyles();
  const [errorUploadClient, setErrorUploadClient] = useState(null);
  const [errorUploadServer, setErrorUploadServer] = useState(null);
  const queryClient = useQueryClient();
  let { id } = useParams();
  id = parseInt(id);

  const uploadMap = useMutation( (file) => apiChallenge.uploadMap(id, file), {
    onError: (error) => {
      setErrorUploadServer(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['image', id]);
    },
  });

  const hiddenFileInput = useRef(null);

  const handleImageUpload = e => {
    setErrorUploadClient(null);
    setErrorUploadServer(null);
    const file = e.target.files[0];
    if (file) {
      let img = new window.Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = function() {
        uploadMap.mutate(file);
      };
      img.onerror = function() {
        setErrorUploadClient(true);
      };
    }
  };

  return (
    <div>
      <h3>Télécharger la carte du challenge</h3>
      <Button onClick={() => hiddenFileInput.current.click()} size="large" variant="contained" color="primary"
              className={ `${classes.button} ${classes.colorPrimary}` }>Télécharger la carte</Button>
      <input ref={hiddenFileInput} type="file" accept="image/*" onChange={handleImageUpload} style={{ display:"none" }} />
      {errorUploadClient ? <h3>Fichier invalide</h3> : null}
      {errorUploadServer ? <h3>{errorUploadServer.message}</h3> : null}
    </div>
  );
};

export default EditChallenge;
