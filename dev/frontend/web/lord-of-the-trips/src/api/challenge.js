import { checkStatus, urlPrefix } from './fetchUtils';

const apiChallenge = {

  getAllChallenges: () => {
    return fetch(`${urlPrefix}/challenge`)
    .then(checkStatus)
    .then(res => res.json());
  },

  getChallengeById: (id) => {
    return fetch(`${urlPrefix}/challenge/${id}`)
    .then(checkStatus)
    .then(res => res.json());
  },

  createChallenge: (challenge) => {
    return fetch(`${urlPrefix}/challenge`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(challenge)
		})
    .then(checkStatus)
    .then(res => res.json());
  },

  updateChallenge: (id, challenge) => {
    return fetch(`${urlPrefix}/challenge/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(challenge)
		})
    .then(checkStatus);
  },

  modifyChallenge: (id, challenge) => {
    return fetch(`${urlPrefix}/challenge/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(challenge)
		})
    .then(checkStatus);
  },

  deleteChallenge: (id) => {
    return fetch(`${urlPrefix}/challenge/${id}`, {
			method: 'DELETE',
		})
    .then(checkStatus);
  },


  downloadMap: (challengeId) => {
    return fetch(`${urlPrefix}/challenge/${challengeId}/image`)
    .then(checkStatus)
    .then(res => res.blob());
  },

  uploadMap: (challengeId, file) => {
    return fetch(`${urlPrefix}/challenge/${challengeId}/image`, {
			method: 'POST',
			body: file
		})
    .then(checkStatus);
  },

};

export default apiChallenge;
