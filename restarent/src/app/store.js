import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import foodReducer from '../features/food/foodSlice'
export const store = configureStore({
  reducer: combineReducers({
    foodReducer
  }),
});
export default store;
