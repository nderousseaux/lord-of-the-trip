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

  getObstacleById: (obstacleId) => {
    return fetch(`${urlPrefix}/obstacles/${obstacleId}`, {
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

  updateObstacle: (obstacle, obstacleId) => {
    return fetch(`${urlPrefix}/obstacles/${obstacleId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obstacle)
    })
    .then(checkStatus);
  },

  modifyObstacle: (obstacle, obstacleId) => {
    return fetch(`${urlPrefix}/obstacles/${obstacleId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obstacle)
    })
    .then(checkStatus);
  },

  deleteObstacle: (obstacleId) => {
    return fetch(`${urlPrefix}/obstacles/${obstacleId}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus);
  },

};

export default apiObstacles;
