import React, {createContext, useContext, useReducer} from 'react';
import _ from 'lodash';
import { Pedometer } from 'expo-sensors';

import { chrono } from 'helpers/DateHelper.js';
import { distanceTotale } from 'helpers/GPSHelper.js';

const initialState = {
  transport: {}, //Peu valoir "course", "marche" ou "velo"
  nbPas: 0, //Nombre de pas
  distance: 0, //Distance parcourue
  distanceChallenge: 0,
  subscriptionPedometer: null, //Objet subscription au podométre
  dateDebut: null,
  subscriptionTime: null,
  duration: {duree: "00:00", unitee: "minute"},
  subscriptionGPS: null,
  logs: [],
  vitesse: null,
  distanceSegment: 0, //Distance déjà parcourue sur le segment
  obstacles_rep: [],
};

const runReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRANSPORT':
      return { ...state, transport: action.transport, dateDebut: new Date() };
    case 'SET_NBPAS':
      return { 
        ...state, 
        nbPas: action.nbPas,
        distance: action.nbPas * action.distancePas
      };
    case 'SUBSCRIBE_PEDOMETER':
      let subscriptionPedometer = Pedometer.watchStepCount(result => action.functionStep(result));
      Pedometer.isAvailableAsync().then(
        result =>{},
        error => {
          console.log(error)
        }
      ); 
      return {...state, subscriptionPedometer};
    case 'SUBSCRIBE_TIME':
      let subscriptionTime = setInterval(() => {action.functionTime()}, 1000)
      return {...state, subscriptionTime};
    case 'SET_DURATION':
      return {...state, duration: chrono(state.dateDebut, new Date()) };
    case 'SUBSCRIBE_GPS':
      let subscriptionGPS = setInterval(() => {action.functionGPS()}, 2000)
      return {...state, subscriptionGPS};
    case 'ADD_LOG':
      console.log(state.logs)
      let logs  = state.logs
      logs.push(action.log)    
      let distance = distanceTotale(logs)
      let distanceC = (state.transport == 'velo' ? distance : distance)
      return {...state, logs, vitesse: action.log.coords.speed, distance, distanceChallenge: distanceC  }
    case 'STOP_SUBSCRIBTIONS':
      state.subscriptionPedometer && state.subscriptionPedometer.remove();
      clearInterval(state.subscriptionGPS);
      clearInterval(state.subscriptionTime);
      return {...state, subscriptionPedometer: null, subscriptionGPS: null, subscriptionTime: null}
    case 'RESET_DISTANCE':
      return {...state, distance: 0, distanceChallenge: 0, logs: []}
    case 'SET_DISTANCE_SEGMENT':
      return {...state, distanceSegment: action.distanceSegment};
    case 'SET_OBSTACLES_REP':
      return {...state, obstacles_rep: action.obstacles};
    default:
      return state;
  }
};


const RunContext = createContext();

export const RunConsumer = RunContext.Consumer;
export const RunConsumerHook = () => useContext(RunContext);

export const RunProvider = ({children}) => (
   <RunContext.Provider value={useReducer(runReducer, initialState)}>
       {children}
   </RunContext.Provider>
);