import { createSelector } from 'reselect';
import { songsSlice } from '../slices/songs.slice';
import { SongsSliceType } from '../types/songs.types';

export function sliceSelector(state: any): any {
  return state[songsSlice.name];
}

export const allSongsSelector = createSelector(
  sliceSelector,
  (slice: SongsSliceType) => {
    return slice.allSongs;
  },
);

export const firstHunderedSongsSelector = createSelector(
  sliceSelector,
  (slice: SongsSliceType) => {
    return slice.allSongs.slice(0, 100);
  },
);

export const songsLoadingSelector = createSelector(
  sliceSelector,
  (slice: SongsSliceType) => {
    return slice.isLoading;
  },
);
