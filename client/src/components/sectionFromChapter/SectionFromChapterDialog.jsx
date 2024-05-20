import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { addSectionFromChapter } from '../../services/sectionFromChapter';

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

export default function SectionFromChapterDialog({ openAddSection, setOpenAddSection, onSectionCreate}) {
  const { register, handleSubmit, reset } = useForm();

  const handleClose = () => {
    setOpenAddSection(false);
    // onCancel();
  };

  const onSubmit = async (data) => {
    const sectionFromChapterData = {
      title: data.title,
      cover: data.cover || false,
      img: data.img || '',
      content: []
    };

    await onSectionCreate(sectionFromChapterData );
    handleClose();
  };

  return (
    <Dialog open={openAddSection} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}>
      <DialogTitle>Crear Sección</DialogTitle>
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
