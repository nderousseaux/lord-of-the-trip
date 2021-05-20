import { checkStatus, urlPrefix, getToken } from './fetchUtils';

const apiChallenge = {

//getAllChallengesForSuperAdmin
  getAllChallenges: () => {
    return fetch(`${urlPrefix}/challenges`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  getChallengesFromAdmin: () => {
    return fetch(`${urlPrefix}/admin/challenges`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  getChallengeById: (id) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  createChallenge: (challenge) => {
    return fetch(`${urlPrefix}/challenges`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(challenge)
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  updateChallenge: (id, challenge) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(challenge)
    })
    .then(checkStatus);
  },

  modifyChallenge: (id, challenge) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(challenge)
    })
    .then(checkStatus);
  },

  deleteChallenge: (id) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus);
  },


  downloadMap: (challengeId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/image`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.blob());
  },

  uploadMap: (challengeId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${urlPrefix}/challenges/${challengeId}/image`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + getToken() },
      body: formData
    })
    .then(checkStatus);
  },


  setStartChallenge: (id, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "start_crossing_point_id": crossingPointId })
    })
    .then(checkStatus);
  },

  setEndChallenge: (id, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "end_crossing_point_id": crossingPointId })
    })
    .then(checkStatus);
  },

  verifyChallenge: (id) => {
    return fetch(`${urlPrefix}/challenges/${id}/verify`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  duplicateChallenge: (id) => {
    return fetch(`${urlPrefix}/challenges/${id}/duplicate`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus);
  },

};

export default apiChallenge;
