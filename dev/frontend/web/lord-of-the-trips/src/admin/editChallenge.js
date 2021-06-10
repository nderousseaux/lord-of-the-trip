import { useState, useRef, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import apiChallenge from '../api/challenge';
import Button from '@material-ui/core/Button';

const EditChallenge = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [scalling, setScalling] = useState(null);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [aMapUploaded, setAMapUploaded] = useState(false);
  const [newUpload, setNewUpload] = useState(false);
  const queryClient = useQueryClient();
  const history = useHistory();
  let { id } = useParams();
  id = parseInt(id);

  const { isLoading, isError, error, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));

  const updateChallenge = useMutation( (challenge) => apiChallenge.updateChallenge(id, challenge), {
    onError: (error) => {
      setErrorUpdate(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['challenge', id])
      setName('');
      setDescription('');
      setScalling('');
    },
  });

  const downloadMap = useMutation( () => apiChallenge.downloadMap(id), {
    onError: () => {
      setAMapUploaded(false);
    },
    onSuccess: () => {
      setAMapUploaded(true);
    },
  });

  // Check if a map is uploaded
  useEffect(() => {
    downloadMap.mutate();
  }, [newUpload]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrorUpdate(null);
    const challenge = {};
    if(name) challenge.name = name;
    if(description) challenge.description = description;
    if(scalling) challenge.scalling = scalling;
    updateChallenge.mutate(challenge);
  };

  return <>
    {isLoading ? 'Chargement...' : isError ? error.message :
      <div>
        <h3>Modifier le challenge {challenge.id}</h3>
        <form onSubmit={handleSubmit}>
          <p>
            <label>Nom : {challenge.name}</label> <br />
            <label>Nouveau Nom : </label> <input type="text" value={name} onChange={e => setName(e.target.value)} size="100" />
          </p>
          <p>
            <label>Description : </label> {challenge.description} <br />
            <label>Nouvelle Description : </label> <textarea value={description} onChange={e => setDescription(e.target.value)} rows="2" cols="200" />
          </p>
          <p>
            <label>Échelle : {challenge.scalling ? challenge.scalling : "0"} mètres</label> <br />
            <label>Nouvelle Échelle : </label> <input type="number" value={scalling} onChange={e => setScalling(e.target.value)} /> <br />
            <label>NB : L'échelle correspond à la longueur de la carte en mètres</label>
          </p>
          <Button onClick={handleSubmit} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Modifier le challenge</Button>
        </form>
        {errorUpdate ? <p>{errorUpdate.message}</p> : null}
      </div>
    }
    <hr />
    <UploadMap setNewUpload={setNewUpload}/>
    <hr />
    {aMapUploaded ? <> <DownloadMap newUpload={newUpload} setNewUpload={setNewUpload}/> <hr /> </> : null}
    {aMapUploaded ? <Button onClick={() => history.push(`/editmap/${id}`)} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Modifier la carte</Button> : null}
  </>
};

const UploadMap = ({ setNewUpload }) => {
  const [errorUploadClient, setErrorUploadClient] = useState(null);
  const [errorUploadServer, setErrorUploadServer] = useState(null);
  const [successUpload, setSuccessUpload] = useState(false);
  let { id } = useParams();
  id = parseInt(id);

  const uploadMap = useMutation( (file) => apiChallenge.uploadMap(id, file), {
    onError: (error) => {
      setErrorUploadServer(error);
    },
    onSuccess: () => {
      setSuccessUpload(true);
      setNewUpload(true);
    },
  });

  const hiddenFileInput = useRef(null);

  const handleImageUpload = e => {
    setErrorUploadClient(null);
    setErrorUploadServer(null);
    setSuccessUpload(false);
    const file = e.target.files[0];
    if (file) {
      let img = new window.Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = function() {
        uploadMap.mutate(file);
      };
      img.onerror = function() {
        setErrorUploadClient(true);
      };
    }
  };

  return (
    <div>
    <h3>Télécharger la carte du challenge</h3>
      <Button onClick={() => hiddenFileInput.current.click()} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Télécharger la carte</Button>
      <input ref={hiddenFileInput} type="file" accept="image/*" onChange={handleImageUpload} style={{ display:"none" }} />
      {errorUploadClient ? <h3>Fichier invalide</h3> : null}
      {errorUploadServer ? <h3>{errorUploadServer.message}</h3> : null}
      {successUpload ? <h3>Téléchargement réussi</h3> : null}
    </div>
  );
};

const DownloadMap = ({ newUpload, setNewUpload }) => {
  const [errorDownload, setErrorDownload] = useState(null);
  const [successDownload, setSuccessDownload] = useState(false);
  const [file, setFile] = useState(null);
  let { id } = useParams();
  id = parseInt(id);

  const downloadMap = useMutation( () => apiChallenge.downloadMap(id), {
    onError: (error) => {
      setErrorDownload(error);
    },
    onSuccess: (data) => {
      setFile(data);
      setSuccessDownload(true);
    },
  });

  const resetState = () => {
    setErrorDownload(null);
    setSuccessDownload(false);
    setFile(null);
  };

  const handleImageDownload = e => {
    resetState();
    downloadMap.mutate();
  };

  useEffect(() => {
    if(newUpload) {
      resetState();
      setNewUpload(false);
    }
  }, [newUpload]);

  return (
    <div>
    <h3>Afficher la carte du challenge</h3>
      <Button onClick={handleImageDownload} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Afficher la carte</Button> {' '}
      {successDownload ? <Button onClick={resetState} size="small" variant="contained" color="primary" style={{backgroundColor: "#1976D2"}}>Cacher la carte</Button> : null}
      {errorDownload ? <h3>{errorDownload.message}</h3> : null}
      {successDownload ? <p> <img src={window.URL.createObjectURL(file)} alt="map" /> </p> : null}
    </div>
  );
};

export default EditChallenge;
