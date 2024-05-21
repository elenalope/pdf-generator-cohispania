import React from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

export default function LinkDialog({ openLink, setOpenLink, onLinkCreate }) {
  const { register, handleSubmit } = useForm();
  
  const handleClose = () => {
    setOpenLink(false);
  };

  const onSubmit = (data) => {
    const linkData = {
      src: data.src,
      fontStyle: 'normal',
      textAlign: 'initial'
    };
    onLinkCreate(linkData);
    handleClose();
  };
 
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
        <Dialog
        open={openLink}
        onClose={handleClose}
        PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}
      >
        <DialogTitle>Añadir link</DialogTitle>
        <DialogContent sx={{  width: '70vh' }}>
          <TextField
            autoFocus
            margin="dense"
            id="src"
            name="email"
            label="Link"
            type="text"
            fullWidth
            variant="standard"
            {...register('src', { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant='contained' >Crear</Button>
        </DialogActions>
      </Dialog>
  );
}