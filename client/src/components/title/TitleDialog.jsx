import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function TitleDialog({ openTitle, setOpenTitle, onTitleCreate, onCancel}) {
  const { register, handleSubmit, reset } = useForm();
  

  const handleClose = () => {
    setOpenTitle(false);
    /* onCancel(); */
  };

  const onSubmit = (data) => {
    const titleData = {
      title: data.title,
      content: []
    };
    onTitleCreate(titleData);
    handleClose();
  };
  
  return (
    <Dialog open={openTitle} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}>
      <DialogTitle>Crear Título</DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Título"
          type="text"
          fullWidth
          variant="standard"
          {...register('title', { required: true })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit" variant='contained'>Crear</Button>
      </DialogActions>
    </Dialog>
  );
}