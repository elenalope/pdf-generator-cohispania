import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDocument } from '../context/DocumentContext';
import { addChapter } from '../services/chapterServices';
import './Chapter.css';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SectionDialog from '../components/section/SectionDialog';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddIcon from '@mui/icons-material/Add';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Chapter = () => {
  const [sections, setSections] = useState([]);
/*   const [formDataArray, setFormDataArray] = useState([]);
 */  const navigate = useNavigate();
  const { id: templateId, chapterId } = useParams();
  const [openSection, setOpenSection] = useState(false);

  const handleSectionClick = () => {
    setOpenSection(true);
  };
  const handleSectionCreate = async (sectionData) => {
    try {
      const response = await addChapter(templateId, newChapter);
      setFormDataArray([...formDataArray, response.data]);
    } catch (error) {
      console.error('Error creating chapter:', error);
    }
  };

  const handleSubmit = async (e, index) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api', formDataArray[index]);
      navigate('/document')
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
  const handleEnterSection = (sectionId) => {
    if (sectionId) {
      navigate(`chapter/${sectionId}`);
    }
  };
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ marginLeft: '2%', marginRight: '2%', marginTop: '20px' }}>
        <Button variant="contained" type="submit">
          <SaveIcon />
        </Button>
        <Button type='button' variant="contained" >
          <GetAppIcon />
        </Button>
        <Button variant="contained" >
          <VisibilityIcon />
        </Button>
      </Stack>
      <CssBaseline />
      <div className='document-body'> 
        <div className='option-list'>
          <Box>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding onClick={handleSectionClick}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ImportContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Section" />
                    <AddIcon />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </List>
            </nav>
          </Box>
        </div>
        <CssBaseline />
        <Container fixed>
          <Box sx={{ bgcolor: '#C9C9CE', height: '70vh' }}>
          <CardContent /* key={index} */ sx={{ pl: 4, pr: 4, mb: 3, pt: 2, pb: 2, backgroundColor: '#E9EAEC' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* <LongMenu /> */}
                    </Box>
                    <Typography sx={{ mb: 2, mt: 1 }}>
                      {/* {chapter.title} */}
                    </Typography>
                    <Divider />
                    <Typography sx={{ mb: 2, mt: 2 }}>
                      {/* {chapter.subtitle} */}
                    </Typography>
                    <Divider />
                    {/* {chapter.img && (
                      <CardMedia
                        sx={{ mt: 2 }}
                        component="img"
                        height="140"
                        width="280"
                        image=''{chapter.img}
                        alt="chapter-image"
                      />
                    )} */}
                    <div className='buttons-chapter-mydocument'>
                      <Button
                          sx={{ mb: 1 }}
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                            >
                          Seleccionar Imagen
                          <VisuallyHiddenInput type="file" /* onChange={(e) => handleInputChange(e, index)} */ />
                    </Button>
    
                    <Button variant="contained" endIcon={<SendIcon />} size="small"
                    sx={{ width: 100 , ml: 'auto'}} 
                    onClick={handleEnterSection}/* type="submit" */ /* onClick={()=> navigate('/document')} */ >
                    Entrar
                    </Button>
                    </div>
                    
                </CardContent>
          </Box>
        </Container> 
      </div>
      
      <Stack spacing={2} direction="row" sx={{ marginLeft: '20px' }}>
        <Button variant="contained" onClick={() => navigate('/')}>SALIR SIN GUARDAR</Button>
      </Stack>

      {openSection &&<SectionDialog openSection={openSection} setOpenSection={setOpenSection} onSectionCreate={(data) => console.log(data)} />}
    </>
  );
}

export default Chapter;
