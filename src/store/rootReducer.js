import {combineReducers} from 'redux';
import { userReducer } from './user/user.reducer';
import { facesReducer } from './faces/faces.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    faces:facesReducer,
  });