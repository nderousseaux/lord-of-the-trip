import { checkStatus, urlPrefix } from './fetchUtils';

const apiObstacles = {

  getAllObstacles: (challengeId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/obstacles`)
    .then(checkStatus)
    .then(res => res.json());
  },

  getObstaclesBySegment: (challengeId, segmentId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}/obstacles`)
    .then(checkStatus)
    .then(res => res.json());
  },

  getObstacleById: (challengeId, segmentId, obstacleId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}/obstacles/${obstacleId}`)
    .then(checkStatus)
    .then(res => res.json());
  },

  createObstacle: (challengeId, segmentId, obstacle) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}/obstacles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obstacle)
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  updateObstacle: (challengeId, segmentId, obstacle, obstacleId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}/obstacles/${obstacleId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obstacle)
    })
    .then(checkStatus);
  },

  modifyObstacle: (challengeId, segmentId, obstacle, obstacleId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}/obstacles/${obstacleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obstacle)
    })
    .then(checkStatus);
  },

  deleteObstacle: (challengeId, segmentId, obstacleId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}/obstacles/${obstacleId}`, {
      method: 'DELETE',
    })
    .then(checkStatus);
  },

};

export default apiObstacles;
