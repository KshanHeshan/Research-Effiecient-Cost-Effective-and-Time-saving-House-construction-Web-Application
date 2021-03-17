import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';

// Reducers
const AllReducers = combineReducers({auth: AuthReducer});

export default AllReducers;