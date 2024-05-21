import React from 'react';
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
      content: data.content,
      level: data.level || 'h4',
      bold: data.bold || true,
      font: data.font || 'open sans',
      color: data.color || 'black',
      margin: {
        top: data.marginTop || 10,
        bottom: data.marginBottom || 10,
        left: data.marginLeft || 10,
        right: data.marginRight || 10,
      }}
    onTitleCreate(titleData);
    handleClose();
  };
  
  return (
    <Dialog open={openTitle} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}>
      <DialogTitle>Crear Título</DialogTitle>
      <DialogContent sx={{ p: 3, width: '450px' }}>
        <TextField
          autoFocus
          margin="dense"
          id="content"
          label="Título"
          type="text"
          fullWidth
          variant="standard"
          {...register('content', { required: true })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit" variant='contained'>Crear</Button>
      </DialogActions>
    </Dialog>
  );
}