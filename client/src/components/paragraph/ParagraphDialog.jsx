import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogParagraph from '@mui/material/DialogTitle';

export default function ParagraphDialog({ openParagraph, setOpenParagraph, onParagraphCreate, onCancel}) {
  const { register, handleSubmit, reset } = useForm();
  

  const handleClose = () => {
    setOpenParagraph(false);
    onCancel();
  };

  const onSubmit = (data) => {
    const paragraphData = {
      paragraph: data.paragraph,
      content: []
    };
    onParagraphCreate(paragraphData);
   /*  handleClose(); */
  };
  
  return (
    <Dialog open={openParagraph} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}>
      <DialogParagraph>Crear Párrafo</DialogParagraph>
      <DialogContent sx={{ p: 3 }}>
        <TextField
          autoFocus
          margin="dense"
          id="paragraph"
          label="Párrafo"
          type="text"
          fullWidth
          variant="standard"
          {...register('paragraph', { required: true })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit" variant='contained'>Crear</Button>
      </DialogActions>
    </Dialog>
  );
}