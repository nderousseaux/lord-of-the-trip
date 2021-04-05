import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import apiChallenge from '../api/challenge';

const EditChallenge = () => {
  let { id } = useParams();
  id = parseInt(id);
  const { isLoading, isError, error, data: challenge } = useQuery(['challenge', id], () => apiChallenge.getChallengeById(id));

  return <>
    <h3>Back to home</h3>
    <Link to="/">
      <button>Home</button>
    </Link>
    {isLoading ? 'Loading...' : isError ? error.message :
      <h3>Edit challenge id : {challenge.id}, name : {challenge.name}</h3>
    }
  </>
};

export default EditChallenge;
