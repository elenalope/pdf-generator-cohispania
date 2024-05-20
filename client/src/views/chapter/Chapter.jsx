import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDocument } from '../../context/DocumentContext';
import { addChapter } from '../../services/chapterServices';
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
import SectionDialog from '../../components/section/SectionDialog';
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
import { addSectionFromChapter } from '../../services/sectionFromChapter';
import SectionFromChapterDialog from '../../components/sectionFromChapter/SectionFromChapterDialog.jsx';

const Chapter = () => {
  const navigate = useNavigate();
  const { id: templateId, id: chapterId } = useParams();
  const [openAddSection, setOpenAddSection] = useState(false);
  const [data, setData] = useState({ sections: [] });

  const handleSectionClick = () => {
    setOpenAddSection(true);
  };
  useEffect(() => {
    console.log('Updated data:', data);
  }, [data]);

  const handleSectionCreate = async (sectionFromChapterData) => {
    try {
      const updatedChapter = await addSectionFromChapter(templateId, chapterId, { section: sectionFromChapterData });
      console.log('API Response:', updatedChapter);

      setData({ sections: updatedChapter.content });
      console.log('Updated sections data:', updatedChapter.content);
    } catch (error) {
      console.error('Error creating chapter:', error);
    }
  };


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
                    <AddIcon onClick={handleSectionClick}/>
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
          {data.sections.map((section, index) => (
                section && section.title && (
                  <CardContent key={index} sx={{ pl: 4, pr: 4, mb: 3, pt: 2, pb: 2, backgroundColor: '#E9EAEC' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* <LongMenu /> */}
                    </Box>
                    <Typography sx={{ mb: 2, mt: 1 }}>
                      {section.title}
                    </Typography>
                    <Divider />
                    {section.img && (
                      <CardMedia
                        sx={{ mt: 2 }}
                        component="img"
                        height="140"
                        width="280"
                        image={section.img}
                        alt="section-image"
                      />
                    )}
                     <Divider/>
                    {/* <FormControlLabel disabled control={<Switch />} label={data.cover} /> */}
                    <div className='buttons-section-mydocument'>
    
                    <Button variant="contained" endIcon={<SendIcon />} size="small"
                    sx={{ width: 100 , ml: 'auto'}} 
                    onClick={handleEnterSection}/* type="submit" */ /* onClick={()=> navigate('/document')} */ >
                    Entrar
                    </Button>
                    </div>
                    
                </CardContent>
                )
                ))}
          
          </Box>
        </Container> 
      </div>
      
      <Stack spacing={2} direction="row" sx={{ marginLeft: '20px' }}>
        <Button variant="contained" onClick={() => navigate('/')}>SALIR SIN GUARDAR</Button>
      </Stack>

      {openAddSection &&<SectionFromChapterDialog openAddSection={openAddSection} setOpenAddSection={setOpenAddSection} onSectionCreate={handleSectionCreate}  /* onCancel={handleCancelDialog} *//>}    </>
  );
}

export default Chapter;