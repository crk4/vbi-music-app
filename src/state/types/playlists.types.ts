import { SongType } from './songs.types';

export interface PlayListType {
  name: string;
  createdDate: string;
  songs: PlayListSongType[];
}

export interface PlayListSongType extends SongType {
  addedDate: string;
}
