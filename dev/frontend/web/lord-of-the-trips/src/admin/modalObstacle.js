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

const ModalObstacle = ({ obstacleObject, challengeId, openState, setOpenState }) => {
  const [radioValue, setRadioValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [description, setDescription] = useState(null);
  const [progress, setProgress] = useState(null);
  const [result, setResult] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    setLabel(obstacleObject.label);
    setDescription(obstacleObject.description);
    setProgress(obstacleObject.progress * 100);
    setResult(obstacleObject.result);
    setRadioValue(obstacleObject.question_type.toString());
  }, []);

  const updateObstacleMutation = useMutation( (obstacle) => apiObstacles.updateObstacle(obstacleObject.segmentId, obstacle, obstacleObject.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['obstacles', challengeId]);
      setOpenState(false);
    },
  });

  const closeModal = () => {
    setOpenState(false);
  };

  const handleSubmit = () => {
    const obstacle = {};
    obstacle.question_type = parseInt(radioValue);
    if(label) obstacle.label = label;
    if(description) obstacle.description = description;
    if(progress && progress >= 1 && progress <= 99) obstacle.progress = progress / 100; //Number.isInteger(parseFloat(progress))
    if(result) obstacle.result = result;
    updateObstacleMutation.mutate(obstacle);
  };

  return (
    <div>
      <Dialog open={openState} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Obstacle "{obstacleObject.label}"</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Type de l'obstacle</FormLabel>
            <RadioGroup row aria-label="position" name="position" value={radioValue} onChange={e => setRadioValue(e.target.value)}>
              <FormControlLabel value="0" control={<Radio />} label="Question" />
              <FormControlLabel value="1" control={<Radio />} label="Photo" />
            </RadioGroup>
          </FormControl>
          <hr />

          {radioValue === "0" ? <ObstacleQuestion updateObstacleMutation={updateObstacleMutation} label={label} setLabel={setLabel} description={description} setDescription={setDescription}
                                progress={progress} setProgress={setProgress} result={result} setResult={setResult} handleSubmit={handleSubmit} />
                              : null}
          {radioValue === "1" ? <ObstaclePhoto updateObstacleMutation={updateObstacleMutation} label={label} setLabel={setLabel} description={description} setDescription={setDescription}
                                progress={progress} setProgress={setProgress} handleSubmit={handleSubmit} />
                              : null}

        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const ObstacleQuestion = ({ updateObstacleMutation, label, setLabel, description, setDescription, progress, setProgress, result, setResult, handleSubmit }) => {

  return <>

    <form onSubmit={handleSubmit}>
      <DialogContentText>
        <b>Update information : </b>
      </DialogContentText>
      <TextField variant="outlined" margin="dense" type="text" label="New question" value={label} onChange={e => setLabel(e.target.value)} fullWidth />
      <TextField variant="outlined" margin="dense" type="text" label="New description" value={description} onChange={e => setDescription(e.target.value)} fullWidth />
      <TextField variant="outlined" margin="dense" type="number" label="New progress" value={progress} onChange={e => setProgress(e.target.value)} fullWidth
                 error={progress !== null && (progress < 1 || progress > 99) ? true : false} />
      <DialogContentText>Progress is the percentage of progress for the obstacle on the segment, accepted value is between 1 and 99</DialogContentText>
      <TextField variant="outlined" margin="dense" type="text" label="New result" value={result} onChange={e => setResult(e.target.value)} fullWidth />
    </form>
  </>
};

const ObstaclePhoto = ({ updateObstacleMutation, label, setLabel, description, setDescription, progress, setProgress, handleSubmit }) => {

  return <>
    <form onSubmit={handleSubmit}>
      <DialogContentText>
        <b>Update information : </b>
      </DialogContentText>
      <TextField variant="outlined" margin="dense" type="text" label="New question" value={label} onChange={e => setLabel(e.target.value)} fullWidth />
      <TextField variant="outlined" margin="dense" type="text" label="New description" value={description} onChange={e => setDescription(e.target.value)} fullWidth />
      <TextField variant="outlined" margin="dense" type="number" label="New progress" value={progress} onChange={e => setProgress(e.target.value)} fullWidth
                 error={progress !== null && (progress < 1 || progress > 99) ? true : false} />
      <DialogContentText>Progress is the percentage of progress for the obstacle on the segment, accepted value is between 1 and 99</DialogContentText>
    </form>
  </>
};

export default ModalObstacle;
