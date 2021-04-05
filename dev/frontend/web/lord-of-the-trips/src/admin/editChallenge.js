import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import apiChallenge from '../api/challenge';

const EditChallenge = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [scalling, setScalling] = useState(null);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const queryClient = useQueryClient();
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
    {isLoading ? 'Loading...' : isError ? error.message :
      <div>
        <h3>Edit challenge</h3>
        <form onSubmit={handleSubmit}>
          <p>Id : {challenge.id}</p>
          <p>
            <label>Name : {challenge.name}</label> <br />
            <label>New Name : </label> <input type="text" value={name} onChange={e => setName(e.target.value)} size="100" />
          </p>
          <p>
            <label>Description : </label> {challenge.description} <br />
            <label>New Description : </label> <textarea value={description} onChange={e => setDescription(e.target.value)} rows="5" cols="200" />
          </p>
          <p>
            <label>Scalling : {challenge.scalling}</label> <br />
            <label>New Scalling : </label> <input type="number" value={scalling} onChange={e => setScalling(e.target.value)} />
          </p>
          <button>Update</button>
        </form>
        {errorUpdate ? <p>{errorUpdate.message}</p> : null}
        { /* <p>Debug : {JSON.stringify(challenge)}</p> */ }
      </div>
    }
    <UploadMap />
    <h3>Back to home</h3>
    <Link to="/">
      <button>Home</button>
    </Link>
  </>
};

const UploadMap = () => {
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
    },
  });

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
    <h3>Upload the map of the challenge</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {errorUploadClient ? <h3>Client check : Invalid file uploaded</h3> : null}
      {errorUploadServer ? <h3>Server check : {errorUploadServer.message}</h3> : null}
      {successUpload ? <h3>Upload succeeded</h3> : null}
    </div>
  );
};

export default EditChallenge;
