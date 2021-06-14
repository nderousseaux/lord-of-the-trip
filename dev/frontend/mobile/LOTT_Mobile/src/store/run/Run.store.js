import React, {createContext, useContext, useReducer} from 'react';
import _ from 'lodash';

const initialState = {
  transport: {} //Peu valoir "course", "marche" ou "velo"
};

const runReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRANSPORT':
      return { ...state, transport: action.transport };
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