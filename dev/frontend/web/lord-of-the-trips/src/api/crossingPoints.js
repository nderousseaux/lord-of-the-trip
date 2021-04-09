import { checkStatus, urlPrefix } from './fetchUtils';

const apiCrossingPoints = {

  getAllCrossingPoints: (challengeId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points`)
    .then(checkStatus)
    .then(res => res.json());
  },

  getCrossingPointById: (challengeId, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points/${crossingPointId}`)
    .then(checkStatus)
    .then(res => res.json());
  },

  createCrossingPoint: (challengeId, crossingPoint) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(crossingPoint)
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  updateCrossingPoint: ( challengeId, crossingPoint, crossingPointId ) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points/${crossingPointId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(crossingPoint)
    })
    .then(checkStatus);
  },

  modifyCrossingPoint: (challengeId, crossingPoint, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points/${crossingPointId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(crossingPoint)
    })
    .then(checkStatus);
  },

  deleteCrossingPoint: (challengeId, crossingPointId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/crossing-points/${crossingPointId}`, {
      method: 'DELETE',
    })
    .then(checkStatus);
  },

};

export default apiCrossingPoints;
