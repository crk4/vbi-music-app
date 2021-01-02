import axios from 'axios';
import { SongType } from '../types/songs.types';

export function getSongs(): Promise<SongType[]> {
  return axios
    .get('https://jsonplaceholder.typicode.com/photos')
    .then((response) => response.data);
}
