import { checkStatus, urlPrefix, getToken } from './fetchUtils';

const apiChallenge = {

  getAllChallengesForSuperAdmin: () => {
    return fetch(`${urlPrefix}/challenges`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  getEditableChallengesFromAdmin: () => {
    return fetch(`${urlPrefix}/admin/challenges?draft=true`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  getPublishedChallengesFromAdmin: () => {
    return fetch(`${urlPrefix}/admin/challenges?draft=false`, {
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
    .then(res => {
      if (res.ok && res.status !== 204) {
        return res;
      }
      else {
        return res.json()
        .then(res => { throw new Error(res.error.message); });
      }
    })
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
    .then(response => {
      if(response.ok) {
        return {
          status: 'ok'
        }
      }
      else {
        return response.json().then(data => ({
          status: 'ko',
          data
        }))
      }
    })
  },

  duplicateChallenge: (id) => {
    return fetch(`${urlPrefix}/challenges/${id}/duplicate`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus);
  },

  publishChallenge: (id) => {
    return fetch(`${urlPrefix}/challenges/${id}/publish`, {
      method: 'PATCH',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(response => {
      if(response.ok) {
        return {
          status: 'ok'
        }
      }
      else {
        return response.json().then(data => {
          if(data?.error?.details) {
            return {
              status: 'ko graph',
              data
            }
          }
          else {
            return {
              status: 'ko challenge',
              data
            }
          }
        })
      }
    })
  },

};

export default apiChallenge;
