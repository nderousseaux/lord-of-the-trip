import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalObstacle = ({ obstacleObject, openState, setOpenState }) => {

  const closeModal = () => {
    setOpenState(false);
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
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalObstacle;
