import { useParams, useHistory } from 'react-router-dom';

const EditMap = () => {
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

  return <>
    <h3>Edit Map</h3>

    <h3>Back to challenge</h3>
    <button onClick={() => history.push(`/editchallenge/${id}`)}>Edit Challenge</button>

    <h3>Back to home</h3>
    <button onClick={() => history.push("/")}>Home</button>
  </>
};

export default EditMap;
