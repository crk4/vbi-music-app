export interface SongType {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  view: boolean;
  album: string;
}

export interface SongsSliceType {
  allSongs: SongType[];
  isLoading: boolean;
  error: string;
}
