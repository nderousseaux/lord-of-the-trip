import { combineReducers, createStore } from 'redux';
import testReducer from './Reducers/testReducer';

export default createStore(combineReducers({count: testReducer}))