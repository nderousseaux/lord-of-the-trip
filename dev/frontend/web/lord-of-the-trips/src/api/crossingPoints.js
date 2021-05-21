import { checkStatus, urlPrefix, getToken } from './fetchUtils';

const apiCrossingPoints = {

  getAllCrossingPoints: (challengeId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  getCrossingPointById: (challengeId, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points/${crossingPointId}`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  createCrossingPoint: (challengeId, crossingPoint) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(crossingPoint)
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  updateCrossingPoint: (challengeId, crossingPoint, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points/${crossingPointId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(crossingPoint)
    })
    .then(checkStatus);
  },

  modifyCrossingPoint: (challengeId, crossingPoint, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points/${crossingPointId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(crossingPoint)
    })
    .then(checkStatus);
  },

  deleteCrossingPoint: (challengeId, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points/${crossingPointId}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus);
  },

};

export default apiCrossingPoints;
