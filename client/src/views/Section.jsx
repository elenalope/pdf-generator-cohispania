import React, { useState } from 'react';
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
      <nav aria-label="main mailbox folders">
        <List>
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
              <AddIcon />
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
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
      </div>

      <div className='pdf-background'>
      <Box sx={{ mt: 2 , ml:10 , mr: 10 ,p:2 }}>
      <FormGroup>
          <TextField sx={{ mb:2}}
            id="standard-password-input"
            label="Título"
            type="text"
            autoComplete="current-password"
            variant="standard"
          />
          <Button sx={{ mb:2}}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
          Seleccionar Imagen
          <VisuallyHiddenInput type="file" />
          </Button>
          <FormControlLabel control={<Switch />} label="Portada" />


          <Button variant="contained" endIcon={<SendIcon />} size="small"
          sx={{ width: 100 , ml: 'auto'}}>
          Crear
          </Button>
        </FormGroup>
        </Box>
      </div>
    </div>
    <Button variant="contained" sx={{ m:3 }}>
      SALIR SIN GUARDAR
    </Button>
    </>
  )
}

export default Section