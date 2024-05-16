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
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

export default function ParagraphDialog() {
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

  const handleParagraphClick = () => {
    setElements([...elements, { type: 'paragraph', data: { title: '', subtitle: '', image: '' } }]);
    
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
                <ImportContactsIcon />
              </ListItemIcon>
              <ListItemText primary="Párrafo" /> 
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
              return element.type === 'paragraph' ? (
                <CardContent sx={{ pl: 4 , pr: 4 , mb: 3, pt:2 , pb: 2 , backgroundColor: '#E9EAEC'}} key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <LongMenu />
                  </Box>
                  <Typography
                    sx={{ mb: 2 , mt: 1 }}
                    value={element.data.title}
                    onChange={(e) => handleInputChange(e, index)}>
                    Párrafo
                  </Typography>
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
        <DialogTitle>Crear Párrafo</DialogTitle>
        <DialogContent sx={{ width: '70vh', height: '50vh' }}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="paragraph"
            label="Párrafo"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant='contained' onClick={handleParagraphClick} >Crear</Button>
        </DialogActions>
      </Dialog>
      </div>
    </React.Fragment>
  );
}