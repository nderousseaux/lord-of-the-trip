import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalSegment = ({ segmentObject, openState, setOpenState }) => {

  const closeModal = () => {
    setOpenState(false);
  };

  return (
    <div>
      <Dialog open={openState} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Segment "{segmentObject.name}"</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Informations actuel : </b> <br />
            - Nom : {segmentObject.name} <br />
            - Longueur du segment : {segmentObject.totalLength} mètres
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

export default ModalSegment;
