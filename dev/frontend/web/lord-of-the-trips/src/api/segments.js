import { checkStatus, urlPrefix } from './fetchUtils';

const apiSegments = {

  getAllSegments: (challengeId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments`)
    .then(checkStatus)
    .then(res => res.json());
  },

  getSegmentById: (challengeId, segmentId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}`)
    .then(checkStatus)
    .then(res => res.json());
  },

  createSegment: (challengeId, segment) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(segment)
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  updateSegment: (challengeId, segment, segmentId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(segment)
    })
    .then(checkStatus);
  },

  modifySegment: (challengeId, segment, segmentId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(segment)
    })
    .then(checkStatus);
  },

  deleteSegment: (challengeId, segmentId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}`, {
      method: 'DELETE',
    })
    .then(checkStatus);
  },

  changeSegmentOrientation: (challengeId, segment, segmentId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/segments/${segmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "start_crossing_point_id": segment.end_crossing_point_id, "end_crossing_point_id": segment.start_crossing_point_id })
    })
    .then(checkStatus);
  },

};

export default apiSegments;
