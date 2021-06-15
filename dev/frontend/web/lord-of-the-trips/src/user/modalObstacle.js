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
            <b>Informations actuel : </b> <br />
            {obstacleObject.question_type === 0 ? "- Obstacle de type Question" : obstacleObject.question_type === 1 ? "- Obstacle de type Photo" : null} <br />
            {obstacleObject.question_type === 0 ? "- Question" : obstacleObject.question_type === 1 ? "- Label" : null} : {obstacleObject.label} <br />
            - Description : {obstacleObject.description} <br />
            - Position sur le segment : {obstacleObject.progress * 100}% <br />
            {obstacleObject.question_type === 0 ? "- Réponse : " + obstacleObject.result : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalObstacle;
