import { useState } from "react";
import { useQueryClient, useMutation } from 'react-query';
import apiCrossingPoints from '../api/crossingPoints';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalCrossingPoint = ({ crossingPointObject, challengeId, openState, setOpenState }) => {
  const [name, setName] = useState(null);
  const queryClient = useQueryClient();

  const updateCrossingPointMutation = useMutation( (crossingPoint) => apiCrossingPoints.updateCrossingPoint(challengeId, crossingPoint, crossingPointObject.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['crossingPoints', challengeId]);
      setOpenState(false);
    },
  });

  const closeModal = () => {
    setOpenState(false);
  };

  const handleSubmit = () => {
    updateCrossingPointMutation.mutate({ name: name });
  };

  return (
    <div>
      <Dialog open={openState} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Crossing Point</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogContentText>
              Current name : {crossingPointObject.name}
            </DialogContentText>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              type="text"
              label="New name"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
            />
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

export default ModalCrossingPoint;
