import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import LongMenu from '../cards/DropDownMenu.jsx';
import CardContent from '@mui/material/CardContent';
import { Switch, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import BookIcon from '@mui/icons-material/Book';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function SectionDialog() {
    const location = useLocation();
    const config = location.state?.config;
    const { title = '', cover = '',  ImgCover = '' } = config || {};
    const [elements, setElements] = useState([]);
  
    const handleDownloadPdf = async () => {
    
    }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
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

  const handleSectionClick = () => {
    setElements([...elements, { type: 'section', data: { title: '', subtitle: '', image: '' } }]);
    
  }

  return (
    <React.Fragment>
    <div className='document-body'>
         <div className='option-list'>
      <Box>
      <nav>
        <List sx={{  backgroundColor: '#E9EAEC'}}>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Sección" /> 
              <AddIcon onClick={handleClickOpen} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
      </div>
      <div className='pdf-background'>
      <Box sx={{ mt: 1, ml: 5, mr: 5, mb: 1, p:2   }} >
            {elements.map((element, index) => {
              return element.type === 'section' ? (
                <CardContent sx={{ pl: 4 , pr: 4 , mb: 3, pt:2 , pb: 2 , backgroundColor: '#E9EAEC'}} key={index}>
                  <Box sx={{ position: 'absolute' }}>
                  <BookIcon />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <LongMenu />
                  </Box>
                  <Typography
                    sx={{ mb: 2 , mt: 1 }}
                    onChange={(e) => handleInputChange(e, index)}>
                    Título
                  </Typography>
                  <Divider/>
                  <CardMedia
                  sx={{ mt: 2 }}
                    component="img"
                    height="140"
                    width="280"
                    image=""
                    alt="chapter-image"
                   />
                </CardContent>
              ) : (
                <Box sx={{ pl:3 , pt:2 , pb:2 , mb: 3,  backgroundColor: '#E9EAEC', fontFamily: 'Open Sans'}} key={index}>
                  <h3 className='break-title'>Salto de página</h3>
                </Box>
              );
            })}
          </Box>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Crear Sección</DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="email"
            label="Título"
            type="text"
            fullWidth
            variant="standard"
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
                <VisuallyHiddenInput type="file" onChange={(e) => handleInputChange(e, index)} />
           </Button>
           <FormControlLabel 
           sx={{ ml: 4 , mt: 3 }}
           control={<Switch />} 
           label="Portada" />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant='contained' onClick={handleSectionClick} >Crear</Button>
        </DialogActions>
      </Dialog>
      </div>
    </React.Fragment>
  );
}