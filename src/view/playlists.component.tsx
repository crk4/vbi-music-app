/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { LocalStorageHelper } from '../state/helpers/local-storage.helper';
import { PlayListType } from '../state/types/playlists.types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CreatePlaylist } from './create-playlist.component';
import { PlaylistDetails } from './playlist-details.component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      textAlign: 'center',
    },
    playlistItem: {
      cursor: 'pointer',
      '& :hover': {
        backgroundColor: '#eeeeee',
      },
    },
  }),
);

export function Playlists(): React.ReactElement {
  const classes = useStyles();
  const [playlists, setPlaylists] = useState([] as PlayListType[]);

  const [open, setOpen] = React.useState(false);
  const [showPlaylistDetail, setShowPlaylistDetail] = React.useState(false);
  const [playlistDetail, setPlaylistDetail] = React.useState(
    {} as PlayListType,
  );

  const loadPlaylists = () => {
    const localStorage = new LocalStorageHelper();
    const playlistValue: string = localStorage.get('playlists') || '';
    if (playlistValue) {
      const playlists: PlayListType[] = JSON.parse(playlistValue);
      setPlaylists(playlists);
    }
  };

  const handleClose = () => {
    setOpen(false);
    loadPlaylists();
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  const handleCreatePlaylist = () => {
    setOpen(true);
  };

  const handlePlaylistClick = (
    event: React.MouseEvent<HTMLInputElement>,
    playlist: PlayListType,
  ) => {
    setShowPlaylistDetail(true);
    setPlaylistDetail(playlist);
  };

  if (!showPlaylistDetail) {
    return (
      <div>
        <List dense={true}>
          {playlists && playlists.length ? (
            playlists.map((playlist: PlayListType) => (
              <ListItem
                key={playlist.name}
                onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                  handlePlaylistClick(event, playlist);
                }}
                button={true}
              >
                <ListItemAvatar>
                  <PlayCircleOutlineIcon />
                </ListItemAvatar>
                <ListItemText
                  primary={playlist.name}
                  secondary={playlist.createdDate}
                />
              </ListItem>
            ))
          ) : (
            <p>There are no playlists.</p>
          )}
        </List>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.root}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreatePlaylist}
              >
                Create Playlist
              </Button>
            </div>
          </Grid>
        </Grid>
        <CreatePlaylist open={open} onClose={handleClose} />
      </div>
    );
  }

  return (
    showPlaylistDetail && (
      <PlaylistDetails
        playlistDetail={playlistDetail}
        setShowPlaylistDetail={setShowPlaylistDetail}
      />
    )
  );
}
