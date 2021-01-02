import axios from 'axios';
import { AlbumType } from '../types/albums.types';

export function getAlbums(): Promise<AlbumType[]> {
  return axios
    .get('https://jsonplaceholder.typicode.com/albums')
    .then((response) => response.data);
}
