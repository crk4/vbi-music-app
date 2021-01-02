import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PlayListType } from '../state/types/playlists.types';
import {
  getAllPlaylists,
  storePlaylists,
} from '../state/helpers/playlist.helpers';

interface CreatePlaylistProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorText: {
      color: '#ff0000',
    },
  }),
);

export function CreatePlaylist({
  onClose,
  open,
}: CreatePlaylistProps): React.ReactElement<CreatePlaylistProps> {
  const classes = useStyles();
  const [playlistName, setPlaylistName] = useState('');
  const [touched, setTouched] = useState(false);
  const [duplicatePlaylist, setDuplicatePlaylist] = useState(false);
  const handleClose = () => {
    setTouched(false);
    setDuplicatePlaylist(false);
    setPlaylistName('');
    onClose();
  };

  const handleCreatePlaylist = () => {
    setTouched(true);
    if (playlistName) {
      const playlists: PlayListType[] = getAllPlaylists();

      const playlist = playlists.find((p) => p.name === playlistName);
      if (!playlist) {
        playlists.push({
          name: playlistName,
          createdDate: new Date().toDateString(),
          songs: [],
        } as PlayListType);

        storePlaylists(playlists);

        setPlaylistName('');
        onClose();
      } else {
        setDuplicatePlaylist(true);
      }
    }
  };

  const handlePlaylistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Playlist</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Playlist Name"
          fullWidth
          onChange={handlePlaylistNameChange}
        />
        {!playlistName && touched && (
          <p className={classes.errorText}>Please Enter playlist name.</p>
        )}
        {duplicatePlaylist && (
          <p className={classes.errorText}>Playlist already exist.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreatePlaylist} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
