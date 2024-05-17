import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

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

export default function SectionDialog( open, setOpen, onSectionCreate) {
  const { register, handleSubmit, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    const sectionData = {
      title: data.title,
      img: imageFile ? URL.createObjectURL(imageFile) : "",
      content: []
    };
    onSectionCreate(sectionData);
    handleClose();
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };


  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit(onSubmit) }}>
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