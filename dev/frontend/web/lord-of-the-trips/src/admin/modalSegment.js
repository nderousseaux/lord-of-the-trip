import { useState } from "react";
import { useQueryClient, useMutation } from 'react-query';
import apiSegments from '../api/segments';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalSegment = ({ segmentObject, challengeId, openState, setOpenState }) => {
  const [name, setName] = useState(null);
  const queryClient = useQueryClient();

  const updateSegmentMutation = useMutation( (segment) => apiSegments.updateSegment(challengeId, segment, segmentObject.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['segments', challengeId]);
      setOpenState(false);
    },
  });

  const closeModal = () => {
    setOpenState(false);
  };

  const handleSubmit = () => {
    updateSegmentMutation.mutate({ name: name });
  };

  return (
    <div>
      <Dialog open={openState} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Segment "{segmentObject.name}"</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Current information : </b> <br />
            - Name : {segmentObject.name} <br />
            - Length of the segment : {segmentObject.totalLength} meters
          </DialogContentText>
          <hr />
          <form onSubmit={handleSubmit}>
            <DialogContentText>
              <b>Update name : </b>
            </DialogContentText>
            <TextField autoFocus variant="outlined" margin="dense" type="text" label="New name" value={name} onChange={e => setName(e.target.value)} fullWidth />
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

export default ModalSegment;
