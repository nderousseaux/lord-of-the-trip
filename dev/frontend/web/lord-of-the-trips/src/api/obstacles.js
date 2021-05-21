import { checkStatus, urlPrefix, getToken } from './fetchUtils';

const apiObstacles = {

  getAllObstacles: (challengeId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/obstacles`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  getObstaclesBySegment: (segmentId) => {
    return fetch(`${urlPrefix}/segments/${segmentId}/obstacles`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  getObstacleById: (segmentId, obstacleId) => {
    return fetch(`${urlPrefix}/segments/${segmentId}/obstacles/${obstacleId}`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  createObstacle: (segmentId, obstacle) => {
    return fetch(`${urlPrefix}/segments/${segmentId}/obstacles`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obstacle)
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  updateObstacle: (segmentId, obstacle, obstacleId) => {
    return fetch(`${urlPrefix}/segments/${segmentId}/obstacles/${obstacleId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obstacle)
    })
    .then(checkStatus);
  },

  modifyObstacle: (segmentId, obstacle, obstacleId) => {
    return fetch(`${urlPrefix}/segments/${segmentId}/obstacles/${obstacleId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obstacle)
    })
    .then(checkStatus);
  },

  deleteObstacle: (segmentId, obstacleId) => {
    return fetch(`${urlPrefix}/segments/${segmentId}/obstacles/${obstacleId}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus);
  },

};

export default apiObstacles;
