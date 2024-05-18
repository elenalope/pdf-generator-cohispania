import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import './Chapter.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import BookIcon from '@mui/icons-material/Book';
import TitleIcon from '@mui/icons-material/Title';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import DrawIcon from '@mui/icons-material/Draw';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';








const Chapter = (data) => {
  const [formDataArray, setFormDataArray] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;
  const { title = '', subtitle = '', coverImg = '' } = config || {};

  const handleDownloadPdf = async () => {
  
  }

  const handleClick = () => {
    setFormDataArray([...formDataArray, { title: '', subtitle: '', image: null }]); 
  }

  const handleSubmit = async (e, index) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/form', formDataArray[index]);
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormDataArray = [...formDataArray];
    updatedFormDataArray[index] = {
      ...updatedFormDataArray[index],
      [name]: value
    };
    setFormDataArray(updatedFormDataArray);
  }
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
      

          
          <div className='document-body'>
      <div className='option-list'>
      <Box>
      <nav>
        <List sx={{  backgroundColor: '#E9EAEC'}}>
        <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <ImportContactsIcon />
              </ListItemIcon>
              <ListItemText primary="Capítulo"/> 
              <AddIcon onClick={handleClick}/>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Sección"/>
              <AddIcon  />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <TitleIcon />
              </ListItemIcon>
              <ListItemText primary="Título"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <FormatAlignJustifyIcon />
              </ListItemIcon>
              <ListItemText primary="Párrafo"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Lista"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <DrawIcon />
              </ListItemIcon>
              <ListItemText primary="Firma"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary="Imagen"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="Link"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <MoveDownIcon />
              </ListItemIcon >
              <ListItemText primary="Salto"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
      </div>
        
      <div className='pdf-background'>
      <Box sx={{  mt: 2, ml: 10, mr: 10, mb: 2, p: 2  }} >
      {formDataArray.map((formData, index) => (
        <FormGroup sx={{ pl: 8 , pr: 8 , mb: 3, pt:2 , pb: 2 , backgroundColor: '#E9EAEC'}} key={index} className="form" onSubmit={(e) => handleSubmit(e, index)}>
          <TextField
              sx={{ mb: 2}}
              label="Título"
              type="text"
              variant="standard"
              value={formData.title}
              onChange={(e) => handleInputChange(e, index)}
                  />
           <TextField
              sx={{ mb: 2}}
              label="Subtitulo"
              type="text"
              variant="standard"
              value={formData.title}
              onChange={(e) => handleInputChange(e, index)}
              />
               <Button
                sx={{ mb: 2 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                   >
                 Seleccionar Imagen
                 <VisuallyHiddenInput type="file" onChange={(e) => handleInputChange(e, index)} />
                 </Button>
                <Button variant="contained" endIcon={<SendIcon />} size="small"
                sx={{ width: 100 , ml: 'auto'}} type="submit" onSubmit={handleSubmit()}>
                Crear
                </Button>
                </FormGroup>
                ))
                }
              </Box>
        </div>
      
    </div>
  );
}




export default Chapter;






