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

export default function SectionDialog({ openSection, setOpenSection, onSectionCreate }) {
  const { register, handleSubmit, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);

  const handleClose = () => {
    setOpenSection(false);
  };

  const onSubmit = async (data) => {
    console.log(data.title + '👌')
    const sectionData = {
      title: data.title,
      cover: data.cover,
      subsection: data.subsection,
      img: imageFile ? URL.createObjectURL(imageFile) : "",
      content: []
    };

    console.log('Section Data:',sectionData);
    await onSectionCreate(sectionData);
    handleClose();
  };


  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Dialog open={openSection} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}>
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
        <FormControlLabel
        sx={{ mt: 3 }}
          control={
            <Switch {...register('cover')} id="cover-switch" inputProps={{ 'aria-label': 'controlled' }}/>
          } 
          label="Portada" 
        />
        <Button
          sx={{ mt: 3 }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Seleccionar Imagen
          <VisuallyHiddenInput type="file" onChange={handleImageChange} />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit" variant='contained'>Crear</Button>
      </DialogActions>
    </Dialog>
  );
}
