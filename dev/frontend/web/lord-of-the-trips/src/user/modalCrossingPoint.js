import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalCrossingPoint = ({ crossingPointObject, openState, setOpenState }) => {

  const closeModal = () => {
    setOpenState(false);
  };

  return (
    <div>
      <Dialog open={openState} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Crossing Point "{crossingPointObject.name}"</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Current information : </b> <br />
            - Name : {crossingPointObject.name}
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

export default ModalCrossingPoint;
