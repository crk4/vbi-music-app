import { Dispatch } from '@reduxjs/toolkit';
import { getAlbums } from '../api/albums.api';
import { getSongs } from '../api/songs.api';
import {
  songsLoadAction,
  songsSuccessAction,
  songsFailureAction,
} from '../slices/songs.slice';
import { AlbumType } from '../types/albums.types';
import { SongType } from '../types/songs.types';

export function getSongsThunk(): any {
  return async (dispatch: Dispatch, getState: () => any): Promise<void> => {
    try {
      dispatch(songsLoadAction());
      let songsResult: SongType[] = await getSongs();
      const albumsResult: AlbumType[] = await getAlbums();
      songsResult = songsResult.map((song) => {
        const album = albumsResult.find((album) => album.id === song.albumId);
        if (album) {
          return { ...song, album: album?.title };
        }
        return { ...song };
      });
      dispatch(songsSuccessAction(songsResult));
    } catch (error) {
      dispatch(songsFailureAction(error.message));
    }
  };
}
