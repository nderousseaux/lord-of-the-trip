import { useState } from "react";
import { useQueryClient, useMutation } from 'react-query';
import apiObstacles from '../api/obstacles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalObstacle = ({ obstacleObject, challengeId, openState, setOpenState }) => {
  const [label, setLabel] = useState(null);
  const [description, setDescription] = useState(null);
  const [progress, setProgress] = useState(null);
  const [nb_points, setNb_points] = useState(null);
  const [result, setResult] = useState(null);
  const queryClient = useQueryClient();

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
    if(label) obstacle.label = label;
    if(description) obstacle.description = description;
    if(progress && progress >= 1 && progress <= 99) obstacle.progress = progress / 100;
    if(nb_points && nb_points > 0 && Number.isInteger(parseFloat(nb_points))) obstacle.nb_points = nb_points;
    if(result) obstacle.result = result;
    updateObstacleMutation.mutate(obstacle);
  };

  return (
    <div>
      <Dialog open={openState} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Obstacle "{obstacleObject.label}"</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Current information : </b> <br />
            - Question : {obstacleObject.label} <br />
            - Description : {obstacleObject.description} <br />
            - Progress : {obstacleObject.progress * 100}% <br />
            - Number points : {obstacleObject.nb_points} <br />
            - Result : {obstacleObject.result}
          </DialogContentText>
          <hr />
          <form onSubmit={handleSubmit}>
            <DialogContentText>
              <b>Update information : </b>
            </DialogContentText>
            <TextField variant="outlined" margin="dense" type="text" label="New question" value={label} onChange={e => setLabel(e.target.value)} fullWidth />
            <TextField variant="outlined" margin="dense" type="text" label="New description" value={description} onChange={e => setDescription(e.target.value)} fullWidth />
            <TextField variant="outlined" margin="dense" type="number" label="New progress" value={progress} onChange={e => setProgress(e.target.value)} fullWidth
                       error={progress !== null && (progress < 1 || progress > 99) ? true : false} />
            <DialogContentText>Progress is the percentage of progress for the obstacle on the segment, accepted value is between 1 and 99</DialogContentText>
            <TextField variant="outlined" margin="dense" type="number" label="New number points" value={nb_points} onChange={e => setNb_points(e.target.value)} fullWidth
                       error={nb_points !== null && (nb_points <= 0 || !Number.isInteger(parseFloat(nb_points))) ? true : false} />
            <DialogContentText>Number of points for the obstacle, accepted value is a positive integer</DialogContentText>
            <TextField variant="outlined" margin="dense" type="text" label="New result" value={result} onChange={e => setResult(e.target.value)} fullWidth />
          </form>
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

export default ModalObstacle;
