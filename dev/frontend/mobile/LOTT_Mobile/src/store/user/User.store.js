import React, {createContext, useContext, useReducer} from 'react';

import {setToken} from 'services/General.service.js'


const initialState = {
  user: null,
  token: null
};

const userReducer = (state, action) => {
  switch (action.type) {
      case 'SET_USER':
        setToken(action.newToken)
        return { user: action.newUser, token:action.newToken };
      default:
        return state;
  }
};

const UserContext = createContext();

export const UserConsumer = UserContext.Consumer;
export const UserConsumerHook = () => useContext(UserContext);

export const UserProvider = ({children}) => (
   <UserContext.Provider value={useReducer(userReducer, initialState)}>
       {children}
   </UserContext.Provider>
);