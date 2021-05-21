import { checkStatus, urlPrefix, getToken } from './fetchUtils';

const apiSegments = {

  getAllSegments: (challengeId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  getSegmentById: (challengeId, segmentId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  createSegment: (challengeId, segment) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(segment)
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  updateSegment: (challengeId, segment, segmentId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(segment)
    })
    .then(checkStatus);
  },

  modifySegment: (challengeId, segment, segmentId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(segment)
    })
    .then(checkStatus);
  },

  deleteSegment: (challengeId, segmentId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus);
  },

};

export default apiSegments;
