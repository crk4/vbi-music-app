import { combineReducers } from '@reduxjs/toolkit';
import { songsSlice } from './state/slices/songs.slice';

const sliceReducers = {
  [songsSlice.name]: songsSlice.reducer,
};

export const rootReducer = combineReducers(sliceReducers);
