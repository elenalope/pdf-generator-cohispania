import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";


export default function SubsectionDialog({
  openAddSubsection, setOpenAddSubsection, onSubsectionCreate}) {
   const {register, handleSubmit} = useForm();

   const handleClose = () => {
    setOpenAddSubsection(false);
  };
  

  const onSubmit = async (data) => {
    const subsectionData = {
      title: data.title,
      paragraph: data.paragraph || '',
      content: []
    };
  
    await onSubsectionCreate(subsectionData);
    handleClose();
 
  };


  return (
    <Dialog open={openAddSubsection} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}>
      <DialogTitle>Crear Subsección</DialogTitle>
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
        <TextField
          autoFocus
          margin="dense"
          id="paragraph"
          label="Título"
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