import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayListSongType } from '../types/playlists.types';
import { SongsSliceType, SongType } from '../types/songs.types';

export const SLICE_NAME = 'songs';

const initialState = {
  allSongs: [],
  isLoading: false,
  error: '',
};

export const songsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    songsLoadAction: (state: SongsSliceType) => {
      state.isLoading = true;
      state.error = '';
    },
    songsSuccessAction: (
      state: SongsSliceType,
      action: PayloadAction<SongType[]>,
    ) => {
      state.isLoading = false;
      state.allSongs = action.payload?.map((s) => {
        return { ...s, view: true };
      });
      state.error = '';
    },
    songsFailureAction: (
      state: SongsSliceType,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeSongAction: (
      state: SongsSliceType,
      action: PayloadAction<SongType>,
    ) => {
      const songToRemove = state.allSongs.find(
        (as) => as.id === action.payload.id,
      );
      if (songToRemove) {
        songToRemove.view = false;
      }
    },
    removeSongsAction: (
      state: SongsSliceType,
      action: PayloadAction<PlayListSongType[]>,
    ) => {
      action.payload.forEach((ps) => {
        const songToRemove = state.allSongs.find((as) => as.id === ps.id);
        if (songToRemove) {
          songToRemove.view = false;
        }
      });
    },
    loadAllSongsAction: (state: SongsSliceType) => {
      state.allSongs = state.allSongs.map((s) => {
        return { ...s, view: true };
      });
    },
  },
});

export const {
  songsLoadAction,
  songsSuccessAction,
  songsFailureAction,
  removeSongAction,
  removeSongsAction,
  loadAllSongsAction,
} = songsSlice.actions;
