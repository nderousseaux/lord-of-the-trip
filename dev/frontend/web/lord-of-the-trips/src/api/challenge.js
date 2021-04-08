import { checkStatus, urlPrefix } from './fetchUtils';

const apiChallenge = {

  getAllChallenges: () => {
    return fetch(`${urlPrefix}/challenges`)
    .then(checkStatus)
    .then(res => res.json());
  },

  getChallengeById: (id) => {
    return fetch(`${urlPrefix}/challenges/${id}`)
    .then(checkStatus)
    .then(res => res.json());
  },

  createChallenge: (challenge) => {
    return fetch(`${urlPrefix}/challenges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(challenge)
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  updateChallenge: (id, challenge) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(challenge)
    })
    .then(checkStatus);
  },

  modifyChallenge: (id, challenge) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(challenge)
    })
    .then(checkStatus);
  },

  deleteChallenge: (id) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      method: 'DELETE',
    })
    .then(checkStatus);
  },


  downloadMap: (challengeId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/image`)
    .then(checkStatus)
    .then(res => res.blob());
  },

  uploadMap: (challengeId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${urlPrefix}/challenges/${challengeId}/image`, {
      method: 'POST',
      body: formData
    })
    .then(checkStatus);
  },
  

  setStartChallenge: (id, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "start_crossing_point_id": crossingPointId })
    })
    .then(checkStatus);
  },

  setEndChallenge: (id, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "end_crossing_point_id": crossingPointId })
    })
    .then(checkStatus);
  },

};

export default apiChallenge;
