import { checkStatus, urlPrefix, getToken } from './fetchUtils';

const apiUserChallenge = {

  getPublishedChallenges: () => {
    return fetch(`${urlPrefix}/challenges?draft=false`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  getSubscribedChallenges: () => {
    return fetch(`${urlPrefix}/user/challenges?subscribed=true`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  getNotSubscribedChallenges: () => {
    return fetch(`${urlPrefix}/user/challenges?subscribed=false`, {
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus)
    .then(res => res.json());
  },

  subscribeChallenge: (challengeId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/subscribe`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus);
  },

  unsubscribeChallenge: (challengeId) => {
    return fetch(`${urlPrefix}/challenges/${challengeId}/unsubscribe`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(checkStatus);
  },

};

export default apiUserChallenge;
