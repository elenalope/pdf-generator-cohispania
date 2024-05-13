import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import Button from '@mui/material/Button';
import BookIcon from '@mui/icons-material/Book';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import TitleIcon from '@mui/icons-material/Title';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import DrawIcon from '@mui/icons-material/Draw';
import AddIcon from '@mui/icons-material/Add';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const Section = (data) => {
  const location = useLocation();
  const config = location.state?.config;
  const { title = '', cover = '',  ImgCover = '' } = config || {};
  const [elements, setElements] = useState([]);

  const handleDownloadPdf = async () => {
  
  }

  const handleSectionClick = () => {
    setElements([...elements, { type: 'section', data: { title: '', image: null, cover: '' } }]);
  }

  const handleBreakClick = () => {
    if (elements.length > 0 && elements[elements.length - 1].type === 'section') {
      setElements([...elements, { type: 'break' }]);
    } else {
      alert('No puedes agregar un salto de página sin una sección previa o después de otro salto');
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedElements = [...elements];
    if(updatedElements[index].type === 'section') {
      updatedElements[index] = {
        ...updatedElements[index],
        data: {...updatedElements[index].data, [name]: value}
      };
    }
    setElements(updatedElements);
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
  

  return (
    <>
    <div className='document-body'>
      <div className='option-list'>
      <Box>
      <nav>
        <List sx={{  backgroundColor: '#E9EAEC'}}>
        <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <ImportContactsIcon />
              </ListItemIcon>
              <ListItemText primary="Capítulo"/> 
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Sección"/>
              <AddIcon onClick={handleSectionClick} />
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
            <ListItemButton>
              <ListItemIcon>
                <MoveDownIcon />
              </ListItemIcon>
              <ListItemText primary="Salto"/>
              <AddIcon onClick={handleBreakClick} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
      </div>

      <div className='pdf-background'>
      <Box sx={{ mt: 2, ml: 10, mr: 10, mb: 2, p: 2  }} >
            {elements.map((element, index) => {
              return element.type === 'section' ? (
                <FormGroup sx={{ p:3 , mb: 3,  backgroundColor: '#E9EAEC'}} key={index}>
                  <TextField
                    sx={{ mb: 2}}
                    label="Título"
                    type="text"
                    variant="standard"
                    value={element.data.title}
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

                  <FormControlLabel control={<Switch />} label="Portada" 
                  value={element.data.cover}
                  onChange={(e) => handleInputChange(e, index)}/>

                  <Button variant="contained" endIcon={<SendIcon />} size="small"
                  sx={{ width: 100 , ml: 'auto'}} type="submit" onSubmit={handleSubmit()}>
                  Crear
                  </Button>
                </FormGroup>
              ) : (
                <Box sx={{ p:3 , mb: 3,  backgroundColor: '#E9EAEC' }} key={index}>
                  <h1 className='break-title'>Salto de página</h1>
                </Box>
              );
            })}
          </Box>
      </div>
    </div>
    <Link to='/'>
    <Button variant="contained" sx={{ m:3 }}>
      Salir Sin Guardar
    </Button>
    </Link>
    </>
  )
}

export default Section