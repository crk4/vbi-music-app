import { PlayListType } from '../types/playlists.types';
import { LocalStorageHelper } from './local-storage.helper';
import { AppConstants } from '../constants';

export function getAllPlaylists(): PlayListType[] {
  let playlists: PlayListType[] = [];
  const localStorage = new LocalStorageHelper();
  const playlistValue: string = localStorage.get(AppConstants.PLAYLIST) || '';

  if (playlistValue) {
    playlists = JSON.parse(playlistValue);
  }
  return playlists;
}

export function getPlaylistByName(name: string): PlayListType {
  const playlists: PlayListType[] = getAllPlaylists();
  const currentPlaylist: PlayListType | undefined = playlists.find(
    (p) => p.name === name,
  );
  if (currentPlaylist) {
    return currentPlaylist;
  }
  return {} as PlayListType;
}

export function storePlaylists(playlists: PlayListType[]): void {
  const localStorage = new LocalStorageHelper();
  localStorage.add(AppConstants.PLAYLIST, JSON.stringify(playlists));
}
