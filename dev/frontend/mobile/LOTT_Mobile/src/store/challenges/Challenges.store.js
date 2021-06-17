import React, {createContext, useContext, useReducer} from 'react';
import _ from 'lodash';

const initialState = {
  challengesSubscribed: [],
  challengesNoSubscribed: [],
  loading: false,
  challengeSelected: {},
  nextAction: {},
  segment: {},
  obstacleId: null
};

const challengesReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading:true };
    case 'STOP_LOADING':
      return { ...state, loading:false };
    case 'GET_CHALLENGES_SUBSCRIBED':
     
        return { 
        ...state, 
        challengesSubscribed: action.challengesSubscribed,
      };
    case 'GET_CHALLENGES_NO_SUBSCRIBED':      
      return { 
        ...state, 
        challengesNoSubscribed: action.challengesNoSubscribed, 
      };
    case 'SET_CHALLENGE_SELECTED':
      return {
        ...state,
        challengeSelected: getChallengeSelected(state, action.idChallengeSelected),
      }
    case 'UPDATE_CHALLENGE_SELECTED':
      return {
        ...state,
        challengeSelected: getChallengeSelected(state, state.challengeSelected.id),
      }
    case 'UPDATE_NEXT_ACTION':
      return {
        ...state,
        nextAction: action.nextAction
      }
    case 'SET_SEGMENT':
      let res = _.find(state.challengeSelected.segments, function(o) {return o.id == action.segment} )
      console.log("Nouveau segment : "+ res.id)
      return {...state, segment: res}
    case 'SET_OBSTACLE':
      console.log("Nouvel obstacle : "+ action.obstacle)
      return {...state, obstacleId: action.obstacle}
    default:
      return state;
  }
};


export const getChallengeSelected = (state, id) => {
  let res = _.find(
    state.challengesSubscribed.concat(state.challengesNoSubscribed), 
    function(o) { 
      return o.id == id; 
    }
  )

  return res != undefined ? res : {}
}

const ChallengesContext = createContext();

export const ChallengesConsumer = ChallengesContext.Consumer;
export const ChallengesConsumerHook = () => useContext(ChallengesContext);

export const ChallengesProvider = ({children}) => (
   <ChallengesContext.Provider value={useReducer(challengesReducer, initialState)}>
       {children}
   </ChallengesContext.Provider>
);