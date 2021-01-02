/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PlayListType, PlayListSongType } from '../state/types/playlists.types';
import { AllSongs } from './all-songs.component';
import { loadAllSongsAction } from '../state/slices/songs.slice';
import { getPlaylistByName } from '../state/helpers/playlist.helpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    textField: {
      width: '100%',
    },
    alignRight: {
      textAlign: 'right',
    },
  }),
);

interface PlaylistDetailsProps {
  playlistDetail: PlayListType;
  setShowPlaylistDetail: (show: boolean) => void;
}

export function PlaylistDetails({
  playlistDetail,
  setShowPlaylistDetail,
}: PlaylistDetailsProps): React.ReactElement<PlaylistDetailsProps> {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [songs, setSongs] = useState([] as PlayListSongType[]);
  const [showAllSongs, setShowAllSongs] = useState(false);

  const shuffleSongs = (array: PlayListSongType[]): PlayListSongType[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const handleShufflePlay = () => {
    const shuffledSongs = shuffleSongs([...songs]);
    setSongs(shuffledSongs);
  };

  const handleAddSong = () => {
    setShowAllSongs(true);
    dispatch(loadAllSongsAction());
  };

  const loadPlaylistSongs = () => {
    const currentPlaylist: PlayListType = getPlaylistByName(
      playlistDetail?.name,
    );
    if (currentPlaylist?.name) {
      setSongs(currentPlaylist.songs);
    }
  };

  const handleBackClick = () => {
    if (!showAllSongs) {
      setShowPlaylistDetail(false);
    } else {
      setShowAllSongs(false);
      loadPlaylistSongs();
    }
  };

  useEffect(() => {
    loadPlaylistSongs();
  }, []);

  return (
    <>
      <div>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackClick}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h5" gutterBottom>
                {playlistDetail?.name}
              </Typography>
            </Grid>
            {!showAllSongs ? (
              <Grid item xs={4}>
                <div className={classes.alignRight}>
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                  >
                    <Button
                      onClick={handleShufflePlay}
                      disabled={songs?.length === 0}
                    >
                      Shuffle Play
                    </Button>
                    <Button onClick={handleAddSong}>Add Song</Button>
                  </ButtonGroup>
                </div>
              </Grid>
            ) : (
              <Grid xs={6} />
            )}
          </Grid>
        </div>
        {!showAllSongs && (
          <List dense={true}>
            {songs && songs.length ? (
              songs.map((song: PlayListSongType) => (
                <ListItem key={song.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <img src={song.thumbnailUrl} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={song.title} secondary={song.album} />
                </ListItem>
              ))
            ) : (
              <p>There are no songs found.</p>
            )}
          </List>
        )}
      </div>
      {showAllSongs && <AllSongs addSong={true} playlist={playlistDetail} />}
    </>
  );
}
