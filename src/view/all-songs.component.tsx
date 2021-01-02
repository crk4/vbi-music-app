/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  firstHunderedSongsSelector,
  songsLoadingSelector,
} from '../state/selector/songs.selector';
import { SongType } from '../state/types/songs.types';
import { getSongsThunk } from '../state/thunk/songs.thunk';
import { PlayListType, PlayListSongType } from '../state/types/playlists.types';
import {
  loadAllSongsAction,
  removeSongAction,
  removeSongsAction,
} from '../state/slices/songs.slice';
import {
  getPlaylistByName,
  getAllPlaylists,
  storePlaylists,
} from '../state/helpers/playlist.helpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    textField: {
      width: '100%',
    },
  }),
);

interface AllSongsProps {
  addSong?: boolean;
  playlist?: PlayListType;
}

export function AllSongs({
  addSong,
  playlist,
}: AllSongsProps): React.ReactElement<AllSongsProps> {
  const dispatch = useDispatch();
  const classes = useStyles();

  const songs: SongType[] = useSelector(firstHunderedSongsSelector);
  const songsLoading: boolean = useSelector(songsLoadingSelector);
  const [searchText, setSearchText] = useState('');

  const getPlaylistDetail = (): void => {
    const currentPlaylist: PlayListType = getPlaylistByName(
      playlist?.name ?? '',
    );
    if (currentPlaylist?.name) {
      dispatch(removeSongsAction(currentPlaylist.songs));
    }
  };

  useEffect(() => {
    if (!songs?.length) {
      dispatch(getSongsThunk());
    }
  }, []);

  useEffect(() => {
    if (playlist?.name) {
      getPlaylistDetail();
    } else {
      dispatch(loadAllSongsAction());
    }
  }, [playlist?.name]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleAddSongClick = (
    e: React.MouseEvent<HTMLInputElement>,
    song: SongType,
  ) => {
    const playlists: PlayListType[] = getAllPlaylists();
    const currentPlaylist: PlayListType | undefined = playlists.find(
      (p) => p.name === playlist?.name,
    );
    if (currentPlaylist) {
      currentPlaylist?.songs.push({
        ...song,
        addedDate: new Date().toDateString(),
      } as PlayListSongType);

      storePlaylists(playlists);
      dispatch(removeSongAction(song));
    }
  };

  return songsLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Search for songs..."
              variant="outlined"
              onChange={handleSearch}
              className={classes.textField}
            />
          </Grid>
        </Grid>
      </div>
      <List dense={true}>
        {songs && songs.length ? (
          songs
            .filter((song) => song.view)
            .filter((song) => song.title.indexOf(searchText) !== -1)
            .map((song: SongType) => (
              <ListItem key={song.id}>
                <ListItemAvatar>
                  <Avatar>
                    <img src={song.thumbnailUrl} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={song.title} secondary={song.album} />
                {addSong && (
                  <ListItemSecondaryAction
                    onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                      handleAddSongClick(event, song);
                    }}
                  >
                    <IconButton edge="end" aria-label="add">
                      <AddCircleIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))
        ) : (
          <p>There are no songs found.</p>
        )}
      </List>
    </>
  );
}
