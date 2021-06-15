import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from 'react-query';
import apiObstacles from '../api/obstacles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useStyles } from '../CustomCSS';

const ModalObstacle = ({ obstacleObject, challengeId, openState, setOpenState }) => {
  const [radioValue, setRadioValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [description, setDescription] = useState(null);
  const [progress, setProgress] = useState(null);
  const [result, setResult] = useState(null);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    setLabel(obstacleObject.label);
    setDescription(obstacleObject.description);
    setProgress(Math.trunc(obstacleObject.progress * 100));
    setResult(obstacleObject.result);
    setRadioValue(obstacleObject.question_type.toString());
  }, []);

  const updateObstacleMutation = useMutation( (obstacle) => apiObstacles.updateObstacle(obstacle, obstacleObject.id), {
    onError: (error) => {
      setErrorUpdate(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['obstacles', challengeId]);
      setOpenState(false);
    },
  });

  const closeModal = () => {
    setOpenState(false);
  };

  const handleSubmit = () => {
    setErrorUpdate(null);
    const obstacle = {};
    obstacle.question_type = parseInt(radioValue);
    if(label) obstacle.label = label;
    if(description) obstacle.description = description;
    if(progress && (progress < 1 || progress > 99 || !Number.isInteger(parseFloat(progress)))) return;
    else if(progress) obstacle.progress = progress / 100;
    if(parseInt(radioValue) === 0 && result) obstacle.result = result;
    updateObstacleMutation.mutate(obstacle);
  };

  return (
    <div>
      <Dialog open={openState} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Obstacle "{obstacleObject.label}"</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Type de l'obstacle</FormLabel>
            <RadioGroup row value={radioValue} onChange={e => setRadioValue(e.target.value)}>
              <FormControlLabel value="0" control={<Radio />} label="Question" />
              <FormControlLabel value="1" control={<Radio />} label="Photo" />
            </RadioGroup>
          </FormControl>
          <hr />

          {radioValue === "0" ? <ObstacleQuestion updateObstacleMutation={updateObstacleMutation} label={label} setLabel={setLabel} description={description} setDescription={setDescription}
                                progress={progress} setProgress={setProgress} result={result} setResult={setResult} handleSubmit={handleSubmit} errorUpdate={errorUpdate} />
                              : null}
          {radioValue === "1" ? <ObstaclePhoto updateObstacleMutation={updateObstacleMutation} label={label} setLabel={setLabel} description={description} setDescription={setDescription}
                                progress={progress} setProgress={setProgress} handleSubmit={handleSubmit} errorUpdate={errorUpdate} />
                              : null}

        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const ObstacleQuestion = ({ updateObstacleMutation, label, setLabel, description, setDescription, progress, setProgress, result, setResult, handleSubmit, errorUpdate }) => {
  const classes = useStyles();

  return <>
    <form onSubmit={handleSubmit}>
      <DialogContentText>
        <b>Obstacle de type Question</b>
      </DialogContentText>
      <TextField variant="outlined" margin="dense" type="text" label="Question" value={label} onChange={e => setLabel(e.target.value)} fullWidth />
      <TextField variant="outlined" margin="dense" type="text" label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth />
      <TextField variant="outlined" margin="dense" type="text" label="Réponse" value={result} onChange={e => setResult(e.target.value)} fullWidth className={classes.margin20bottom} />
      <Typography>
        Position sur le segment
      </Typography>
      <Slider value={progress} step={10} min={10} max={90} marks
              valueLabelDisplay="auto" onChange={(e, val) => setProgress(val)} />
      <DialogContentText>Position sur le segment : valeur en pourcentage qui représente la distance de l'obstacle sur le segment, les valeurs peuvent être les nombres entiers de 10 à 90</DialogContentText>
      {errorUpdate ? <p style={{color: 'red'}}>{errorUpdate.message}</p> : null}
    </form>
  </>
};

const ObstaclePhoto = ({ updateObstacleMutation, label, setLabel, description, setDescription, progress, setProgress, handleSubmit, errorUpdate }) => {
  const classes = useStyles();

  return <>
    <form onSubmit={handleSubmit}>
      <DialogContentText>
        <b>Obstacle de type Photo</b>
      </DialogContentText>
      <TextField variant="outlined" margin="dense" type="text" label="Label" value={label} onChange={e => setLabel(e.target.value)} fullWidth />
      <TextField variant="outlined" margin="dense" type="text" label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth className={classes.margin20bottom}/>
      <Typography>
        Position sur le segment
      </Typography>
      <Slider value={progress} step={10} min={10} max={90} marks
              valueLabelDisplay="auto" onChange={(e, val) => setProgress(val)} />
      <DialogContentText>Position sur le segment : valeur en pourcentage qui représente la distance de l'obstacle sur le segment, les valeurs peuvent être les nombres entiers de 10 à 90</DialogContentText>
      {errorUpdate ? <p style={{color: 'red'}}>{errorUpdate.message}</p> : null}
    </form>
  </>
};

export default ModalObstacle;
